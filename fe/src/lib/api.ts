const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApiProduct {
  id: number;
  name: string;
  categoryId: number;
  categoryName: string;
  price: number;
  noInStock: number;
  producer: string;
  description: string;
  images: string[];
  qna: {
    id: number;
    question: string;
    answer: string;
  }[];
  ratings: {
    id: number;
    rating: number;
    author: string;
    comment: string;
  }[];
}

export interface ApiCategory {
  id: number;
  name: string;
}

export interface ApiBlog {
  id: number;
  heroImage: string;
  title: string;
  date: string;
  author: string;
  content: string;
  like: number;
  dislike: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function fetchProducts(): Promise<ApiProduct[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: "no-store",
    });
    const result: ApiResponse<ApiProduct[]> = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function fetchProduct(id: number): Promise<ApiProduct | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: "no-store",
    });
    const result: ApiResponse<ApiProduct> = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function fetchCategories(): Promise<ApiCategory[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      cache: "no-store",
    });
    const result: ApiResponse<ApiCategory[]> = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function fetchBlogs(): Promise<ApiBlog[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      cache: "no-store",
    });
    const result: ApiResponse<ApiBlog[]> = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function fetchBlog(id: number): Promise<ApiBlog | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      cache: "no-store",
    });
    const result: ApiResponse<ApiBlog> = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}
