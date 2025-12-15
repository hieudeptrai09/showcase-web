const ADMIN_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(
  "/api",
  "/api/admin"
);

// Auth functions
export async function adminLogin(
  username: string,
  password: string
): Promise<{ success: boolean; token?: string; message?: string }> {
  try {
    const response = await fetch(`${ADMIN_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Login failed" };
  }
}

// Category functions
export async function createCategory(token: string, name: string) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return await response.json();
}

export async function updateCategory(token: string, id: number, name: string) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  return await response.json();
}

export async function deleteCategory(token: string, id: number) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

// Product functions
export async function createProduct(token: string, product: any) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return await response.json();
}

export async function updateProduct(token: string, id: number, product: any) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  return await response.json();
}

export async function deleteProduct(token: string, id: number) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

// Blog functions
export async function createBlog(token: string, blog: any) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  });
  return await response.json();
}

export async function updateBlog(token: string, id: number, blog: any) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/blogs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(blog),
  });
  return await response.json();
}

export async function deleteBlog(token: string, id: number) {
  const response = await fetch(`${ADMIN_API_BASE_URL}/blogs/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}
