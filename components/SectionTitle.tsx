// /components/SectionTitle.tsx

import { twMerge } from 'tailwind-merge';

interface SectionTitleProps {
  title: string;
  className?: string;
}

export default function SectionTitle({ title, className }: SectionTitleProps) {
  return (
    <h2 className={twMerge("text-2xl md:text-3xl font-bold text-white", className)}>
      {title}
    </h2>
  );
}