// /components/RecentPractice.tsx

import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline'; // Pastikan Anda menginstal Heroicons

interface RecentPracticeProps {
  id: number;
  title: string;
  date: string;
  score: string;
}

export default function RecentPractice({ id, title, date, score }: RecentPracticeProps) {
  return (
    <Link href={`/dashboard/practice/${id}`} className="block">
      <div className="p-5 rounded-xl bg-neutral-800 flex justify-between items-center transition-transform duration-300 ease-in-out hover:scale-[1.01] hover:bg-neutral-700">
        <div>
          <h4 className="font-semibold text-lg">{title}</h4>
          <p className="text-sm text-neutral-400">{date} • Skor: <span className="text-purple-400 font-bold">{score}</span></p>
        </div>
        <ChevronRightIcon className="h-6 w-6 text-neutral-500" />
      </div>
    </Link>
  );
}