import { useTheme } from "../context/ThemeProvider";
import footerLightImage from "../public/footer-light-warm.png";
import footerDarkImage from "../public/footer-dark.jpg";

export function Footer() {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full h-[220px] sm:h-[260px] overflow-hidden">
      {/* Light mode background image */}
      <img
        src={footerLightImage}
        alt=""
        aria-hidden="true"
        className={`
          absolute inset-0 w-full h-full object-cover object-center
          transition-opacity duration-500 ease-in-out
          ${theme === "dark" ? "opacity-0" : "opacity-100"}
        `}
      />
      {/* Dark mode background image */}
      <img
        src={footerDarkImage}
        alt=""
        aria-hidden="true"
        className={`
          absolute inset-0 w-full h-full object-cover object-center
          transition-opacity duration-500 ease-in-out
          ${theme === "dark" ? "opacity-100" : "opacity-0"}
        `}
      />

      {/* Top gradient for seamless blending with page content */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 dark:from-zinc-950 via-transparent to-black/70 pointer-events-none z-[1]" />
    

      {/* Footer text content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 sm:pb-8 px-6 text-center">
        <p className="text-[0.8rem] sm:text-[0.85rem] text-zinc-300 leading-relaxed">
          Built by{" "}
          <a
            href="https://github.com/Abhishek-IITP"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 transition-colors duration-200 font-medium"
          >
            Abhishek
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/Abhishek-IITP/new-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-600 hover:decoration-zinc-300 transition-colors duration-200 font-medium"
          >
            GitHub
          </a>
          .
        </p>
        <p className="mt-2 text-[0.7rem] sm:text-[0.75rem] text-zinc-400/80 tracking-wide">
          &copy; {year} Abhishek Mohanty &middot; All rights reserved.
        </p>
      </div>
    </footer>
  );
}
