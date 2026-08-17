import { Product } from "@/types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5108";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Ürünler yüklenirken bir hata oluştu.");
  }

  return response.json();
}

export async function createProduct(productData: Omit<Product, "id" | "createdDate">): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const errorData = await response.json();
      throw errorData;
    }
    throw new Error("Ürün eklenirken bir hata oluştu.");
  }

  return response.json();
}
