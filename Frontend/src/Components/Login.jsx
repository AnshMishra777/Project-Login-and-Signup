import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../display/header";
import Footer from "../display/footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
const [showConfirm, setShowConfirm] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-[#020617]">

   <Header/>
    <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black relative overflow-hidden">

      
  {/* Glow Effects */}
  <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-3xl rounded-full top-20 left-20"></div>
  <div className="absolute w-[300px] h-[300px] bg-purple-500/10 blur-3xl rounded-full bottom-10 right-10"></div>
   
      <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl w-[380px]">

  <h1 className="text-2xl font-semibold text-center mb-6 tracking-wide text-white">
    Welcome Back 👋
  </h1>

  <form onSubmit={handleSubmit} className="space-y-4">

    <input
      name="email"
      type="email"
      value={form.email}
      onChange={handleChange}
      placeholder="Email"
      className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gray-600 text-white focus:border-blue-400 outline-none"
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
    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white cursor-pointer transition"
  >
    {showPassword ?   <FaEye /> : <FaEyeSlash />}
  </span>
</div>

    {error && (
      <p className="text-red-400 text-sm">{error}</p>
    )}

    <button className="w-full bg-blue-500 py-2 rounded-lg font-semibold hover:bg-blue-400 transition">
      Login
    </button>
  </form>

  <p className="text-center text-sm text-gray-400 mt-4">
    Don't have an account?{" "}
    <Link to="/signin" className="text-blue-400 hover:underline">
      Sign up
    </Link>
  </p>
</div>

    </div>
    <Footer/>
     </div>
   
  );
};

export default Login;
