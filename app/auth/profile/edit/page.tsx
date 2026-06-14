"use client";

import { useEffect, useState } from "react";

export default function EditProfilePage() {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [message, setMessage] = useState("");

useEffect(() => {
const fetchProfile = async () => {
try {
const res = await fetch("/api/auth/profile");


    if (!res.ok) {
      throw new Error("Failed to load profile");
    }

    const data = await res.json();

    setName(data.user.name);
    setEmail(data.user.email);
  } catch (error) {
    console.error(error);
  }
};

fetchProfile();


}, []);
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/auth/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to update profile");
    }

    setMessage("Profile updated successfully!");
  } catch (error) {
    console.error(error);
    setMessage("Failed to update profile.");
  }
};

return ( <main className="pt-36 max-w-2xl mx-auto px-6"> <div className="bg-white rounded-2xl shadow-md p-8"> <h1 className="text-3xl font-bold mb-6">
Edit Profile </h1>


    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-2 font-medium">
          Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Email
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>

    {message && (
      <p className="mt-4 text-green-600">
        {message}
      </p>
    )}
  </div>
</main>

);
}
