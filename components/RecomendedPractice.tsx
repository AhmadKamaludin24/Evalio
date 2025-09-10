// /components/RecommendedPractice.tsx

import Link from 'next/link';

interface RecommendedPracticeProps {
  id: number;
  title: string;
  description: string;
}

export default function RecommendedPractice({ id, title, description }: RecommendedPracticeProps) {
  return (
    <div className="p-6 rounded-xl bg-neutral-800 border-t-4 border-purple-600 flex flex-col items-start h-full">
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-sm text-neutral-400 mt-2 flex-grow">{description}</p>
      <Link href={`/dashboard/practice/start/${id}`}>
        <button className="mt-4 px-4 py-2 text-sm font-medium border border-purple-600 rounded-full text-purple-400 hover:bg-purple-600 hover:text-white transition-colors">
          Mulai Latihan
        </button>
      </Link>
    </div>
  );
}