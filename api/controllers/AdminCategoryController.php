<?php
class AdminCategoryController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function create()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->name)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Category name is required."
            ));
            return;
        }

        $query = "INSERT INTO Categories (name) VALUES (:name)";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":name", $data->name);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array(
                "success" => true,
                "message" => "Category created successfully.",
                "id" => $this->db->lastInsertId()
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to create category."
            ));
        }
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->name)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Category name is required."
            ));
            return;
        }

        $query = "UPDATE Categories SET name = :name WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $data->name);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Category updated successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to update category."
            ));
        }
    }

    public function delete($id)
    {
        // Check if category has products
        $checkQuery = "SELECT COUNT(*) as count FROM Products WHERE categoryId = :id";
        $checkStmt = $this->db->prepare($checkQuery);
        $checkStmt->bindParam(":id", $id);
        $checkStmt->execute();
        $result = $checkStmt->fetch(PDO::FETCH_ASSOC);

        if ($result['count'] > 0) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Cannot delete category with existing products."
            ));
            return;
        }

        $query = "DELETE FROM Categories WHERE id = :id";
        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Category deleted successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to delete category."
            ));
        }
    }
}
