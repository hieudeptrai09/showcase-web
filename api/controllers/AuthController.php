<?php
class AuthController
{
    private $db;
    private $user;

    public function __construct($db)
    {
        $this->db = $db;
        $this->user = new User($db);
    }

    public function login()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->username) || !isset($data->password)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Username and password are required."
            ));
            return;
        }

        $user = $this->user->getByUsername($data->username);

        if (!$user) {
            http_response_code(401);
            echo json_encode(array(
                "success" => false,
                "message" => "Invalid credentials."
            ));
            return;
        }

        // Check if user is active
        if ($user['status'] !== 'active') {
            http_response_code(403);
            echo json_encode(array(
                "success" => false,
                "message" => "Account is inactive. Please contact administrator."
            ));
            return;
        }

        // Verify password
        if (!password_verify($data->password, $user['password_hash'])) {
            http_response_code(401);
            echo json_encode(array(
                "success" => false,
                "message" => "Invalid credentials.",
            ));
            return;
        }

        // Generate token
        $token = $this->generateToken($user['id'], $user['role']);

        // Store token in session table (you may want to create this table)
        $this->storeToken($user['id'], $token);

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "token" => $token,
            "user" => array(
                "id" => (int)$user['id'],
                "username" => $user['username'],
                "email" => $user['email'],
                "role" => $user['role']
            ),
            "must_reset_password" => (bool)$user['must_reset_password'],
            "message" => "Login successful."
        ));
    }

    public function logout()
    {
        $headers = getallheaders();
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

        if ($token) {
            $this->revokeToken($token);
        }

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "Logout successful."
        ));
    }

    public function changePassword()
    {
        $headers = getallheaders();
        $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

        $user = $this->validateToken($token);
        if (!$user) {
            http_response_code(401);
            echo json_encode(array(
                "success" => false,
                "message" => "Unauthorized."
            ));
            return;
        }

        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->current_password) || !isset($data->new_password)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Current password and new password are required."
            ));
            return;
        }

        // Validate new password strength
        if (strlen($data->new_password) < 8) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "New password must be at least 8 characters long."
            ));
            return;
        }

        // Get current user data
        $currentUser = $this->user->getByUsername($user['username']);

        // Verify current password
        if (!password_verify($data->current_password, $currentUser['password_hash'])) {
            http_response_code(401);
            echo json_encode(array(
                "success" => false,
                "message" => "Current password is incorrect."
            ));
            return;
        }

        // Hash and update new password
        $newPasswordHash = password_hash($data->new_password, PASSWORD_BCRYPT);

        if ($this->user->updatePassword($user['id'], $newPasswordHash, false)) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Password changed successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to change password."
            ));
        }
    }

    public function validateToken($token)
    {
        if (empty($token)) {
            return false;
        }

        // Check token in sessions table
        $query = "SELECT u.id, u.username, u.email, u.role, u.status
                  FROM sessions s
                  JOIN users u ON s.user_id = u.id
                  WHERE s.token = :token
                  AND s.expires_at > NOW()
                  AND u.status = 'active'
                  LIMIT 1";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(":token", $token);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                return array(
                    'id' => (int)$result['id'],
                    'username' => $result['username'],
                    'email' => $result['email'],
                    'role' => $result['role'],
                    'status' => $result['status']
                );
            }
        } catch (PDOException $e) {
            return false;
        }

        return false;
    }

    public function requireRole($token, $allowedRoles)
    {
        $user = $this->validateToken($token);

        if (!$user) {
            return false;
        }

        if (!in_array($user['role'], $allowedRoles)) {
            return false;
        }

        return $user;
    }

    private function generateToken($userId, $role)
    {
        // Generate a secure random token
        $randomBytes = random_bytes(32);
        $timestamp = time();
        $data = $userId . '|' . $role . '|' . $timestamp;

        return bin2hex($randomBytes) . '.' . base64_encode($data);
    }

    private function storeToken($userId, $token)
    {
        // Store token with 24 hour expiration
        $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));

        $query = "INSERT INTO sessions (user_id, token, expires_at)
                  VALUES (:user_id, :token, :expires_at)";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(":user_id", $userId);
            $stmt->bindParam(":token", $token);
            $stmt->bindParam(":expires_at", $expiresAt);
            $stmt->execute();
        } catch (PDOException $e) {
            // Sessions table might not exist yet, silently fail
            return false;
        }

        return true;
    }

    private function revokeToken($token)
    {
        $query = "DELETE FROM sessions WHERE token = :token";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(":token", $token);
            $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }

        return true;
    }

    public function cleanupExpiredTokens()
    {
        $query = "DELETE FROM sessions WHERE expires_at < NOW()";

        try {
            $stmt = $this->db->prepare($query);
            $stmt->execute();
        } catch (PDOException $e) {
            return false;
        }

        return true;
    }
}
