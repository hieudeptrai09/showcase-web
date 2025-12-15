<?php
class AdminProductController
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function create()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->name) || !isset($data->categoryId) || !isset($data->price)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Name, categoryId, and price are required."
            ));
            return;
        }

        $query = "INSERT INTO Products (name, categoryId, price, noInStock, producer, description, isHighlighted) 
                  VALUES (:name, :categoryId, :price, :noInStock, :producer, :description, :isHighlighted)";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":categoryId", $data->categoryId);
        $stmt->bindParam(":price", $data->price);
        $noInStock = $data->noInStock ?? 0;
        $stmt->bindParam(":noInStock", $noInStock);
        $producer = $data->producer ?? "";
        $stmt->bindParam(":producer", $producer);
        $description = $data->description ?? "";
        $stmt->bindParam(":description", $description);
        $isHighlighted = $data->isHighlighted ?? false;
        $stmt->bindParam(":isHighlighted", $isHighlighted, PDO::PARAM_BOOL);

        if ($stmt->execute()) {
            $productId = $this->db->lastInsertId();

            // Add images if provided
            if (isset($data->images) && is_array($data->images)) {
                foreach ($data->images as $imageUrl) {
                    $imgQuery = "INSERT INTO ProductImage (productId, url) VALUES (:productId, :url)";
                    $imgStmt = $this->db->prepare($imgQuery);
                    $imgStmt->bindParam(":productId", $productId);
                    $imgStmt->bindParam(":url", $imageUrl);
                    $imgStmt->execute();
                }
            }

            http_response_code(201);
            echo json_encode(array(
                "success" => true,
                "message" => "Product created successfully.",
                "id" => $productId
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to create product."
            ));
        }
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"));

        $query = "UPDATE Products SET 
                  name = :name,
                  categoryId = :categoryId,
                  price = :price,
                  noInStock = :noInStock,
                  producer = :producer,
                  description = :description,
                  isHighlighted = :isHighlighted
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":name", $data->name);
        $stmt->bindParam(":categoryId", $data->categoryId);
        $stmt->bindParam(":price", $data->price);
        $stmt->bindParam(":noInStock", $data->noInStock);
        $stmt->bindParam(":producer", $data->producer);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":isHighlighted", $data->isHighlighted, PDO::PARAM_BOOL);

        if ($stmt->execute()) {
            // Update images if provided
            if (isset($data->images) && is_array($data->images)) {
                // Delete existing images
                $delQuery = "DELETE FROM ProductImage WHERE productId = :productId";
                $delStmt = $this->db->prepare($delQuery);
                $delStmt->bindParam(":productId", $id);
                $delStmt->execute();

                // Add new images
                foreach ($data->images as $imageUrl) {
                    $imgQuery = "INSERT INTO ProductImage (productId, url) VALUES (:productId, :url)";
                    $imgStmt = $this->db->prepare($imgQuery);
                    $imgStmt->bindParam(":productId", $id);
                    $imgStmt->bindParam(":url", $imageUrl);
                    $imgStmt->execute();
                }
            }

            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Product updated successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to update product."
            ));
        }
    }

    public function delete($id)
    {
        // Delete related data first
        $queries = [
            "DELETE FROM ProductImage WHERE productId = :id",
            "DELETE FROM ProductQnA WHERE productId = :id",
            "DELETE FROM ProductRating WHERE productId = :id",
            "DELETE FROM Products WHERE id = :id"
        ];

        foreach ($queries as $query) {
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
        }

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "Product deleted successfully."
        ));
    }
}
