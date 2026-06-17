import { useEffect, useState } from "react";
import Grainient from "./Grainient";

export function TopVideo() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString(undefined, {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-h-[300px] relative overflow-hidden">
      <Grainient />
      {time && (
        <div className="absolute bottom-3 right-5 font-mono text-[1.35rem] font-medium text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none select-none tabular-nums dotted-clock">
          {time}
        </div>
      )}
    </div>
  );
}

