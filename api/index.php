<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database and models
include_once 'config/database.php';
include_once 'models/Category.php';
include_once 'models/Product.php';
include_once 'models/Blog.php';
include_once 'controllers/CategoryController.php';
include_once 'controllers/ProductController.php';
include_once 'controllers/BlogController.php';

// Instantiate database
$database = new Database();
$db = $database->getConnection();

// Check database connection
if ($db === null) {
    http_response_code(500);
    echo json_encode(array("success" => false, "message" => "Database connection failed."));
    exit();
}

// Get request method and URI
$request_method = $_SERVER["REQUEST_METHOD"];
$request_uri = $_SERVER['REQUEST_URI'];

// Define your base path here
$base_path = '/blogproduct/api';

// Remove base path from URI
$path = parse_url($request_uri, PHP_URL_PATH);
if (strpos($path, $base_path) === 0) {
    $path = substr($path, strlen($base_path));
}

// Parse the URI
$uri_parts = explode('/', trim($path, '/'));

// Remove empty parts
$uri_parts = array_filter($uri_parts, function ($part) {
    return $part !== '';
});
$uri_parts = array_values($uri_parts);

// Routing
if ($request_method === 'GET') {
    if (count($uri_parts) === 0) {
        // API root endpoint
        http_response_code(200);
        echo json_encode(array(
            "success" => true,
            "message" => "API is running",
            "base_path" => $base_path,
            "endpoints" => array(
                "categories" => $base_path . "/categories",
                "products" => $base_path . "/products",
                "blogs" => $base_path . "/blogs"
            )
        ));
    } elseif ($uri_parts[0] === 'categories') {
        $controller = new CategoryController($db);
        if (isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
            $controller->getById($uri_parts[1]);
        } else {
            $controller->getAll();
        }
    } elseif ($uri_parts[0] === 'products') {
        $controller = new ProductController($db);
        if (isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
            $controller->getById($uri_parts[1]);
        } else {
            $controller->getAll();
        }
    } elseif ($uri_parts[0] === 'blogs') {
        $controller = new BlogController($db);
        if (isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
            $controller->getById($uri_parts[1]);
        } else {
            $controller->getAll();
        }
    } else {
        http_response_code(404);
        echo json_encode(array(
            "success" => false,
            "message" => "Endpoint not found.",
            "requested_path" => $uri_parts
        ));
    }
} else {
    http_response_code(405);
    echo json_encode(array(
        "success" => false,
        "message" => "Method not allowed."
    ));
}
