<?php
class Blog
{
    private $conn;
    private $table_name = "Blog";

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function getAll()
    {
        $query = "SELECT 
                    b.id,
                    b.heroImageUrl as heroImage,
                    b.title,
                    b.date,
                    b.author,
                    b.content
                  FROM " . $this->table_name . " b
                  ORDER BY b.date DESC";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        $blogs = array();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $ratings = $this->getRatings($row['id']);

            $blog = array(
                "id" => (int)$row['id'],
                "heroImage" => $row['heroImage'],
                "title" => $row['title'],
                "date" => $row['date'],
                "author" => $row['author'],
                "content" => $row['content'],
                "like" => $ratings['like'],
                "dislike" => $ratings['dislike']
            );
            array_push($blogs, $blog);
        }

        return $blogs;
    }

    public function getById($id)
    {
        $query = "SELECT 
                    b.id,
                    b.heroImageUrl as heroImage,
                    b.title,
                    b.date,
                    b.author,
                    b.content
                  FROM " . $this->table_name . " b
                  WHERE b.id = ?
                  LIMIT 1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $ratings = $this->getRatings($row['id']);

            $blog = array(
                "id" => (int)$row['id'],
                "heroImage" => $row['heroImage'],
                "title" => $row['title'],
                "date" => $row['date'],
                "author" => $row['author'],
                "content" => $row['content'],
                "like" => $ratings['like'],
                "dislike" => $ratings['dislike']
            );
            return $blog;
        }

        return null;
    }

    private function getRatings($blogId)
    {
        $query = "SELECT 
                    SUM(CASE WHEN rating = 1 THEN 1 ELSE 0 END) as likes,
                    SUM(CASE WHEN rating = -1 THEN 1 ELSE 0 END) as dislikes
                  FROM BlogRating 
                  WHERE blogId = ?";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $blogId);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        return array(
            "like" => (int)($row['likes'] ?? 0),
            "dislike" => (int)($row['dislikes'] ?? 0)
        );
    }
}
