import React, { useState } from "react";
import Header from "../display/header";
import Footer from "../display/footer";

const LeetCodepage = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true); // 🔥 start loading
    setData(null);

    try {
      const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const result = await res.json();

      if (!res.ok || result.status === "error") {
        alert("User not found");
        setLoading(false);
        return;
      }

      setData(result);
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }

    setLoading(false); // 🔥 stop loading
  };

  // percentages
  const easyPercent = data ? (data.easySolved / data.totalEasy) * 100 : 0;
  const mediumPercent = data ? (data.mediumSolved / data.totalMedium) * 100 : 0;
  const hardPercent = data ? (data.hardSolved / data.totalHard) * 100 : 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      <Header />

      <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white relative overflow-hidden">

        {/* Glow */}
        <div className="absolute w-[400px] h-[400px] bg-yellow-500/10 blur-3xl rounded-full top-20 left-20"></div>

        {!data && !loading && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl text-center w-[380px]">
            <h2 className="text-2xl font-semibold mb-6">
              🚀 Track Your LeetCode Stats
            </h2>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-gray-600 outline-none"
              />

              <button
                onClick={fetchData}
                className="bg-yellow-500 px-4 py-2 rounded-lg text-black font-semibold hover:bg-yellow-400 transition"
              >
                Fetch
              </button>
            </div>
          </div>
        )}

        {/* 🔥 LOADING UI */}
        {loading && (
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-400">Fetching data...</p>
          </div>
        )}

        {/* 🔥 RESULT */}
        {data && !loading && (
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-2xl text-center w-[400px]">

            {/* Username */}
            <h2 className="text-xl font-bold mb-2">{data.username}</h2>
            <p className="text-gray-400 mb-6">
              Total Solved: {data.totalSolved}
            </p>

            {/* Progress Bars */}
            <div className="space-y-5">

              {/* Easy */}
              <div>
                <p className="text-green-400 mb-1">
                  Easy ({data.easySolved}/{data.totalEasy})
                </p>
                <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400 transition-all duration-700"
                    style={{ width: `${easyPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Medium */}
              <div>
                <p className="text-yellow-400 mb-1">
                  Medium ({data.mediumSolved}/{data.totalMedium})
                </p>
                <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-700"
                    style={{ width: `${mediumPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Hard */}
              <div>
                <p className="text-red-400 mb-1">
                  Hard ({data.hardSolved}/{data.totalHard})
                </p>
                <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 transition-all duration-700"
                    style={{ width: `${hardPercent}%` }}
                  ></div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default LeetCodepage;