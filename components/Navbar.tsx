import React from "react";

const Navbar = () => {
  return (
    <div className="w-full py-7 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/chatbot.png" alt="logo" className="w-12" />
        <h1 className="text-4xl font-bold">Evalio</h1>
      </div>

      <div>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-black px-4 py-2  transition hover:scale-105 hover:shadow-2xs shadow-cyan-400">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
