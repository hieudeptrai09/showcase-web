<?php
class AuthController
{
    private $db;

    // Simple hardcoded admin credentials - in production, use hashed passwords in database
    private $adminUsername = "admin";
    private $adminPassword = "admin123"; // Change this!

    public function __construct($db)
    {
        $this->db = $db;
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

        if ($data->username === $this->adminUsername && $data->password === $this->adminPassword) {
            // Generate a simple token (in production, use JWT or proper session management)
            $token = bin2hex(random_bytes(32));

            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "token" => $token,
                "message" => "Login successful."
            ));
        } else {
            http_response_code(401);
            echo json_encode(array(
                "success" => false,
                "message" => "Invalid credentials."
            ));
        }
    }

    public function validateToken($token)
    {
        // Simple validation - in production, validate against database
        return !empty($token) && strlen($token) === 64;
    }
}
