import React from "react";
import { SiLeetcode } from "react-icons/si";
import { FaFire } from "react-icons/fa";

const Header = ({ data }) => {
  const stats = data?.submitStats?.acSubmissionNum || [];

  const easy = stats.find(item => item.difficulty === "Easy")?.count || 0;
  const medium = stats.find(item => item.difficulty === "Medium")?.count || 0;
  const hard = stats.find(item => item.difficulty === "Hard")?.count || 0;

  return (
    <div className="bg-[#0b1220] text-white px-6 py-4 flex justify-between items-center shadow-lg border-b border-gray-800">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <SiLeetcode className="text-yellow-400 text-2xl" />
        <h1 className="text-lg font-semibold tracking-wide">
          LeetCode Tracker
        </h1>
      </div>

      {/* RIGHT */}
      {data && (
        <div className="flex gap-6 text-sm items-center">
          <span className="text-green-400 flex items-center gap-1">
            <FaFire /> {easy}
          </span>
          <span className="text-yellow-400 flex items-center gap-1">
            <FaFire /> {medium}
          </span>
          <span className="text-red-400 flex items-center gap-1">
            <FaFire /> {hard}
          </span>
        </div>
      )}
    </div>
  );
};

export default Header;