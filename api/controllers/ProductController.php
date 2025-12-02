<?php
class ProductController
{
    private $db;
    private $product;

    public function __construct($db)
    {
        $this->db = $db;
        $this->product = new Product($db);
    }

    public function getAll()
    {
        $products = $this->product->getAll();

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "data" => $products
        ));
    }

    public function getHighlighted()
    {
        $products = $this->product->getHighlighted();

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "data" => $products
        ));
    }

    public function getById($id)
    {
        $product = $this->product->getById($id);

        if ($product !== null) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "data" => $product
            ));
        } else {
            http_response_code(404);
            echo json_encode(array(
                "success" => false,
                "message" => "Product not found."
            ));
        }
    }
}
