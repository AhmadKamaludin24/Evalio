// /components/DashboardHeader.tsx

interface DashboardHeaderProps {
  name: string;
}

export default function DashboardHeader({ name }: DashboardHeaderProps) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div>
        <h2 className="text-xl text-neutral-400 font-medium">Halo, {name}!</h2>
        <h1 className="text-3xl md:text-4xl font-bold mt-1">Siap untuk Sesi Latihan Hari Ini?</h1>
      </div>
      <button className="py-3 px-8 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-700 hover:from-purple-700 hover:to-fuchsia-800 transition-all duration-300 ease-in-out shadow-xl">
        Mulai Latihan Baru
      </button>
    </div>
  );
}