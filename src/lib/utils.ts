import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import clickSoundUrl from "../public/click.mp3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function playClickSound() {
  const audio = new Audio(clickSoundUrl);
  audio.volume = 0.85;
  audio.play().catch((err) => {
    // Ignore autoplay restriction warnings.
  });
}
