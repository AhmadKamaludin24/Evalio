import { randomCovers } from "@/constans";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * randomCovers.length);
  return `/interview${randomCovers[randomIndex]}`;
};