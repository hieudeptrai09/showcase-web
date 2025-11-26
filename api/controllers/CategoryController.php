<?php
class CategoryController
{
    private $db;
    private $category;

    public function __construct($db)
    {
        $this->db = $db;
        $this->category = new Category($db);
    }

    public function getAll()
    {
        $stmt = $this->category->getAll();
        $num = $stmt->rowCount();

        if ($num > 0) {
            $categories_arr = array();

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $category_item = array(
                    "id" => (int)$row['id'],
                    "name" => $row['name']
                );
                array_push($categories_arr, $category_item);
            }

            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "data" => $categories_arr
            ));
        } else {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "data" => array()
            ));
        }
    }

    public function getById($id)
    {
        $stmt = $this->category->getById($id);
        $num = $stmt->rowCount();

        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            $category_item = array(
                "id" => (int)$row['id'],
                "name" => $row['name']
            );

            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "data" => $category_item
            ));
        } else {
            http_response_code(404);
            echo json_encode(array(
                "success" => false,
                "message" => "Category not found."
            ));
        }
    }
}
