<?php
class AdminUserController
{
    private $db;
    private $user;

    public function __construct($db)
    {
        $this->db = $db;
        $this->user = new User($db);
    }

    public function getAll()
    {
        $users = $this->user->getAll();

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "data" => $users
        ));
    }

    public function getById($id)
    {
        $user = $this->user->getById($id);

        if ($user !== null) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "data" => $user
            ));
        } else {
            http_response_code(404);
            echo json_encode(array(
                "success" => false,
                "message" => "User not found."
            ));
        }
    }

    public function create()
    {
        $data = json_decode(file_get_contents("php://input"));

        // Validate required fields
        if (!isset($data->username) || !isset($data->email)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Username and email are required."
            ));
            return;
        }

        // Validate email format
        if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Invalid email format."
            ));
            return;
        }

        // Check if username already exists
        $existingUser = $this->user->getByUsername($data->username);
        if ($existingUser) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Username already exists."
            ));
            return;
        }

        // Check if email already exists
        $existingEmail = $this->user->getByEmail($data->email);
        if ($existingEmail) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Email already exists."
            ));
            return;
        }

        // Set defaults
        $role = isset($data->role) ? $data->role : 'content';
        $status = isset($data->status) ? $data->status : 'active';
        $password = isset($data->password) ? $data->password : null;
        $must_reset = true;

        // Validate role
        $validRoles = array('admin', 'editor', 'content');
        if (!in_array($role, $validRoles)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Invalid role. Must be one of: admin, editor, content."
            ));
            return;
        }

        // Validate status
        $validStatuses = array('active', 'inactive');
        if (!in_array($status, $validStatuses)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Invalid status. Must be one of: active, inactive."
            ));
            return;
        }

        // Hash password if provided, otherwise set to null
        $password_hash = null;
        if ($password) {
            if (strlen($password) < 8) {
                http_response_code(400);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Password must be at least 8 characters long."
                ));
                return;
            }
            $password_hash = password_hash($password, PASSWORD_BCRYPT);
            $must_reset = isset($data->must_reset_password) ? $data->must_reset_password : true;
        }

        $userData = array(
            'username' => $data->username,
            'email' => $data->email,
            'password_hash' => $password_hash,
            'role' => $role,
            'status' => $status,
            'must_reset_password' => $must_reset
        );

        $userId = $this->user->create($userData);

        if ($userId) {
            http_response_code(201);
            echo json_encode(array(
                "success" => true,
                "message" => "User created successfully.",
                "id" => (int)$userId
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to create user."
            ));
        }
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"));

        // Check if user exists
        $existingUser = $this->user->getById($id);
        if (!$existingUser) {
            http_response_code(404);
            echo json_encode(array(
                "success" => false,
                "message" => "User not found."
            ));
            return;
        }

        $updateData = array();

        // Validate and add username if provided
        if (isset($data->username)) {
            $usernameCheck = $this->user->getByUsername($data->username);
            if ($usernameCheck && $usernameCheck['id'] != $id) {
                http_response_code(400);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Username already exists."
                ));
                return;
            }
            $updateData['username'] = $data->username;
        }

        // Validate and add email if provided
        if (isset($data->email)) {
            if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Invalid email format."
                ));
                return;
            }
            $emailCheck = $this->user->getByEmail($data->email);
            if ($emailCheck && $emailCheck['id'] != $id) {
                http_response_code(400);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Email already exists."
                ));
                return;
            }
            $updateData['email'] = $data->email;
        }

        // Validate and add role if provided
        if (isset($data->role)) {
            $validRoles = array('admin', 'editor', 'content');
            if (!in_array($data->role, $validRoles)) {
                http_response_code(400);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Invalid role."
                ));
                return;
            }
            $updateData['role'] = $data->role;
        }

        // Validate and add status if provided
        if (isset($data->status)) {
            $validStatuses = array('active', 'inactive');
            if (!in_array($data->status, $validStatuses)) {
                http_response_code(400);
                echo json_encode(array(
                    "success" => false,
                    "message" => "Invalid status."
                ));
                return;
            }
            $updateData['status'] = $data->status;
        }

        // Add must_reset_password if provided
        if (isset($data->must_reset_password)) {
            $updateData['must_reset_password'] = $data->must_reset_password;
        }

        if ($this->user->update($id, $updateData)) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "User updated successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to update user."
            ));
        }
    }

    public function resetPassword($id)
    {
        $data = json_decode(file_get_contents("php://input"));

        // Check if user exists
        $existingUser = $this->user->getById($id);
        if (!$existingUser) {
            http_response_code(404);
            echo json_encode(array(
                "success" => false,
                "message" => "User not found."
            ));
            return;
        }

        if (!isset($data->password)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Password is required."
            ));
            return;
        }

        if (strlen($data->password) < 8) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Password must be at least 8 characters long."
            ));
            return;
        }

        $password_hash = password_hash($data->password, PASSWORD_BCRYPT);
        $must_reset = isset($data->must_reset_password) ? $data->must_reset_password : true;

        if ($this->user->updatePassword($id, $password_hash, $must_reset)) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Password reset successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to reset password."
            ));
        }
    }

    public function delete($id)
    {
        // Check if user exists
        $existingUser = $this->user->getById($id);
        if (!$existingUser) {
            http_response_code(404);
            echo json_encode(array(
                "success" => false,
                "message" => "User not found."
            ));
            return;
        }

        // Prevent deleting yourself (get current user from token)
        // This would require passing the current user context

        if ($this->user->delete($id)) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "User deleted successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to delete user."
            ));
        }
    }
}
