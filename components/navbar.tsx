import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Search ,Home, Grid2X2Icon , User} from "lucide-react";

export default function Navbar() {
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
              <h1 className="font-bold leading-none text-primary">Handcrafted</h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="flex gap-8 text-sm font-medium">
  <Link href="/" className="text-primary border-b-2 border-primary">
    Home
  </Link>

  <Link href="/categories">Categories</Link>

  <Link href="/artisans">Artisans</Link>

  <Link href="/products">Products</Link>

  <Link href="/about">About</Link>
</nav>

          {/* SEARCH + ICONS */}
          <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 border-solid border border-gray-300 px-4 py-1 rounded">

              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm"
              />
            </div>

            <Heart size={20} />
            <ShoppingCart size={20} />

            <Image
              src="/images/profile.png"
              alt="Profile"
              width={38}
              height={38}
              className="rounded-full"
            />
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
              <h1 className="font-bold leading-none text-primary">Handcrafted</h1>
              <p className="font-semibold leading-none text-accent">Haven</p>
            </div>
          </div>
                    {/* SEARCH + ICONS */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 border-solid border border-gray-300 px-4 py-1 rounded">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none text-sm"
              />
            </div>

            <Heart size={20} />
            <ShoppingCart size={20} />

            <Image
              src="/images/profile.png"
              alt="Profile"
              width={38}
              height={38}
              className="rounded-full"
            />
          </div>
        </div>
      </header>

      {/* ================= MOBILE ================= */}
      <header className="md:hidden fixed top-0 w-full bg-white border-b z-50 ">
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


        <nav className="flex md:hidden fixed bottom-0 w-full bg-white text-primary border-b-2 border-primary justify-around py-3 z-50">
<Link href="/" className="flex flex-col items-center gap-1">
  <Home size={20} />
  Home
</Link>
   <Link href="/products" className="flex flex-col items-center gap-1">
  <Grid2X2Icon size={20} />
  Products
</Link>     
   <a className="flex flex-col items-center gap-1">
    <ShoppingCart size={20} />
    Cart
  </a>           
   <a className="flex flex-col items-center gap-1">
    <Heart size={20} />
    Wishlist
  </a> 
  <a className="flex flex-col items-center gap-1">
    <User size={20} />
    Profile
    </a>       
    </nav>

      </header>

    </>
  );
}