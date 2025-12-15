<?php
class AdminBlogController
{
    private $db;
    private $blog;

    public function __construct($db)
    {
        $this->db = $db;
        $this->blog = new Blog($db);
    }

    public function create()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (!isset($data->title) || !isset($data->content) || !isset($data->author)) {
            http_response_code(400);
            echo json_encode(array(
                "success" => false,
                "message" => "Title, content, and author are required."
            ));
            return;
        }

        $query = "INSERT INTO Blog (title, content, author, heroImageUrl, date) 
                  VALUES (:title, :content, :author, :heroImageUrl, NOW())";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":title", $data->title);
        $stmt->bindParam(":content", $data->content);
        $stmt->bindParam(":author", $data->author);
        $heroImageUrl = $data->heroImageUrl ?? null;
        $stmt->bindParam(":heroImageUrl", $heroImageUrl);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(array(
                "success" => true,
                "message" => "Blog created successfully.",
                "id" => $this->db->lastInsertId()
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to create blog."
            ));
        }
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"));

        $query = "UPDATE Blog SET 
                  title = :title,
                  content = :content,
                  author = :author,
                  heroImageUrl = :heroImageUrl,
                  date = :date
                  WHERE id = :id";

        $stmt = $this->db->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":title", $data->title);
        $stmt->bindParam(":content", $data->content);
        $stmt->bindParam(":author", $data->author);
        $heroImageUrl = $data->heroImageUrl ?? null;
        $stmt->bindParam(":heroImageUrl", $heroImageUrl);
        $stmt->bindParam(":date", $data->date);

        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Blog updated successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to update blog."
            ));
        }
    }

    public function delete($id)
    {
        // Delete blog ratings first (foreign key constraint)
        $query1 = "DELETE FROM BlogRating WHERE blogId = :id";
        $stmt1 = $this->db->prepare($query1);
        $stmt1->bindParam(":id", $id);
        $stmt1->execute();

        // Delete blog
        $query2 = "DELETE FROM Blog WHERE id = :id";
        $stmt2 = $this->db->prepare($query2);
        $stmt2->bindParam(":id", $id);

        if ($stmt2->execute()) {
            http_response_code(200);
            echo json_encode(array(
                "success" => true,
                "message" => "Blog deleted successfully."
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                "success" => false,
                "message" => "Failed to delete blog."
            ));
        }
    }
}
