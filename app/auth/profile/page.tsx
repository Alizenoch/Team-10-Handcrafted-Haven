"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type User = {
name: string;
email: string;
};

export default function ProfilePage() {
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
  throw new Error("Failed to load profile");
}

    const data = await res.json();
    setUser(data.user);
  } catch (err) {
    console.error(err);
    setError("Unable to load profile.");
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
Loading profile... </main>
);
}

return ( <main className="pt-36 max-w-4xl mx-auto px-6 pb-12"> <div className="bg-white rounded-2xl shadow-md p-8 text-center"> 
     <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-r from-amber-200 to-orange-200 flex items-center justify-center text-3xl font-bold shadow-md">
  {user.name?.charAt(0)}
</div>


    <h1 className="mt-4 text-3xl font-bold">
      {user.name}
    </h1>

    <p className="text-gray-600">
      {user.email}
    </p>

    <p className="text-sm text-gray-500 mt-2">
      Handcrafted Haven Member
    </p>
    
    <div className="mt-4">
  <Link
    href="/auth/profile/edit"
    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
  >
    Edit Profile
  </Link>
</div>
 </div>

  <div className="grid md:grid-cols-2 gap-6 mt-8">
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-semibold text-lg">
        📦 My Orders
      </h2>
      <p className="text-gray-500 mt-2">
        View your purchases
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-semibold text-lg">
        ❤️ Wishlist
      </h2>
      <p className="text-gray-500 mt-2">
        Saved items
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-semibold text-lg">
       ⚙️  Account Settings
      </h2>
      <p className="text-gray-500 mt-2">
        Manage your account
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="font-semibold text-lg">
       ✅ Member Status
      </h2>
      <p className="text-gray-500 mt-2">
        Active
      </p>
    </div>
  </div>

 
</main>


);
}
