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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-gray-250 pb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-950">Ürün Kataloğu</h1>
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

      {/* Loading (Grid Skeleton) */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse aspect-square rounded-lg border border-gray-200 bg-white"></div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="rounded border border-gray-250 bg-white p-8 text-center text-gray-500 text-sm">
          Katalogda henüz ürün bulunmuyor.
        </div>
      )}

      {/* Products Grid (Square Cards with Details) */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => {
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow aspect-square"
              >
                {/* Top Section */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-bold text-gray-950 line-clamp-1" title={product.name}>
                      {product.name}
                    </h2>
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-semibold border ${
                        isOutOfStock
                          ? "border-red-200 bg-red-50 text-red-700"
                          : "border-green-200 bg-green-50 text-green-700"
                      }`}
                    >
                      {isOutOfStock ? "Tükendi" : `Stok: ${product.stock}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-4 leading-relaxed">
                    {product.description || "Açıklama belirtilmemiş."}
                  </p>
                </div>

                {/* Bottom Section */}
                <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-base font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatDate(product.createdDate)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
