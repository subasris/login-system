"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response status:", res.status);
      const text = await res.text(); // get raw response
      console.log("Raw response:", text);
      const data = await res.json();

      if (res.ok && data.message === "Login success") {
        setMessage("✅ " + data.message);
      } else {
        setMessage("❌ " + (data.message || "Invalid credentials"));
      }
    } catch (error: any) {
  console.error("LOGIN ERROR FULL DETAILS:");
  console.error("Message:", error?.message);
  console.error("Stack:", error?.stack);
  console.error("Full Error Object:", error);

  setMessage(
    "⚠️ Error: " + (error?.message || "Something went wrong")
  );
}

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Mar3K Student ICE Registration
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Username */}
          <div>
            <label className="text-white text-sm">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg mt-1 bg-white/90 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg mt-1 bg-white/90 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition"
          >
            {loading ? "Checking..." : "Submit"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-center mt-4 text-white font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}