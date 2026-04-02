import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../display/header";
import Footer from "../display/footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
    const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (form.password !== form.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("http://localhost:6969/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    navigate("/"); // back to login

  } catch (err) {
    setError("Server error");
  }
};
 
return (
  <div className="min-h-screen flex flex-col bg-[#020617]">

    <Header />

    {/* CENTER SECTION */}
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black relative overflow-hidden">

      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full top-20 left-20"></div>
      <div className="absolute w-[300px] h-[300px] bg-purple-500/10 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* FORM */}
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl w-[380px]">
        {/* your form here */}

         <h1 className="text-2xl font-semibold text-center mb-6 tracking-wide text-white">
    Create Account 🚀
  </h1>

  <form onSubmit={handleSubmit} className="space-y-4">

    <input
      name="name"
      type="text"
      value={form.name}
      onChange={handleChange}
      placeholder="Full Name"
      className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
    />

    <input
      name="email"
      type="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
    />

    <div className="relative">
  <input
    name="password"
    type={showPassword ? "text" : "password"}
    value={form.password}
    onChange={handleChange}
    placeholder="Password"
    className="w-full px-4 py-2 pr-10 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer"
  >
   {showPassword ?   <FaEye /> : <FaEyeSlash />}
  </span>
</div>

   <div className="relative">
  <input
    name="confirmPassword"
    type={showConfirm ? "text" : "password"}
    value={form.confirmPassword}
    onChange={handleChange}
    placeholder="Confirm Password"
    className="w-full px-4 py-2 pr-10 rounded-lg bg-black/40 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 outline-none"
  />

  <span
    onClick={() => setShowConfirm(!showConfirm)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer transition"
  >
    {showPassword ?   <FaEye /> : <FaEyeSlash />}
  </span>
</div>
    

    {error && (
      <p className="text-red-400 text-sm">{error}</p>
    )}

    <button
      type="submit"
      className="w-full bg-blue-500 py-2 rounded-lg font-semibold text-white hover:bg-blue-400 transition active:scale-[0.98]"
    >
      Create Account
    </button>
  </form>

  <p className="text-center text-sm text-gray-400 mt-4">
    Already have an account?{" "}
    <Link to="/" className="text-blue-400 hover:underline">
      Login
    </Link>
  </p>
      </div>

    </div>

    {/* ✅ Footer OUTSIDE */}
    <Footer />

  </div>
);
 
};

export default Signin;
