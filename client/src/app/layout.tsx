import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "GameVault | Premium Digital Game Store",
    template: "%s | GameVault",
  },
  description:
    "Discover, compare, and buy premium PC games by genre, price, and rating at GameVault.",
  keywords: [
    "game store",
    "buy PC games",
    "digital games",
    "GameVault",
    "VNPay game store",
  ],
  applicationName: "GameVault",
  authors: [{ name: "GameVault" }],
  creator: "GameVault",
  publisher: "GameVault",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GameVault | Premium Digital Game Store",
    description:
      "Browse curated PC games, manage your cart, and checkout securely with VNPay.",
    url: "/",
    siteName: "GameVault",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GameVault | Premium Digital Game Store",
    description:
      "Browse curated PC games, manage your cart, and checkout securely with VNPay.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main className="main-content">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
