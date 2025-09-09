import React from "react";

const Navbar = () => {
  return (
    <div className="w-full z-50 py-7 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img src="/chatbot.png" alt="logo" className="lg:w-12 w-7" />
        <h1 className="lg:text-4xl text-lg text-white font-bold">Evalio</h1>
      </div>

      <div>
        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-black lg:px-4 px-3 py-2 max-sm:text-sm  transition hover:scale-105 hover:shadow-2xs shadow-cyan-400">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
