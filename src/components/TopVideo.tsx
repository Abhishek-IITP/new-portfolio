import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "../context/ThemeProvider";
import headerDarkImage from "../public/header-dark.png";
import headerLightImage from "../public/header-light.png";

// ── Leaf particle system ──────────────────────────────────────────────
interface Leaf {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  wobblePhase: number;
  wobbleSpeed: number;
  type: number; // 0-2 for different leaf shapes
}

function createLeaf(
  canvasW: number,
  canvasH: number,
  isDark: boolean,
  initOnScreen: boolean = false
): Leaf {
  const direction = isDark ? 1 : -1; // dark→right (left-to-right), light→left (right-to-left)
  
  let x = 0;
  let y = 0;
  let speedX = 0;
  let speedY = 0;

  if (isDark) {
    // ── Dark Mode: Horizontal bottom leaves (left → right) ──
    y = initOnScreen
      ? canvasH * 0.45 + Math.random() * (canvasH * 0.45)
      : canvasH * 0.55 + Math.random() * (canvasH * 0.35); // spawn in the middle-to-lower section

    x = initOnScreen
      ? Math.random() * canvasW
      : -20 - Math.random() * 30; // spawn off-screen left

    speedX = 1.3 + Math.random() * 0.9; // move right
    speedY = -0.12 - Math.random() * 0.18; // drift gently upward
  } else {
    // ── Light Mode: Horizontal bottom leaves (right → left) ──
    y = initOnScreen
      ? canvasH * 0.45 + Math.random() * (canvasH * 0.45)
      : canvasH * 0.55 + Math.random() * (canvasH * 0.35); // spawn in the middle-to-lower section

    x = initOnScreen
      ? Math.random() * canvasW
      : canvasW + 20 + Math.random() * 30; // spawn off-screen right

    speedX = -1.3 - Math.random() * 0.9; // move left
    speedY = -0.12 - Math.random() * 0.18; // drift gently upward
  }

  return {
    x,
    y,
    size: isDark ? 3 + Math.random() * 4 : 4 + Math.random() * 8, // slightly smaller leaves in dark mode
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.03,
    speedX,
    speedY,
    opacity: isDark ? 0.35 + Math.random() * 0.4 : 0.3 + Math.random() * 0.5, // whiter/brighter opacity in dark mode
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.02,
    type: Math.floor(Math.random() * 3),
  };
}

function drawLeaf(
  ctx: CanvasRenderingContext2D,
  leaf: Leaf,
  isDark: boolean
) {
  ctx.save();
  ctx.translate(leaf.x, leaf.y);
  ctx.rotate(leaf.rotation);
  ctx.globalAlpha = leaf.opacity;

  if (isDark) {
    // White/silver leaves for dark mode (solid fill, transparency handled by globalAlpha)
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.strokeStyle = "rgba(220, 240, 255, 0.6)";
  } else {
    // Warm amber/golden leaves for light mode (solid fill, transparency handled by globalAlpha)
    const colors = [
      "rgba(180, 100, 30, 0.95)",
      "rgba(200, 120, 40, 0.95)",
      "rgba(160, 80, 20, 0.95)",
    ];
    ctx.fillStyle = colors[leaf.type];
    ctx.strokeStyle = "rgba(140, 70, 10, 0.5)";
  }

  ctx.lineWidth = 0.5;

  // Draw different leaf shapes
  ctx.beginPath();
  const s = leaf.size;
  if (leaf.type === 0) {
    // Simple oval leaf
    ctx.ellipse(0, 0, s * 0.4, s, 0, 0, Math.PI * 2);
  } else if (leaf.type === 1) {
    // Pointed maple-style leaf
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(s * 0.6, -s * 0.3, s * 0.3, 0);
    ctx.quadraticCurveTo(s * 0.6, s * 0.4, 0, s);
    ctx.quadraticCurveTo(-s * 0.6, s * 0.4, -s * 0.3, 0);
    ctx.quadraticCurveTo(-s * 0.6, -s * 0.3, 0, -s);
  } else {
    // Small round petal
    ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
  }
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  // Leaf vein
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.7);
  ctx.lineTo(0, s * 0.7);
  ctx.globalAlpha = leaf.opacity * 0.3;
  ctx.stroke();

  ctx.restore();
}

// ── Twinkling Star particle system ────────────────────────────────────────
interface TwinklingStar {
  x: number;
  y: number;
  size: number;
  minOpacity: number;
  maxOpacity: number;
  shining: boolean;
  shineProgress: number;
  shineSpeed: number;
}

function createTwinklingStar(canvasW: number, canvasH: number): TwinklingStar {
  return {
    x: Math.random() * canvasW,
    y: Math.random() * canvasH * 0.65, // Keep them in the upper sky area
    size: 1.0 + Math.random() * 0.8, // size 1.0px to 1.8px
    minOpacity: 0, // completely invisible when not shining to avoid sky clutter
    maxOpacity: 0.8 + Math.random() * 0.2, // peak twinkling brightness
    shining: false,
    shineProgress: 0,
    shineSpeed: 0.01 + Math.random() * 0.012, // slow, elegant duration (~0.8s - 1.6s)
  };
}

function drawAndUpdateTwinklingStar(
  ctx: CanvasRenderingContext2D,
  star: TwinklingStar
) {
  if (!star.shining) {
    // Low trigger probability per frame so only ~3-4 stars twinkle brightest per second across the sky
    if (Math.random() < 0.0013) {
      star.shining = true;
      star.shineProgress = 0;
    }
    return; // Don't draw if not shining
  }

  star.shineProgress += star.shineSpeed;
  if (star.shineProgress >= 1) {
    star.shining = false;
    star.shineProgress = 0;
    return;
  }

  const factor = Math.sin(star.shineProgress * Math.PI); // 0 -> 1 -> 0
  const currentOpacity = factor * star.maxOpacity;
  const currentSize = star.size * (0.85 + 0.45 * factor); // grow slightly during peak shine

  ctx.save();
  ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
  
  // Soft glow when shining
  ctx.shadowColor = "rgba(255, 255, 255, 0.95)";
  ctx.shadowBlur = 3.5 * factor;

  ctx.beginPath();
  ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ── Shooting Star particle system ─────────────────────────────────────────
interface ShootingStar {
  x: number;
  y: number;
  dx: number;
  dy: number;
  length: number;
  opacity: number;
  fadeSpeed: number;
}

function createShootingStar(canvasW: number, canvasH: number): ShootingStar {
  // Start from top-left/top-middle area
  const x = Math.random() * canvasW * 0.7;
  const y = Math.random() * canvasH * 0.2;
  const angle = Math.PI / 6 + Math.random() * (Math.PI / 12); // ~30 to 45 degrees
  const speed = 3.5 + Math.random() * 2.5; // Slower, more elegant motion
  return {
    x,
    y,
    dx: Math.cos(angle) * speed,
    dy: Math.sin(angle) * speed,
    length: 50 + Math.random() * 50,
    opacity: 1.0,
    fadeSpeed: 0.008 + Math.random() * 0.008, // slower fade
  };
}

function drawShootingStar(
  ctx: CanvasRenderingContext2D,
  star: ShootingStar
) {
  ctx.save();
  const angle = Math.atan2(star.dy, star.dx);
  const tailX = star.x - Math.cos(angle) * star.length;
  const tailY = star.y - Math.sin(angle) * star.length;

  const grad = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
  grad.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
  grad.addColorStop(0.15, `rgba(186, 224, 255, ${star.opacity * 0.7})`);
  grad.addColorStop(1, `rgba(186, 224, 255, 0)`);

  ctx.strokeStyle = grad;
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";

  ctx.beginPath();
  ctx.moveTo(star.x, star.y);
  ctx.lineTo(tailX, tailY);
  ctx.stroke();

  // Glow head
  ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
  ctx.beginPath();
  ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

// ── Bird particle system ──────────────────────────────────────────────────
interface Bird {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  wingPhase: number;
  wingSpeed: number;
  opacity: number;
}

function createBird(canvasW: number, canvasH: number): Bird {
  const size = 1.8 + Math.random() * 2.2;
  const flyLeft = Math.random() < 0.5;
  return {
    x: flyLeft ? canvasW + 20 : -20,
    y: canvasH * 0.05 + Math.random() * (canvasH * 0.45),
    speedX: flyLeft ? -0.4 - Math.random() * 0.3 : 0.4 + Math.random() * 0.3, // slow, graceful flight speed
    speedY: -0.02 + Math.random() * 0.04, // slight horizontal gliding
    size,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 0.05 + Math.random() * 0.04, // slow, gentle wing flap to match the slower speed
    opacity: 0.5 + Math.random() * 0.35,
  };
}

function drawAndUpdateBird(ctx: CanvasRenderingContext2D, bird: Bird) {
  bird.x += bird.speedX;
  bird.y += bird.speedY;
  bird.wingPhase += bird.wingSpeed;

  ctx.save();
  ctx.globalAlpha = bird.opacity;
  ctx.strokeStyle = "rgba(15, 15, 17, 0.95)"; // dark charcoal black silhouette
  ctx.lineWidth = bird.size * 0.28;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const wSize = bird.size * 1.8;
  const flap = Math.sin(bird.wingPhase) * bird.size * 0.7;

  ctx.beginPath();
  // Drawing curved flapping wings (from left wingtip -> center -> right wingtip)
  ctx.moveTo(bird.x - wSize, bird.y - flap);
  ctx.quadraticCurveTo(
    bird.x - wSize * 0.5,
    bird.y - bird.size * 0.35 - flap * 0.5,
    bird.x,
    bird.y
  );
  ctx.quadraticCurveTo(
    bird.x + wSize * 0.5,
    bird.y - bird.size * 0.35 - flap * 0.5,
    bird.x + wSize,
    bird.y - flap
  );
  ctx.stroke();

  ctx.restore();
}

// ── Component ─────────────────────────────────────────────────────────
export function TopVideo() {
  const [time, setTime] = useState("");
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<Leaf[]>([]);
  const starsRef = useRef<ShootingStar[]>([]);
  const twinklingStarsRef = useRef<TwinklingStar[]>([]);
  const birdsRef = useRef<Bird[]>([]);
  const rafRef = useRef<number>(0);
  const isDark = theme === "dark";

  // Clock
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

  // Canvas animation (Shooting Stars in Dark Mode, Golden Leaves in Light Mode)
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Set canvas actual pixel size
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      // Regenerate twinkling stars to match new size in dark mode
      if (isDark) {
        const numStars = Math.floor(w / 35) + 12;
        const initialStars: TwinklingStar[] = [];
        for (let i = 0; i < numStars; i++) {
          initialStars.push(createTwinklingStar(w, h));
        }
        twinklingStarsRef.current = initialStars;
      }
    }

    ctx.clearRect(0, 0, w, h);

    if (isDark) {
      // ── Dark Mode: Twinkling Stars & Shooting Stars ──
      
      // Update and draw twinkling stars
      const twinklingStars = twinklingStarsRef.current;
      for (let i = 0; i < twinklingStars.length; i++) {
        drawAndUpdateTwinklingStar(ctx, twinklingStars[i]);
      }

      // Update and draw shooting stars
      const stars = starsRef.current;
      const maxStars = 2;

      // Spawn a shooting star occasionally (low probability for premium subtle effect)
      if (stars.length < maxStars && Math.random() < 0.007) {
        stars.push(createShootingStar(w, h));
      }

      // Update & draw each shooting star
      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.x += star.dx;
        star.y += star.dy;
        star.opacity -= star.fadeSpeed;

        drawShootingStar(ctx, star);

        // Remove if fully faded or out of bounds
        const outOfBounds =
          star.opacity <= 0 ||
          star.y > h + 50 ||
          star.x > w + 50;

        if (outOfBounds) {
          stars.splice(i, 1);
        }
      }

      // ── Dark Mode: Horizontal Bottom Leaves ──
      const leaves = leavesRef.current;
      const maxLeaves = 10;

      // Spawn a leaf occasionally
      if (leaves.length < maxLeaves && Math.random() < 0.07) {
        leaves.push(createLeaf(w, h, isDark, false));
      }

      // Update & draw each leaf
      for (let i = leaves.length - 1; i >= 0; i--) {
        const leaf = leaves[i];

        // Wobble effect: apply only vertically as a wave to keep horizontal flow smooth and continuous
        leaf.wobblePhase += leaf.wobbleSpeed;
        const wobbleY = Math.sin(leaf.wobblePhase) * 0.25;

        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY + wobbleY;
        leaf.rotation += leaf.rotationSpeed;

        drawLeaf(ctx, leaf, isDark);

        // Remove out-of-bounds leaves (dark mode leaves drift left -> right near bottom)
        const outOfBounds = leaf.x > w + 30 || leaf.y > h + 30 || leaf.y < -30;

        if (outOfBounds) {
          leaves.splice(i, 1);
        }
      }
    } else {
      // ── Light Mode: Golden Leaves & Birds ──
      const leaves = leavesRef.current;
      const maxLeaves = 6;

      // Spawn new leaves near the bottom
      if (leaves.length < maxLeaves && Math.random() < 0.07) {
        leaves.push(createLeaf(w, h, isDark, false));
      }

      // Update & draw each leaf
      for (let i = leaves.length - 1; i >= 0; i--) {
        const leaf = leaves[i];

        // Wobble effect: apply only vertically
        leaf.wobblePhase += leaf.wobbleSpeed;
        const wobbleY = Math.sin(leaf.wobblePhase) * 0.25;

        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY + wobbleY;
        leaf.rotation += leaf.rotationSpeed;

        drawLeaf(ctx, leaf, isDark);

        // Remove out-of-bounds leaves (light mode leaves drift right -> left near bottom)
        const outOfBounds = leaf.x < -30 || leaf.y > h + 30 || leaf.y < -30;

        if (outOfBounds) {
          leaves.splice(i, 1);
        }
      }

      // Update & draw birds in the sky
      const birds = birdsRef.current;
      const maxBirds = 7;

      // Spawn new birds occasionally
      if (birds.length < maxBirds && Math.random() < 0.015) {
        birds.push(createBird(w, h));
      }

      for (let i = birds.length - 1; i >= 0; i--) {
        const bird = birds[i];
        drawAndUpdateBird(ctx, bird);

        // Remove if out of bounds
        const outOfBounds =
          bird.speedX < 0
            ? bird.x < -40 || bird.y < -40 || bird.y > h + 40
            : bird.x > w + 40 || bird.y < -40 || bird.y > h + 40;

        if (outOfBounds) {
          birds.splice(i, 1);
        }
      }
    }

    rafRef.current = requestAnimationFrame(animate);
  }, [isDark]);

  useEffect(() => {
    // Reset and initialize assets when theme changes
    const canvas = canvasRef.current;
    
    // Clear shooting stars immediately when toggling theme
    starsRef.current = [];
    
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || 350;

      if (isDark) {
        // Initialize twinkling stars for Dark Mode
        const numStars = Math.floor(w / 35) + 12;
        const initialStars: TwinklingStar[] = [];
        for (let i = 0; i < numStars; i++) {
          initialStars.push(createTwinklingStar(w, h));
        }
        twinklingStarsRef.current = initialStars;
        
        // Initialize a small amount of leaves near the bottom for Dark Mode
        const initialLeaves: Leaf[] = [];
        for (let i = 0; i < 6; i++) {
          initialLeaves.push(createLeaf(w, h, isDark, true));
        }
        leavesRef.current = initialLeaves;
        birdsRef.current = [];
      } else {
        // Pre-populate on-screen leaves only for Light Mode
        twinklingStarsRef.current = [];
        const initialLeaves: Leaf[] = [];
        for (let i = 0; i < 4; i++) {
          initialLeaves.push(createLeaf(w, h, isDark, true));
        }
        leavesRef.current = initialLeaves;

        // Pre-populate a flock of birds flying across the sky
        const initialBirds: Bird[] = [];
        for (let i = 0; i < 4; i++) {
          const bird = createBird(w, h);
          bird.x = Math.random() * w; // start inside screen
          initialBirds.push(bird);
        }
        birdsRef.current = initialBirds;
      }
    } else {
      leavesRef.current = [];
      twinklingStarsRef.current = [];
      birdsRef.current = [];
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, isDark]);

  return (
    <div className="mx-auto h-[220px] sm:h-[270px] md:h-[310px] lg:h-[350px] relative overflow-hidden">
      {/* Dark mode header image */}
      <img
        src={headerDarkImage}
        alt=""
        aria-hidden="true"
        style={{ objectPosition: "50% 30%" }}
        className={`
          w-full h-full object-cover
          transition-opacity duration-700 ease-in-out
          ${isDark ? "opacity-100" : "opacity-0 absolute inset-0"}
        `}
      />
      {/* Light mode header image */}
      <img
        src={headerLightImage}
        alt=""
        aria-hidden="true"
        style={{ objectPosition: "50% 38%" }}
        className={`
          w-full h-full object-cover
          transition-opacity duration-700 ease-in-out
          ${isDark ? "opacity-0 absolute inset-0" : "opacity-100"}
        `}
      />

      {/* Canvas overlay for leaf animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* Bottom gradient for blending */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent pointer-events-none z-[3]" />

      {/* Clock */}
      {time && (
        <div className="absolute bottom-3 right-5 font-mono text-[1.35rem] font-medium text-white tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-none select-none tabular-nums dotted-clock z-[4]">
          {time}
        </div>
      )}
    </div>
  );
}

