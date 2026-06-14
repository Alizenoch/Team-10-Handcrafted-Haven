"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login failed");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Network error, please try again.");
    }
  };

  return (
    
    <main className="pt-28 px-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>

        {error && <p className="text-red-500 mt-2">{error}</p>}
        <p className="mt-4 text-center text-sm">
        Don't have an account?{" "}
        <Link
        href="/auth/register"
        className="text-green-600 hover:underline"
       >
       Create an Account
      </Link>
      </p>

      
    </main>
    
  );

}

