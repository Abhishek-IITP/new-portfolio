import { Within } from "@theme-toggles/react";
import { useTheme } from "../context/ThemeProvider";
import "@theme-toggles/react/styles/within.css";

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <Within
      onClick={toggleTheme}
      duration={750}
      className="
        theme-toggle
        flex
        items-center
        justify-center
        h-14
        w-14
        rounded-full
        border
        border-zinc-200
        dark:border-zinc-800
        bg-white
        dark:bg-zinc-900
        text-zinc-900
        dark:text-zinc-50
        shadow-[0_4px_12px_rgba(0,0,0,0.05)]
        hover:bg-zinc-50
        dark:hover:bg-zinc-800/80
        transition-all
        duration-200
        active:scale-95
        cursor-pointer
      "
    />
  );
};

export default ThemeToggle;