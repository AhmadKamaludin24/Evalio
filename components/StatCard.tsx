// /components/StatCard.tsx

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export default function StatCard({ title, value, description }: StatCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-neutral-800 border border-transparent hover:border-purple-600 transition-colors duration-300 ease-in-out cursor-pointer">
      <h3 className="text-sm text-neutral-400">{title}</h3>
      <p className="text-4xl font-bold mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-500">{value}</p>
      <p className="text-sm text-neutral-500 mt-2">{description}</p>
    </div>
  );
}