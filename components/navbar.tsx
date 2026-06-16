"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    await fetch("/api/auth/logout", {
      method: "POST",
    });

     setIsLoggedIn(false);

    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <header className="hidden lg:flex fixed top-0 w-full bg-white border-b z-50">
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
              <h1 className="font-bold leading-none text-primary">
                Handcrafted
              </h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
            
          </div>
          
          
          {/* NAV */}
          <nav className="flex gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-primary border-b-2 border-primary"
            >
              Home
            </Link>

            <Link href="/categories">Categories</Link>
            <Link href="/artisans">Artisans</Link>
            <Link href="/products">Products</Link>
            {isLoggedIn && (
             <Link href="/dashboard">Dashboard</Link>
          )}
            <Link href="/about">About</Link>
          </nav>

          {/* SEARCH + ICONS */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border border-gray-300 px-4 py-1 rounded">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm"
              />
            </div>

            
            <Link
            href="/cart"
           className="flex items-center gap-1"
           >
           <ShoppingCart size={20} />
          <span>Cart</span>
          </Link>
            

            <div className="flex items-center gap-2">
            {!isLoggedIn ? (
            <Link
           href="/auth/login"
            className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
         >
         Login
         </Link>
         ) : (
        <button
       onClick={handleLogout}
      className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
      >
      Logout
      </button>
        )}
         </div>
          </div>
        </div>
      </header>

      {/* ================= TABLET ================= */}
      <header className="hidden md:flex lg:hidden fixed top-0 w-full bg-white border-b z-50">
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
              <h1 className="font-bold leading-none text-primary">
                Handcrafted
              </h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
          </div>

          {/* SEARCH + ICONS */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border border-gray-300 px-4 py-1 rounded">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm"
              />
            </div>

            <Link href="/wishlist">
              <Heart size={20} />
            </Link>
            <Link href="/cart">
            <ShoppingCart size={20} />
            </Link>
            <div className="flex items-center gap-2">
            {!isLoggedIn ? (
            <Link
            href="/auth/login"
            className="px-3 py-2 text-sm border rounded hover:bg-gray-100"
            >
          Login
          </Link>
          ) : (
          <button
          onClick={handleLogout}
          className="px-3 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
         >
         Logout
         </button>
        )}
        </div>
          </div>
        </div>
      </header>

      {/* ================= MOBILE ================= */}
      <header className="md:hidden fixed top-0 w-full bg-white border-b z-50">
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
              <h1 className="font-bold leading-none text-primary">
                Handcrafted
              </h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
          </div>

          <Search />
          <button className="text-2xl bg-accent size-10">☰</button>
        </div>

        <nav className="flex md:hidden fixed bottom-0 w-full bg-white text-primary border-b-2 border-primary justify-around py-3 z-50">
          <Link href="/" className="flex flex-col items-center gap-1">
            <Home size={20} />
            Home
          </Link>

          <Link href="/products" className="flex flex-col items-center gap-1">
            <Grid2X2Icon size={20} />
            Products
          </Link>

          <Link href="/cart" className="flex flex-col items-center gap-1">
            <ShoppingCart size={20} />
            Cart
          </Link>

          <Link href="/wishlist" className="flex flex-col items-center gap-1">
            <Heart size={20} />
            Wishlist
          </Link>

          {isLoggedIn && (
           <Link href="/dashboard" className="flex flex-col items-center gap-1">
          <User size={20} />
          Dashboard
         </Link>
       )}
        </nav>
      </header>
    </>
  );
}

