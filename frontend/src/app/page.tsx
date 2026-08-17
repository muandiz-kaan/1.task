"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Ürünler yüklenirken sunucuyla bağlantı kurulamadı.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-gray-250 pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-950">Ürün Listesi</h1>
        </div>
        <Link
          href="/ekle"
          className="inline-flex h-9 items-center justify-center rounded bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Yeni Ürün Ekle
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-4 text-center">
          <p className="text-sm text-red-800 font-medium">{error}</p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse h-12 rounded border border-gray-200 bg-white"></div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="rounded border border-gray-250 bg-white p-8 text-center text-gray-500 text-sm">
          Katalogda henüz ürün bulunmuyor.
        </div>
      )}

      {/* Simplified Products List (Only Titles) */}
      {!loading && !error && products.length > 0 && (
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm">
          {products.map((product) => (
            <div key={product.id} className="p-4 flex items-center justify-between">
              <span className="font-semibold text-gray-900">{product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
