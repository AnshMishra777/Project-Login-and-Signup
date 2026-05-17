import React, { useState } from "react";
import Header from "../display/header";
import Footer from "../display/footer";
import { FaTrophy, FaMedal, FaCode, FaFire, FaStar, FaSearch } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

// ── Reusable Bar ─────────────────────────────────────────
const Bar = ({ label, color, solved, total }) => {
  const pct = total ? Math.round((solved / total) * 100) : 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span style={{ color }}>{label}</span>
        <span className="text-gray-400">
          {solved}/{total}{" "}
          <span className="text-gray-500 text-xs">({pct}%)</span>
        </span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
};

// ── Stat Card ────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, accent }) => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-1">
    <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wider">
      <span style={{ color: accent }}>{icon}</span>
      {label}
    </div>
    <p className="text-2xl font-bold text-white">{value ?? "—"}</p>
    {sub && <p className="text-xs text-gray-500">{sub}</p>}
  </div>
);

// ── Main Component ────────────────────────────────────────
const LeetCodePage = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setData(null);
    setError("");

    try {
      const res = await fetch(`http://localhost:6969/api/leetcode/${username.trim()}`);
      const result = await res.json();

      if (!res.ok || result.message) {
        setError(result.message || "User not found");
        setLoading(false);
        return;
      }

      setData(result);
    } catch {
      setError("Cannot reach the server. Make sure your backend is running.");
    }
    setLoading(false);
  };

  const handleKey = (e) => e.key === "Enter" && fetchData();

  // ── Derived values ────────────────────────────────────
  const totalQ = data ? (data.totalEasy + data.totalMedium + data.totalHard) : 1;
  const overallPct = data ? Math.round((data.totalSolved / totalQ) * 100) : 0;
  const rankStr = data?.ranking ? `#${Number(data.ranking).toLocaleString()}` : "—";

  return (
    <div className="min-h-screen flex flex-col bg-[#020617]">
      <Header />

      <div className="flex-grow bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute w-[500px] h-[500px] bg-yellow-500/5 blur-3xl rounded-full top-0 left-0 pointer-events-none" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/5 blur-3xl rounded-full bottom-0 right-0 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">

          {/* ── Search ───────────────────────────────── */}
          <div className="flex gap-3 mb-10">
            <div className="flex-1 flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
              <SiLeetcode className="text-yellow-400 text-xl shrink-0" />
              <input
                type="text"
                placeholder="Enter LeetCode username…"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
              />
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 transition text-black font-semibold px-6 rounded-xl"
            >
              <FaSearch />
              Search
            </button>
          </div>

          {/* ── Loading ───────────────────────────────── */}
          {loading && (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="w-14 h-14 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400">Fetching LeetCode data…</p>
            </div>
          )}

          {/* ── Error ─────────────────────────────────── */}
          {error && !loading && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-6 py-4 text-center">
              {error}
            </div>
          )}

          {/* ── Dashboard ─────────────────────────────── */}
          {data && !loading && (
            <div className="space-y-6">

              {/* Profile card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img
                  src={data.avatar || `https://avatar.iran.liara.run/username?username=${data.username}`}
                  alt="avatar"
                  className="w-24 h-24 rounded-full border-4 border-yellow-500/40 object-cover shrink-0"
                />
                <div className="text-center sm:text-left flex-1">
                  <h2 className="text-2xl font-bold">{data.name}</h2>
                  <p className="text-yellow-400 text-sm mb-2">@{data.username}</p>
                  {data.aboutMe && (
                    <p className="text-gray-400 text-sm max-w-xl line-clamp-2 mb-3">
                      {data.aboutMe}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {data.school  && <span className="text-xs bg-white/10 rounded-full px-3 py-1">🎓 {data.school}</span>}
                    {data.country && <span className="text-xs bg-white/10 rounded-full px-3 py-1">📍 {data.country}</span>}
                    {data.company && <span className="text-xs bg-white/10 rounded-full px-3 py-1">🏢 {data.company}</span>}
                  </div>
                </div>

                {/* Circular overall % */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="relative w-20 h-20">
                    <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                      <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1f2937" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="15.9" fill="none"
                        stroke="#eab308" strokeWidth="3"
                        strokeDasharray={`${overallPct} ${100 - overallPct}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {overallPct}%
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">solved</p>
                </div>
              </div>

              {/* Stat cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StatCard icon={<FaTrophy />} label="Global Rank"   value={rankStr}              sub="All-time"           accent="#eab308" />
                <StatCard icon={<FaCode />}   label="Total Solved"  value={data.totalSolved}     sub={`of ${totalQ} problems`} accent="#60a5fa" />
                <StatCard icon={<FaFire />}   label="Reputation"    value={data.reputation ?? "—"} accent="#f97316" />
                <StatCard icon={<FaStar />}   label="Star Rating"   value={data.starRating ? `${data.starRating}★` : "—"} accent="#a78bfa" />
              </div>

              {/* Progress bars */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">
                  Problem Breakdown
                </h3>
                <Bar label="Easy"   color="#4ade80" solved={data.easySolved} total={data.totalEasy}   />
                <Bar label="Medium" color="#facc15" solved={data.medSolved}  total={data.totalMedium} />
                <Bar label="Hard"   color="#f87171" solved={data.hardSolved} total={data.totalHard}   />
              </div>

              {/* Badges */}
              {data.badges?.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                    <FaMedal className="text-yellow-400" /> Badges ({data.badges.length})
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {data.badges.map((badge, i) => (
                      <div key={i} className="flex flex-col items-center gap-1 group" title={badge.displayName}>
                        <img
                          src={badge.icon?.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`}
                          alt={badge.displayName}
                          className="w-12 h-12 object-contain group-hover:scale-110 transition"
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                        <p className="text-[10px] text-gray-400 text-center max-w-[60px] leading-tight">
                          {badge.displayName}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset */}
              <div className="text-center pt-2">
                <button
                  onClick={() => { setData(null); setUsername(""); }}
                  className="text-sm text-gray-500 hover:text-gray-300 underline underline-offset-2 transition"
                >
                  Search another user
                </button>
              </div>

            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LeetCodePage;