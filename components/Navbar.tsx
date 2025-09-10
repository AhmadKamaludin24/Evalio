"use client"
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const Navbar = ({ name }: { name?: string | undefined }) => {
  const router = useRouter();
  async function handleLogout() {
    const res = await fetch("/api/sign-out", {
      method: "POST",
    });

    if (res.ok) {
      router.push("/");
      toast.success("sign out success")
    }
  }
  return (
    <div className="w-full z-50 py-7 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/"><img src="/chatbot.png" alt="logo" className="lg:w-12 w-7" /></Link>
        <h1 className="lg:text-4xl text-lg text-white font-bold">Evalio</h1>
      </div>

      <div>
        {name ? (
          <div className="flex gap-3 text-white items-center"><p className="lg:text-2xl text-white font-semibold">Hi {name}👋</p>
          <button onClick={handleLogout}><LogOut/></button>
          </div>
        ) : (
          <a href="/sign-in" className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-black lg:px-4 px-3 py-2 max-sm:text-sm  transition hover:scale-105 hover:shadow-2xs shadow-cyan-400">
            Sign In
          </a>
        )}
      </div>
    </div>
  );
};

export default Navbar;
