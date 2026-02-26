import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    localStorage.setItem(
      "auth_demo_user",
      JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      })
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen w-screen px-4 py-8 flex justify-center items-center bg-linear-to-tr from-blue-100 via-sky-100 to-blue-200">
      <div className="w-full max-w-sm rounded-4xl bg-gradient-to-tr from-green-100 via-emerald-50 to-green-200 border border-green-200 shadow-2xl p-7">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-blue-900">Sign Up</h1>
          <p className="mt-2 text-sm text-blue-800/80">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-blue-900" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-xl border border-blue-200 bg-white/90 px-3 py-2.5 text-sm text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

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
              placeholder="Minimum 6 characters"
              className="w-full rounded-xl border border-blue-200 bg-white/90 px-3 py-2.5 text-sm text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-blue-900"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className="w-full rounded-xl border border-blue-200 bg-white/90 px-3 py-2.5 text-sm text-blue-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          {error ? (
            <p className="rounded-lg bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-700 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 active:scale-[0.99]"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-blue-900/85">
          Already have an account?{" "}
          <Link className="font-semibold text-blue-700 hover:text-blue-900" to="/">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
