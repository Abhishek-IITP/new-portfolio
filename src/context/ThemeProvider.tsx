import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem("theme") as Theme) ||
      "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );
  }, [theme]);

  const toggleTheme = () => {
    const newTheme =
      theme === "dark" ? "light" : "dark";

    const updateDOM = () => {
      setTheme(newTheme);
      document.documentElement.classList.toggle(
        "dark",
        newTheme === "dark"
      );
      localStorage.setItem(
        "theme",
        newTheme
      );
    };

    if (!document.startViewTransition) {
      updateDOM();
      return;
    }

    document.documentElement.classList.add("toggling-theme");
    const transition = document.startViewTransition(() => {
      flushSync(() => {
        updateDOM();
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove("toggling-theme");
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context =
    useContext(ThemeContext);

  if (!context)
    throw new Error(
      "ThemeProvider missing"
    );

  return context;
};