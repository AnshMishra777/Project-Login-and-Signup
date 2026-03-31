import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
    const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await fetch("http://localhost:6969/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));

    navigate("/leetcode"); // 🔥 redirect

  } catch (err) {
    setError("Server error");
  }
};
 

  return (
    <div className="min-h-screen w-screen px-4 py-8 flex justify-center items-center bg-linear-to-tr from-blue-100 via-sky-100 to-blue-200">
      <div className="w-full max-w-sm rounded-4xl bg-linear-to-tr from-blue-100 via-sky-100 to-blue-200 border border-blue-200 shadow-2xl p-7">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-blue-900">Login</h1>
          <p className="mt-2 text-sm text-blue-800/80">Access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-blue-900" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-blue-200 bg-white/90 px-3 py-2.5 text-sm text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-blue-900" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-blue-200 bg-white/90 px-3 py-2.5 text-sm text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}
          {success ? (
            <p className="rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-700">{success}</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-700 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-[0.99]"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-blue-900/85">
          Don't have an account?{" "}
          <Link className="font-semibold text-blue-700 hover:text-blue-900" to="/signin">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
