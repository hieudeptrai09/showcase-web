<?php
class BlogController
{
    private $db;
    private $blog;

    public function __construct($db)
    {
        $this->db = $db;
        $this->blog = new Blog($db);
    }

    public function getAll()
    {
        $blogs = $this->blog->getAll();

        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "data" => $blogs
        ));
    }

    public function getById($id)
    {
        $blog = $this->blog->getById($id);

        if ($blog !== null) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "data" => $blog
            ));
        } else {
            http_response_code(404);
            echo json_encode(array(
                "success" => false,
                "message" => "Blog not found."
            ));
        }
    }
}
