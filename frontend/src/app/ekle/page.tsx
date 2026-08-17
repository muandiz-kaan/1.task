"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createProduct } from "@/services/api";

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError(null);
    setErrors({});

    // Client-side quick check
    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);

    const productData = {
      name: name.trim(),
      price: isNaN(parsedPrice) ? 0 : parsedPrice,
      stock: isNaN(parsedStock) ? 0 : parsedStock,
      description: description.trim() || undefined,
    };

    try {
      await createProduct(productData);
      // Redirect to home page on success
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      console.error("Error creating product:", err);
      
      // Parse validation errors from backend
      if (err && typeof err === "object") {
        if ("errors" in err && err.errors && typeof err.errors === "object") {
          setErrors(err.errors as Record<string, string[]>);
        } else if (!("message" in err)) {
          // Standard dictionary
          setErrors(err as Record<string, string[]>);
        } else {
          const apiError = err as { message?: string };
          setGeneralError(apiError.message || "Ürün eklenirken bir hata oluştu.");
        }
      } else {
        setGeneralError("Sunucuyla bağlantı kurulamadı. Lütfen API'nin çalıştığından emin olun.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper to check for errors on specific fields (case-insensitive for backend compatibility)
  const getFieldError = (fieldName: string): string | null => {
    const key = Object.keys(errors).find(
      (k) => k.toLowerCase() === fieldName.toLowerCase()
    );
    if (key && errors[key] && errors[key].length > 0) {
      return errors[key][0];
    }
    return null;
  };

  return (
    <div className="mx-auto max-w-lg space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-gray-250 pb-4">
        <h1 className="text-xl font-bold text-gray-950">Yeni Ürün Ekle</h1>
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Geri Dön
        </Link>
      </div>

      {/* General Error Box */}
      {generalError && (
        <div className="rounded border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-800 font-medium">{generalError}</p>
        </div>
      )}

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        {/* Name field */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 block">
            Ürün Adı *
          </label>
          <input
            id="name"
            type="text"
            required
            disabled={loading}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full h-10 px-3 text-sm rounded border bg-white focus:outline-none focus:ring-1 transition-colors ${
              getFieldError("name")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            }`}
            placeholder="Örn: Kablosuz Kulaklık"
          />
          {getFieldError("name") && (
            <p className="text-xs text-red-600 font-medium mt-1">{getFieldError("name")}</p>
          )}
        </div>

        {/* Price and Stock row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Price field */}
          <div className="space-y-1">
            <label htmlFor="price" className="text-sm font-medium text-gray-700 block">
              Fiyat (TL) *
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              required
              disabled={loading}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full h-10 px-3 text-sm rounded border bg-white focus:outline-none focus:ring-1 transition-colors ${
                getFieldError("price")
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder="0.00"
            />
            {getFieldError("price") && (
              <p className="text-xs text-red-600 font-medium mt-1">{getFieldError("price")}</p>
            )}
          </div>

          {/* Stock field */}
          <div className="space-y-1">
            <label htmlFor="stock" className="text-sm font-medium text-gray-700 block">
              Stok Adedi *
            </label>
            <input
              id="stock"
              type="number"
              required
              disabled={loading}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className={`w-full h-10 px-3 text-sm rounded border bg-white focus:outline-none focus:ring-1 transition-colors ${
                getFieldError("stock")
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              }`}
              placeholder="0"
            />
            {getFieldError("stock") && (
              <p className="text-xs text-red-600 font-medium mt-1">{getFieldError("stock")}</p>
            )}
          </div>
        </div>

        {/* Description field */}
        <div className="space-y-1">
          <label htmlFor="description" className="text-sm font-medium text-gray-700 block">
            Açıklama
          </label>
          <textarea
            id="description"
            disabled={loading}
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-3 text-sm rounded border bg-white focus:outline-none focus:ring-1 transition-colors ${
              getFieldError("description")
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            }`}
            placeholder="Ürün hakkında kısa bilgi girin..."
          />
          {getFieldError("description") && (
            <p className="text-xs text-red-600 font-medium mt-1">{getFieldError("description")}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              setName("");
              setPrice("");
              setStock("");
              setDescription("");
              setErrors({});
              setGeneralError(null);
            }}
            className="inline-flex h-10 items-center justify-center rounded border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            Temizle
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 items-center justify-center rounded bg-blue-600 px-5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Kaydediliyor..." : "Ürünü Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
}
