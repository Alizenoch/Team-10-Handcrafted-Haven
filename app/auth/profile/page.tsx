"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/profile");
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch profile. Please log in again.");
      }
    };
    fetchUser();
  }, []);

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!user) {
    return <p className="p-6">Loading profile...</p>;
  }

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="border p-4 rounded">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <button
        className="mt-4 bg-red-600 text-white p-2 rounded"
        onClick={async () => {
          try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (!res.ok) throw new Error("Logout failed");
            window.location.href = "/auth/login";
          } catch (err) {
            console.error(err);
            setError("Logout error, please try again.");
          }
        }}
      >
        Logout
      </button>
    </main>
  );
}
