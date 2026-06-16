import { useEffect, useRef, useState } from "react";
import meImage from "../public/me.jpg";
import "./Top-Info.css";

const roles = [
     "Software Engineer",
     "Full Stack Dev",
     "Trader",
     "Open Source Contributor",
];

export function TopInfo() {
     const [roleIndex, setRoleIndex] = useState(0);
     const [isAnimating, setIsAnimating] = useState(false);
     const timeoutRef = useRef<number | null>(null);

     useEffect(() => {
          const intervalId = window.setInterval(() => {
               setIsAnimating(true);

               if (timeoutRef.current !== null) {
                    window.clearTimeout(timeoutRef.current);
               }

               timeoutRef.current = window.setTimeout(() => {
                    setRoleIndex(currentIndex => (currentIndex + 1) % roles.length);
                    setIsAnimating(false);
                    timeoutRef.current = null;
               }, 800);
          }, 2800);

          return () => {
               window.clearInterval(intervalId);

               if (timeoutRef.current !== null) {
                    window.clearTimeout(timeoutRef.current);
               }
          };
     }, []);

     return (
          <div className="-mt-8 flex items-center gap-4 relative z-20">
               <div className="mt-[-2rem] top-info-avatar">
                    <img className="top-info-avatarImage" src={meImage} alt="Abhishek Image" />
               </div>
               <div>
                    <div className="top-info-name">Abhishek Mohanty</div>
                    <hr className="h-1" />
                    <div className="top-info-roleSwap">
                         <div
                              className={`top-info-roleText top-info-roleCurrent ${isAnimating ? "top-info-roleCurrent--animate" : ""}`}
                         >
                              {roles[roleIndex]}
                         </div>
                         <div
                              className={`top-info-roleText top-info-roleNext ${isAnimating ? "top-info-roleNext--animate" : ""}`}
                         >
                              {roles[(roleIndex + 1) % roles.length]}
                         </div>
                    </div>
               </div>
          </div>
     );
}
