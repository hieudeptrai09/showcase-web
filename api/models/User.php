<?php
class User
{
    private $conn;
    private $table_name = "users";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $query = "SELECT 
                    id,
                    username,
                    email,
                    status,
                    role,
                    must_reset_password,
                    created_at,
                    updated_at
                  FROM " . $this->table_name . "
                  ORDER BY created_at DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $users = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $user = array(
                "id" => (int)$row['id'],
                "username" => $row['username'],
                "email" => $row['email'],
                "status" => $row['status'],
                "role" => $row['role'],
                "must_reset_password" => (bool)$row['must_reset_password'],
                "created_at" => $row['created_at'],
                "updated_at" => $row['updated_at']
            );
            array_push($users, $user);
        }

        return $users;
    }

    public function getById($id)
    {
        $query = "SELECT 
                    id,
                    username,
                    email,
                    status,
                    role,
                    must_reset_password,
                    created_at,
                    updated_at
                  FROM " . $this->table_name . "
                  WHERE id = ?
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            return array(
                "id" => (int)$row['id'],
                "username" => $row['username'],
                "email" => $row['email'],
                "status" => $row['status'],
                "role" => $row['role'],
                "must_reset_password" => (bool)$row['must_reset_password'],
                "created_at" => $row['created_at'],
                "updated_at" => $row['updated_at']
            );
        }

        return null;
    }

    public function getByUsername($username)
    {
        $query = "SELECT 
                    id,
                    username,
                    email,
                    password_hash,
                    status,
                    role,
                    must_reset_password
                  FROM " . $this->table_name . "
                  WHERE username = ?
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $username);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function getByEmail($email)
    {
        $query = "SELECT id FROM " . $this->table_name . " WHERE email = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $email);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data)
    {
        $query = "INSERT INTO " . $this->table_name . "
                  (username, email, password_hash, role, status, must_reset_password)
                  VALUES (:username, :email, :password_hash, :role, :status, :must_reset_password)";

        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":username", $data['username']);
        $stmt->bindParam(":email", $data['email']);
        $stmt->bindParam(":password_hash", $data['password_hash']);
        $stmt->bindParam(":role", $data['role']);
        $stmt->bindParam(":status", $data['status']);
        $stmt->bindParam(":must_reset_password", $data['must_reset_password'], PDO::PARAM_BOOL);

        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }

        return false;
    }

    public function update($id, $data)
    {
        // Build dynamic update query based on provided fields
        $fields = array();
        $params = array();

        if (isset($data['username'])) {
            $fields[] = "username = :username";
            $params[':username'] = $data['username'];
        }
        if (isset($data['email'])) {
            $fields[] = "email = :email";
            $params[':email'] = $data['email'];
        }
        if (isset($data['role'])) {
            $fields[] = "role = :role";
            $params[':role'] = $data['role'];
        }
        if (isset($data['status'])) {
            $fields[] = "status = :status";
            $params[':status'] = $data['status'];
        }
        if (isset($data['must_reset_password'])) {
            $fields[] = "must_reset_password = :must_reset_password";
            $params[':must_reset_password'] = $data['must_reset_password'];
        }

        if (empty($fields)) {
            return false;
        }

        $query = "UPDATE " . $this->table_name . "
                  SET " . implode(", ", $fields) . "
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $params[':id'] = $id;

        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }

        return $stmt->execute();
    }

    public function updatePassword($id, $password_hash, $must_reset = false)
    {
        $query = "UPDATE " . $this->table_name . "
                  SET password_hash = :password_hash,
                      must_reset_password = :must_reset
                  WHERE id = :id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":password_hash", $password_hash);
        $stmt->bindParam(":must_reset", $must_reset, PDO::PARAM_BOOL);

        return $stmt->execute();
    }

    public function delete($id)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":id", $id);

        return $stmt->execute();
    }
}
