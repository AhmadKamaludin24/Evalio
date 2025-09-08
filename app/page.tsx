import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-svh overflow-hidden">
      <div className="container mx-auto max-sm:px-2 ">
        <Navbar/>
        <div className="w-full border-2 flex-col border-white py-16 p-12 flex justify-center rounded-2xl bg-gradient-to-l from-cyan-400 to-blue-500">
          <h1 className="text-7xl line-clamp-2 max-w-[800px] font-bold text-white ">Your AI-Powered Interview Partner</h1>
          <h2 className="text-4xl mt-4">Simulate, analyze, and improve — all in one smart platform.</h2>
        </div>
      </div>
    </main>
  );
}
