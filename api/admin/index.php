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

// Include database and controllers
include_once '../config/database.php';
include_once '../models/Category.php';
include_once '../models/Product.php';
include_once '../models/Blog.php';
include_once '../controllers/AuthController.php';
include_once '../controllers/AdminCategoryController.php';
include_once '../controllers/AdminProductController.php';
include_once '../controllers/AdminBlogController.php';

// Instantiate database
$database = new Database();
$db = $database->getConnection();

if ($db === null) {
    http_response_code(500);
    echo json_encode(array("success" => false, "message" => "Database connection failed."));
    exit();
}

// Get request method and URI
$request_method = $_SERVER["REQUEST_METHOD"];
$request_uri = $_SERVER['REQUEST_URI'];

// Define base path
$base_path = '/blogproduct/api/admin';

// Remove base path from URI
$path = parse_url($request_uri, PHP_URL_PATH);
if (strpos($path, $base_path) === 0) {
    $path = substr($path, strlen($base_path));
}

// Parse the URI
$uri_parts = explode('/', trim($path, '/'));
$uri_parts = array_filter($uri_parts, function ($part) {
    return $part !== '';
});
$uri_parts = array_values($uri_parts);

// Authentication check (except for login endpoint)
$authController = new AuthController($db);

if (count($uri_parts) > 0 && $uri_parts[0] === 'login') {
    if ($request_method === 'POST') {
        $authController->login();
    } else {
        http_response_code(405);
        echo json_encode(array("success" => false, "message" => "Method not allowed."));
    }
    exit();
}

// Validate token for all other endpoints
$headers = getallheaders();
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

if (!$authController->validateToken($token)) {
    http_response_code(401);
    echo json_encode(array("success" => false, "message" => "Unauthorized."));
    exit();
}

// Admin routing
if (count($uri_parts) === 0) {
    http_response_code(200);
    echo json_encode(array(
        "success" => true,
        "message" => "Admin API is running",
        "endpoints" => array(
            "login" => "POST /admin/login",
            "categories" => "GET/POST /admin/categories",
            "category" => "GET/PUT/DELETE /admin/categories/{id}",
            "products" => "GET/POST /admin/products",
            "product" => "GET/PUT/DELETE /admin/products/{id}",
            "blogs" => "GET/POST /admin/blogs",
            "blog" => "GET/PUT/DELETE /admin/blogs/{id}"
        )
    ));
    exit();
}

// Categories routing
if ($uri_parts[0] === 'categories') {
    $controller = new AdminCategoryController($db);

    if ($request_method === 'GET') {
        $categoryController = new CategoryController($db);
        if (isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
            $categoryController->getById($uri_parts[1]);
        } else {
            $categoryController->getAll();
        }
    } elseif ($request_method === 'POST') {
        $controller->create();
    } elseif ($request_method === 'PUT' && isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
        $controller->update($uri_parts[1]);
    } elseif ($request_method === 'DELETE' && isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
        $controller->delete($uri_parts[1]);
    } else {
        http_response_code(405);
        echo json_encode(array("success" => false, "message" => "Method not allowed."));
    }
}
// Products routing
elseif ($uri_parts[0] === 'products') {
    $controller = new AdminProductController($db);

    if ($request_method === 'GET') {
        $productController = new ProductController($db);
        if (isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
            $productController->getById($uri_parts[1]);
        } else {
            $productController->getAll();
        }
    } elseif ($request_method === 'POST') {
        $controller->create();
    } elseif ($request_method === 'PUT' && isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
        $controller->update($uri_parts[1]);
    } elseif ($request_method === 'DELETE' && isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
        $controller->delete($uri_parts[1]);
    } else {
        http_response_code(405);
        echo json_encode(array("success" => false, "message" => "Method not allowed."));
    }
}
// Blogs routing
elseif ($uri_parts[0] === 'blogs') {
    $controller = new AdminBlogController($db);

    if ($request_method === 'GET') {
        $blogController = new BlogController($db);
        if (isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
            $blogController->getById($uri_parts[1]);
        } else {
            $blogController->getAll();
        }
    } elseif ($request_method === 'POST') {
        $controller->create();
    } elseif ($request_method === 'PUT' && isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
        $controller->update($uri_parts[1]);
    } elseif ($request_method === 'DELETE' && isset($uri_parts[1]) && is_numeric($uri_parts[1])) {
        $controller->delete($uri_parts[1]);
    } else {
        http_response_code(405);
        echo json_encode(array("success" => false, "message" => "Method not allowed."));
    }
} else {
    http_response_code(404);
    echo json_encode(array("success" => false, "message" => "Endpoint not found."));
}
