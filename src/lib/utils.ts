import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function playClickSound() {
  const audio = new Audio("/click.mp3");
  audio.volume = 0.85;
  audio.play().catch((err) => {
    // Ignore autoplay restriction warnings.
  });
}
