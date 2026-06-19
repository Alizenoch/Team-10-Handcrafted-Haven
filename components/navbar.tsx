"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingCart,
  Search,
  Home,
  Grid2X2Icon,
  User,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        setIsLoggedIn(res.ok);
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/");
    router.refresh();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/products?search=${search}`);
  };

  const isActive = (href: string) => {
    // Handle exact match for root
    if (href === "/") return pathname === "/";
    // For other paths, check if pathname starts with href (to allow nested routes)
    return pathname.startsWith(href) && !pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <header className="hidden lg:flex fixed top-0 w-full bg-white border-b border-gray-200/60 z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 py-4">

          {/* LOGO */}
          <div className="flex gap-4 items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h1 className="font-bold leading-none text-primary">Handcrafted</h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="flex gap-8 text-sm font-medium">
            <Link 
              href="/" 
              className={`${isActive("/") ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary transition-colors"}`}
            >
              Home
            </Link>
            <Link 
              href="/categories" 
              className={`${isActive("/categories") ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary transition-colors"}`}
            >
              Categories
            </Link>
            <Link 
              href="/artisans" 
              className={`${isActive("/artisans") ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary transition-colors"}`}
            >
              Artisans
            </Link>
            <Link 
              href="/products" 
              className={`${isActive("/products") ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary transition-colors"}`}
            >
              Products
            </Link>
            {isLoggedIn && (
              <Link 
                href="/dashboard" 
                className={`${isActive("/dashboard") ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary transition-colors"}`}
              >
                Dashboard
              </Link>
            )}
            <Link 
              href="/about" 
              className={`${isActive("/about") ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary transition-colors"}`}
            >
              About
            </Link>
          </nav>

          {/* SEARCH + ICONS */}
          <div className="flex items-center gap-3">

            {/* Search — no border, bg-white */}
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition"
            >
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="outline-none text-sm bg-transparent w-32"
              />
            </form>

            <Link href="/cart" className="flex items-center gap-1 text-sm">
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>

            {!isLoggedIn ? (
              <Link
                href="/auth/login"
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= TABLET ================= */}
      <header className="hidden md:flex lg:hidden fixed top-0 w-full bg-white border-b border-gray-200/60 z-50">
        <div className="w-full flex items-center justify-between px-4 py-4">

          {/* LOGO */}
          <div className="flex gap-4 items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h1 className="font-bold leading-none text-primary">Handcrafted</h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
          </div>

          {/* SEARCH + ICONS */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition">
              <Search size={15} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm bg-transparent"
              />
            </div>

            <Link href="/wishlist"><Heart size={20} /></Link>
            <Link href="/cart"><ShoppingCart size={20} /></Link>

            {!isLoggedIn ? (
              <Link
                href="/auth/login"
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-400 transition"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ================= MOBILE ================= */}
      <header className="md:hidden fixed top-0 w-full bg-white border-b border-gray-200/60 z-50">
        <div className="container mx-auto flex justify-between items-center px-2 py-4">
          {/* LOGO */}
          <div className="flex gap-4 items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h1 className="font-bold leading-none text-primary">Handcrafted</h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
          </div>

          <Search />
          <button className="text-2xl bg-accent size-10">☰</button>
        </div>

        <nav className="flex md:hidden fixed bottom-0 w-full bg-white justify-around py-3 z-50">
          <Link 
            href="/" 
            className={`${isActive("/") ? "text-primary border-b-2" : "text-gray-500 hover:text-primary transition-colors"} flex flex-col items-center gap-1`}
          >
            <Home size={20} />
            Home
          </Link>
          <Link 
            href="/products" 
            className={`${isActive("/products") ? "text-primary border-b-2" : "text-gray-500 hover:text-primary transition-colors"} flex flex-col items-center gap-1`}
          >
            <Grid2X2Icon size={20} />
            Products
          </Link>
          <Link 
            href="/cart" 
            className={`${isActive("/cart") ? "text-primary border-b-2" : "text-gray-500 hover:text-primary transition-colors"} flex flex-col items-center gap-1`}
          >
            <ShoppingCart size={20} />
            Cart
          </Link>
          <Link 
            href="/wishlist" 
            className={`${isActive("/wishlist") ? "text-primary border-b-2" : "text-gray-500 hover:text-primary transition-colors"} flex flex-col items-center gap-1`}
          >
            <Heart size={20} />
            Wishlist
          </Link>
          {isLoggedIn && (
            <Link 
              href="/dashboard" 
              className={`${isActive("/dashboard") ? "text-primary border-b-2" : "text-gray-500 hover:text-primary transition-colors"} flex flex-col items-center gap-1`}
            >
              <User size={20} />
              Dashboard
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}