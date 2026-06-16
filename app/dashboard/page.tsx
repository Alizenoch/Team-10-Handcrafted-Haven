"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type User = {
name: string;
email: string;
products?: any[];
reviews?: any[];
};

export default function DashboardPage() {
const [user, setUser] = useState<User | null>(null);
const [error, setError] = useState("");
const router = useRouter();

useEffect(() => {
const fetchProfile = async () => {
try {
const res = await fetch("/api/auth/profile");


    if (res.status === 401) {
  router.push("/auth/login");
  return;
}

    if (!res.ok) {
      throw new Error("Failed to load dashboard");
    }

    const data = await res.json();
    setUser(data.user);
  } catch (err) {
    console.error(err);
    setError("Please log in.");
  }
};
fetchProfile();
}, [router]);
if (error) {
return ( <main className="pt-36 text-center"> <p className="text-red-500">{error}</p> </main>
);
}
if (!user) {
return ( <main className="pt-36 text-center">
Loading dashboard... </main>
);
}
return ( <main className="pt-36 max-w-6xl mx-auto px-6 pb-12"> <div className="mb-8"> <h1 className="text-4xl font-bold">
Dashboard </h1>


    <p className="text-gray-600 mt-2">
      Welcome back, {user.name}
    </p>
  </div>

  <div className="grid md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="font-semibold">
       📦 Products
      </h3>

      <p className="text-3xl font-bold mt-2">
        {user.products?.length || 0}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="font-semibold">
        📝 Reviews
      </h3>

      <p className="text-3xl font-bold mt-2">
        {user.reviews?.length || 0}
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="font-semibold">
        📦 Orders
      </h3>

      <p className="text-3xl font-bold mt-2">
        0
      </p>
    </div>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
    <h2 className="text-xl font-semibold mb-4">
      Seller Tools
    </h2>

   <div className="grid md:grid-cols-3 gap-6">
  <Link
    href="/dashboard/my-products"
    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
  >
    <h3 className="text-xl font-semibold">
      📦 My Products
    </h3>

<p className="text-gray-500 mt-2">
  View all products
</p>
  </Link>
  <Link
    href="/dashboard/add-product"
    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
  >
    <h3 className="text-xl font-semibold">
      ➕ Add Product
    </h3>
<p className="text-gray-500 mt-2">
  Create a new listing
</p>

  </Link>

  <Link
    href="/auth/profile"
    className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
  >
    <h3 className="text-xl font-semibold">
      👤 My Profile
    </h3>


<p className="text-gray-500 mt-2">
  Manage account settings
</p>

  </Link>
</div>

  </div>

  <div className="bg-white rounded-2xl shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4">
      Recent Products
    </h2>

    <p className="text-gray-500">
      Your latest handcrafted products will appear here.
    </p>
  </div>
</main>

);
}
