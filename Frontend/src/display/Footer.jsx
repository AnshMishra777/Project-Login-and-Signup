import React from "react";
import { FaLinkedin, FaInstagram, FaGithub, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#0b1220] text-gray-300 px-6 py-5 border-t border-gray-800">
      
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        
        {/* LEFT */}
        <div className="text-center md:text-left">
          <h2 className="text-white font-semibold">
            Ansh Ranjan Mishra
          </h2>
          <p className="text-gray-400 text-xs">
            Full Stack Developer
          </p>
        </div>

        {/* CENTER (SOCIALS) */}
        <div className="flex gap-6 text-lg">
          <a
            href="https://www.linkedin.com/in/ansh-ranjan-mishra-501338373"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://instagram.com/adonis_ansh011"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://github.com/AnshMishra777"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
        </div>

        {/* RIGHT (CONTACT) */}
        <div className="flex flex-col md:items-end text-xs gap-1">
          <span className="flex items-center gap-2">
            <FaPhone className="text-green-400" />
            +91 9142688188
          </span>

          <span className="flex items-center gap-2">
            <FaEnvelope className="text-yellow-400" />
            anshranjanmishra66@gmail.com
          </span>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <p className="text-center text-gray-500 text-xs mt-3">
        © {new Date().getFullYear()} Built with ❤️ using React + Tailwind
      </p>
    </div>
  );
};

export default Footer;