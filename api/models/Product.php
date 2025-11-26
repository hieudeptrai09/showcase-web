<?php
class Product
{
    private $conn;
    private $table_name = "Products";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $query = "SELECT 
                    p.id,
                    p.name,
                    p.categoryId,
                    c.name as categoryName,
                    p.price,
                    p.noInStock,
                    p.description
                  FROM " . $this->table_name . " p
                  LEFT JOIN Categories c ON p.categoryId = c.id
                  ORDER BY p.id ASC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $products = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $product = array(
                "id" => (int)$row['id'],
                "name" => $row['name'],
                "categoryId" => (int)$row['categoryId'],
                "categoryName" => $row['categoryName'],
                "price" => (float)$row['price'],
                "noInStock" => (int)$row['noInStock'],
                "description" => $row['description'],
                "images" => $this->getImages($row['id']),
                "qna" => $this->getQnA($row['id']),
                "ratings" => $this->getRatings($row['id'])
            );
            array_push($products, $product);
        }

        return $products;
    }

    public function getById($id)
    {
        $query = "SELECT 
                    p.id,
                    p.name,
                    p.categoryId,
                    c.name as categoryName,
                    p.price,
                    p.noInStock,
                    p.description
                  FROM " . $this->table_name . " p
                  LEFT JOIN Categories c ON p.categoryId = c.id
                  WHERE p.id = ?
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $product = array(
                "id" => (int)$row['id'],
                "name" => $row['name'],
                "categoryId" => (int)$row['categoryId'],
                "categoryName" => $row['categoryName'],
                "price" => (float)$row['price'],
                "noInStock" => (int)$row['noInStock'],
                "description" => $row['description'],
                "images" => $this->getImages($row['id']),
                "qna" => $this->getQnA($row['id']),
                "ratings" => $this->getRatings($row['id'])
            );
            return $product;
        }

        return null;
    }

    private function getImages($productId)
    {
        $query = "SELECT url FROM ProductImage WHERE productId = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $productId);
        $stmt->execute();

        $images = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            array_push($images, $row['url']);
        }

        return $images;
    }

    private function getQnA($productId)
    {
        $query = "SELECT id, question, answer FROM ProductQnA WHERE productId = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $productId);
        $stmt->execute();

        $qna = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $item = array(
                "id" => (int)$row['id'],
                "question" => $row['question'],
                "answer" => $row['answer']
            );
            array_push($qna, $item);
        }

        return $qna;
    }

    private function getRatings($productId)
    {
        $query = "SELECT id, rating, author, comment FROM ProductRating WHERE productId = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $productId);
        $stmt->execute();

        $ratings = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $rating = array(
                "id" => (int)$row['id'],
                "rating" => (int)$row['rating'],
                "author" => $row['author'],
                "comment" => $row['comment']
            );
            array_push($ratings, $rating);
        }

        return $ratings;
    }
}
