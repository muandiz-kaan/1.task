import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ürün Yönetimi"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className="antialiased min-h-screen text-gray-800 bg-gray-50"
      >
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
          <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-gray-950 text-lg">
              1.Task Ürün Katalog
            </Link>
            <nav className="flex items-center gap-5">
              <Link
                href="/"
                className="inline-flex h-9 items-center justify-center rounded bg-gray-900 px-4 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
              >
                Ürün Listesi
              </Link>
            </nav>
          </div>
        </header>
        <main className="container mx-auto max-w-5xl px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
