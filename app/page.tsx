"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevents page refresh
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

      const data = await res.json();

      if (res.ok && data.message === "Login success") {
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ Invalid username or password");
      }
    } catch (error) {
      setMessage("⚠️ Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ display: "block", margin: "10px 0" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", margin: "10px 0" }}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Login"}
        </button>
      </form>

      {/* Result message */}
      {message && (
        <p style={{ marginTop: 20, fontWeight: "bold" }}>
          {message}
        </p>
      )}
    </div>
  );
}