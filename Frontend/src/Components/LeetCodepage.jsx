import React, { useState } from "react";
import Header from "../display/header";
import Footer from "../display/footer";

const LeetCodepage = () => {
  
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
      const stats = data?.submitStats?.acSubmissionNum || [];

const easy = stats.find(item => item.difficulty === "Easy")?.count || 0;
const medium = stats.find(item => item.difficulty === "Medium")?.count || 0;
const hard = stats.find(item => item.difficulty === "Hard")?.count || 0;
 const fetchData = async () => {
  try {
    const res = await fetch(`http://localhost:6969/api/leetcode/${username}`);
    const result = await res.json();

    if (!res.ok) {
      alert(result.message); // 🔥 show error
      return;
    }

    setData(result);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* HEADER */}
      <Header data={data} />

      {/* BODY */}
     <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white relative overflow-hidden">

  {/* Glow effect */}
  <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-3xl rounded-full top-20 left-20"></div>

  {!data ? (
    <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl text-center w-[380px]">
      
      <h2 className="text-2xl font-semibold mb-6 tracking-wide">
        🚀 Track Your LeetCode Stats
      </h2>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-gray-600 focus:border-yellow-400 outline-none"
        />

        <button
          onClick={fetchData}
          className="bg-yellow-500 px-4 py-2 rounded-lg text-black font-semibold hover:bg-yellow-400 transition"
        >
          Fetch
        </button>
      </div>
    </div>
  ) : (
    <div className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl text-center w-[350px]">

      {/* Avatar */}
      <img
        src={data?.avatar}
        alt="avatar"
        className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-yellow-400 shadow-lg"
      />

      {/* Username */}
      <h2 className="text-xl font-bold">{data?.username}</h2>
      <p className="text-gray-400 text-sm mb-6">
        Ranking: {data?.ranking}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        
        <div className="bg-green-500/10 border border-green-400/20 p-3 rounded-lg hover:scale-105 transition">
          <p className="text-green-400 font-semibold">Easy</p>
          <p className="text-lg">{easy}</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-400/20 p-3 rounded-lg hover:scale-105 transition">
          <p className="text-yellow-400 font-semibold">Medium</p>
          <p className="text-lg">{medium}</p>
        </div>

        <div className="bg-red-500/10 border border-red-400/20 p-3 rounded-lg hover:scale-105 transition">
          <p className="text-red-400 font-semibold">Hard</p>
          <p className="text-lg">{hard}</p>
        </div>

      </div>
    </div>
  )}
</div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default LeetCodepage;