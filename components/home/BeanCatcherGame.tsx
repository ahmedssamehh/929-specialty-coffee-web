"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type GameStatus = "idle" | "playing" | "gameover";

interface Bean {
  x: number;
  y: number;
  speed: number;
  rotation: number;
  rotSpeed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  life: number;
  maxLife: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  life: number;
  maxLife: number;
  color: string;
}

/** Design width the gameplay tuning was authored against. */
const DESIGN_W = 900;

export default function BeanCatcherGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [status, setStatus] = useState<GameStatus>("idle");
  const [highScore, setHighScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [isTouch, setIsTouch] = useState(false);

  // High score is read inside the loop — keep it in a ref so the effect never
  // has to list it as a dependency (that would restart the game mid-play).
  const highScoreRef = useRef(0);
  highScoreRef.current = highScore;

  // Canvas box in CSS pixels, kept current by a ResizeObserver.
  const view = useRef({ w: 900, h: 506, dpr: 1 });

  const engine = useRef({
    cup: { x: 450, targetX: 450, vx: 0, lastX: 450, tilt: 0 },
    beans: [] as Bean[],
    particles: [] as Particle[],
    shockwaves: [] as Shockwave[],
    texts: [] as FloatingText[],
    stats: { xp: 0, strikes: 0, lastSpawnTime: 0 },
    vfx: { glitchTime: 0, gridOffset: 0 },
    keys: { left: false, right: false },
    isGameOver: false,
  });

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  const startGame = useCallback(() => {
    const { w } = view.current;
    engine.current = {
      cup: { x: w / 2, targetX: w / 2, vx: 0, lastX: w / 2, tilt: 0 },
      beans: [],
      particles: [],
      shockwaves: [],
      texts: [],
      stats: { xp: 0, strikes: 0, lastSpawnTime: performance.now() },
      vfx: { glitchTime: 0, gridOffset: 0 },
      keys: { left: false, right: false },
      isGameOver: false,
    };
    setStatus("playing");
  }, []);

  // ---------------------------------------------------------------
  // Keep the backing store matched to the element's real size and DPR.
  // A fixed 1200x800 buffer gets stretched into whatever aspect ratio the
  // container has, which is what squashed the scene on phones.
  // ---------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // Cap DPR: past 2x the fill-rate cost outweighs the sharpness gain.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      const prevW = view.current.w;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      view.current = { w, h, dpr };

      // Keep the cup proportionally placed across a resize or rotation.
      const ratio = prevW ? w / prevW : 1;
      const cup = engine.current.cup;
      cup.x *= ratio;
      cup.targetX *= ratio;
      cup.lastX = cup.x;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("orientationchange", resize);
    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", resize);
    };
  }, []);

  // ---------------------------------------------------------------
  // Game loop
  // ---------------------------------------------------------------
  useEffect(() => {
    if (status !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let rafId = 0;
    let lastTime = performance.now();

    const render = (time: number) => {
      // Clamp dt so a dropped frame or tab switch can't teleport the beans.
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const state = engine.current;
      const { w: W, h: H, dpr } = view.current;
      // One scale factor drives every dimension, so the game plays the same
      // on a 320px phone as on a 1400px desktop.
      const s = Math.max(0.45, Math.min(1.25, W / DESIGN_W));

      const base = () => ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      base();

      // 1. Void background
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, W, H);

      // 2. Perspective grid
      state.vfx.gridOffset =
        (state.vfx.gridOffset + (200 + state.stats.xp * 0.5) * dt * s) % 40;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = `rgba(143, 167, 154, ${0.15 + state.stats.xp / 10000})`;
      ctx.lineWidth = 1.5;

      const vanishY = H * 0.3;
      const vanishX = W / 2;
      for (let i = -10; i <= 10; i++) {
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(vanishX + i * 150 * s, H);
      }
      for (let i = 0; i < 20; i++) {
        const z = Math.pow(1.2, i) * 10 - state.vfx.gridOffset;
        if (z > 0) {
          const y = vanishY + z;
          if (y < H) {
            ctx.moveTo(0, y);
            ctx.lineTo(W, y);
          }
        }
      }
      ctx.stroke();

      const grd = ctx.createLinearGradient(0, vanishY, 0, vanishY + 200 * s);
      grd.addColorStop(0, "rgba(143, 167, 154, 0.4)");
      grd.addColorStop(1, "rgba(10, 10, 15, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, vanishY, W, 200 * s);
      ctx.restore();

      // 3. Glitch — scoped in a save/restore so it can never leak into the HUD.
      ctx.save();
      if (state.vfx.glitchTime > 0) {
        state.vfx.glitchTime -= dt;
        const gi = state.vfx.glitchTime * 30;
        ctx.translate((Math.random() - 0.5) * gi, (Math.random() - 0.5) * gi);
        if (Math.random() > 0.5) {
          ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
          ctx.fillRect(5, 0, W, H);
          ctx.fillStyle = "rgba(0, 255, 255, 0.1)";
          ctx.fillRect(-5, 0, W, H);
        }
      }

      // 4. Difficulty
      const level = Math.floor(state.stats.xp / 150);
      const spawnRate = Math.max(160, 1000 - level * 140);
      const fallSpeed = (240 + level * 70) * s;

      if (time - state.stats.lastSpawnTime > spawnRate) {
        const margin = 30 * s;
        state.beans.push({
          x: Math.random() * (W - margin * 2) + margin,
          y: -20,
          speed: fallSpeed + Math.random() * 90 * s,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 15,
        });
        state.stats.lastSpawnTime = time;
      }

      // 5. Cup control — keys nudge the target, pointer sets it outright.
      const cupW = 52 * s;
      const cupY = H - 74 * s;
      if (state.keys.left) state.cup.targetX -= 620 * s * dt;
      if (state.keys.right) state.cup.targetX += 620 * s * dt;
      state.cup.targetX = Math.max(cupW, Math.min(W - cupW, state.cup.targetX));
      // A smooth chase keeps motion fluid even with coarse touch sampling.
      state.cup.x += (state.cup.targetX - state.cup.x) * Math.min(1, 22 * dt);

      // 6. Beans
      const beanRX = 9 * s;
      const beanRY = 13 * s;
      for (let i = state.beans.length - 1; i >= 0; i--) {
        const b = state.beans[i];
        b.y += b.speed * dt;
        b.rotation += b.rotSpeed * dt;

        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        ctx.shadowBlur = (b.speed > 400 * s ? 15 : 5) * s;
        ctx.shadowColor = "#d8a262";
        const bg = ctx.createRadialGradient(-3 * s, -3 * s, 1, 0, 0, 12 * s);
        bg.addColorStop(0, "#d8a262");
        bg.addColorStop(0.4, "#8a5c2c");
        bg.addColorStop(1, "#2a1810");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.ellipse(0, 0, beanRX, beanRY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Catch
        if (b.y > cupY - 16 * s && b.y < cupY + 18 * s) {
          if (Math.abs(b.x - state.cup.x) < cupW) {
            state.stats.xp += 10;
            state.shockwaves.push({
              x: b.x,
              y: cupY,
              radius: 10 * s,
              maxRadius: 100 * s,
              life: 0,
              maxLife: 0.4,
            });
            const puff = W < 520 ? 6 : 10;
            for (let p = 0; p < puff; p++) {
              state.particles.push({
                x: b.x,
                y: cupY,
                vx: (Math.random() - 0.5) * 600 * s,
                vy: (Math.random() - 1.5) * 600 * s,
                life: 0,
                maxLife: 0.4 + Math.random() * 0.4,
                color: Math.random() > 0.5 ? "#d8a262" : "#8FA79A",
                size: (Math.random() * 5 + 2) * s,
              });
            }
            state.texts.push({
              x: b.x,
              y: cupY - 30 * s,
              text: "+10",
              life: 0,
              maxLife: 0.8,
              color: "#8FA79A",
            });
            state.beans.splice(i, 1);
            continue;
          }
        }

        // Miss
        if (b.y > H + 20) {
          state.stats.strikes += 1;
          state.vfx.glitchTime = 0.5;
          state.shockwaves.push({
            x: b.x,
            y: H,
            radius: 10 * s,
            maxRadius: 150 * s,
            life: 0,
            maxLife: 0.6,
          });
          state.texts.push({
            x: b.x,
            y: H - 40 * s,
            text: "STRIKE",
            life: 0,
            maxLife: 1,
            color: "#ef4444",
          });
          state.beans.splice(i, 1);
          if (state.stats.strikes >= 3) state.isGameOver = true;
        }
      }

      // 7. Particles and shockwaves
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          state.particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 1500 * s * dt;
        ctx.globalAlpha = 1 - p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const sw = state.shockwaves[i];
        sw.life += dt;
        if (sw.life >= sw.maxLife) {
          state.shockwaves.splice(i, 1);
          continue;
        }
        const prog = sw.life / sw.maxLife;
        const ease = 1 - Math.pow(1 - prog, 3);
        const r = sw.radius + (sw.maxRadius - sw.radius) * ease;
        ctx.globalAlpha = 1 - prog;
        ctx.strokeStyle = "#8FA79A";
        ctx.lineWidth = 4 * (1 - prog) * s;
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#8FA79A";
        ctx.beginPath();
        ctx.ellipse(sw.x, sw.y, r, r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 8. The vessel
      const cx = state.cup.x;
      state.cup.vx = dt > 0 ? (cx - state.cup.lastX) / dt : 0;
      state.cup.lastX = cx;
      const targetTilt = Math.max(-0.4, Math.min(0.4, state.cup.vx * 0.0003));
      state.cup.tilt += (targetTilt - state.cup.tilt) * 10 * dt;

      ctx.save();
      ctx.translate(cx, cupY);
      ctx.rotate(state.cup.tilt);
      ctx.fillStyle = "rgba(143, 167, 154, 0.1)";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#8FA79A";
      ctx.beginPath();
      ctx.ellipse(0, -10 * s, 60 * s, 15 * s, 0, Math.PI, Math.PI * 2);
      ctx.fill();

      const cg = ctx.createLinearGradient(-40 * s, 0, 40 * s, 0);
      cg.addColorStop(0, "#1c1c1c");
      cg.addColorStop(0.5, "#3a3a3a");
      cg.addColorStop(1, "#1c1c1c");
      ctx.fillStyle = cg;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(-45 * s, 0);
      ctx.lineTo(45 * s, 0);
      ctx.lineTo(30 * s, 60 * s);
      ctx.lineTo(-30 * s, 60 * s);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#8FA79A";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(-35 * s, 20 * s);
      ctx.lineTo(35 * s, 20 * s);
      ctx.moveTo(-30 * s, 40 * s);
      ctx.lineTo(30 * s, 40 * s);
      ctx.stroke();
      ctx.globalAlpha = 1;

      ctx.fillStyle = "#000";
      ctx.beginPath();
      ctx.ellipse(0, 0, 45 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#8FA79A";
      ctx.lineWidth = 3 * s;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#8FA79A";
      ctx.beginPath();
      ctx.ellipse(0, 0, 45 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // 9. Floating text
      ctx.save();
      for (let i = state.texts.length - 1; i >= 0; i--) {
        const t = state.texts[i];
        t.life += dt;
        if (t.life >= t.maxLife) {
          state.texts.splice(i, 1);
          continue;
        }
        t.y -= 80 * s * dt;
        ctx.globalAlpha = 1 - Math.pow(t.life / t.maxLife, 2);
        ctx.fillStyle = t.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = t.color;
        ctx.font = `bold ${Math.round(26 * s)}px 'Courier New', monospace`;
        ctx.textAlign = "center";
        ctx.fillText(t.text, t.x, t.y);
      }
      ctx.restore();

      ctx.restore(); // close the glitch scope

      // 10. HUD — drawn at the base transform so glitch never shifts it.
      base();
      const hud = Math.round(Math.max(13, 19 * s));
      ctx.font = `bold ${hud}px 'Courier New', monospace`;
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#8FA79A";
      ctx.shadowColor = "#8FA79A";
      ctx.textAlign = "left";
      ctx.fillText(
        `XP: ${state.stats.xp.toString().padStart(5, "0")}`,
        16 * s,
        34 * s
      );
      ctx.fillStyle = "#ef4444";
      ctx.shadowColor = "#ef4444";
      ctx.textAlign = "right";
      const dmg =
        W < 520
          ? `DMG ${state.stats.strikes}/3`
          : `SYSTEM DMGS: ${state.stats.strikes}/3`;
      ctx.fillText(dmg, W - 16 * s, 34 * s);
      ctx.shadowBlur = 0;

      if (state.isGameOver) {
        setFinalScore(state.stats.xp);
        if (state.stats.xp > highScoreRef.current) setHighScore(state.stats.xp);
        setStatus("gameover");
        return;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    // Pause when the tab is backgrounded — saves battery and avoids a dt spike.
    const onVisibility = () => {
      cancelAnimationFrame(rafId);
      if (!document.hidden) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [status]);

  // ---------------------------------------------------------------
  // Input
  // ---------------------------------------------------------------
  const aim = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return;
    // Work in CSS pixels — the backing store already matches this box.
    engine.current.cup.targetX = Math.max(
      0,
      Math.min(rect.width, clientX - rect.left)
    );
  };

  const onPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (status !== "playing") return;
    // Capture so a drag keeps tracking even if the finger leaves the canvas.
    e.currentTarget.setPointerCapture?.(e.pointerId);
    aim(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (status !== "playing") return;
    // Mouse follows hover. Touch and pen only track while pressed, so a
    // vertical swipe still scrolls the page instead of being swallowed.
    if (e.pointerType !== "mouse" && e.buttons === 0) return;
    aim(e.clientX);
  };

  useEffect(() => {
    if (status !== "playing") return;
    const down = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") {
        engine.current.keys.left = true;
        e.preventDefault();
      }
      if (k === "arrowright" || k === "d") {
        engine.current.keys.right = true;
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "arrowleft" || k === "a") engine.current.keys.left = false;
      if (k === "arrowright" || k === "d") engine.current.keys.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [status]);

  return (
    <section
      className="relative overflow-hidden bg-[#0a0a0f] py-20 sm:py-24 lg:py-44"
      aria-label="The 929 Rush — arcade bean catcher"
    >
      {/* Ambient glow, sized in vw so phones never have to composite a huge
          blurred surface — large-radius blur is the priciest paint on mobile. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/10 blur-[80px]"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 lg:px-10">
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-4 font-mono text-xs tracking-widest text-sage sm:text-sm">
            [ INITIATE NEON SEQUENCE ]
          </p>
          <h2 className="text-4xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(143,167,154,0.3)] sm:text-5xl md:text-7xl">
            THE 929 RUSH
          </h2>
        </div>

        <div className="w-full max-w-[1000px]">
          <div className="relative overflow-hidden rounded-2xl border border-sage/20 bg-black/40 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(143,167,154,0.1)] sm:rounded-3xl sm:p-4 md:p-8">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0f] shadow-[inset_0_0_80px_rgba(0,0,0,1)] sm:aspect-[3/2] md:aspect-[16/9]">
              {/* The canvas stays mounted in every state so its size is known
                  before the first frame — no start-up flash, no zero-size race. */}
              <canvas
                ref={canvasRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                className="h-full w-full select-none"
                // pan-y: horizontal drags steer the cup while vertical swipes
                // still scroll, so the game can never trap the reader.
                style={{
                  touchAction: "pan-y",
                  cursor: status === "playing" ? "crosshair" : "default",
                }}
                aria-label="Game canvas"
              />

              {status === "idle" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 px-4 backdrop-blur-md"
                >
                  <div className="relative w-full max-w-lg overflow-hidden border-t-2 border-b-2 border-sage/50 bg-black/80 px-5 py-8 text-center sm:px-8 sm:py-12">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-20" />
                    <h3 className="mb-4 font-mono text-2xl tracking-[0.2em] text-sage drop-shadow-[0_0_15px_rgba(143,167,154,0.8)] sm:mb-6 sm:text-4xl">
                      SYSTEM BOOT
                    </h3>
                    <p className="mb-5 font-mono text-xs leading-loose text-white/60 sm:mb-8 sm:text-sm">
                      PILOT THE VESSEL. <br />
                      ABSORB THE PAYLOAD. <br />
                      AVOID CRITICAL DAMAGE.
                    </p>
                    <p className="mb-6 font-mono text-[0.65rem] tracking-widest text-sage/70 sm:mb-10 sm:text-xs">
                      {isTouch
                        ? "DRAG ACROSS THE GRID TO STEER"
                        : "MOVE MOUSE OR USE ← → KEYS"}
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="min-h-[52px] w-full border border-sage bg-sage/20 px-8 py-4 font-mono text-base font-bold tracking-widest text-sage transition-colors hover:bg-sage hover:text-black sm:w-auto sm:px-12 sm:py-5 sm:text-lg"
                    >
                      ENGAGE
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {status === "gameover" && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-red-950/80 px-4 backdrop-blur-xl"
                >
                  <div className="relative w-full max-w-xl border border-red-500/50 bg-black/90 p-5 text-center shadow-[0_0_100px_rgba(239,68,68,0.4)] sm:p-12">
                    <h3 className="mb-3 font-mono text-2xl font-bold tracking-[0.2em] text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,1)] sm:mb-4 sm:text-5xl">
                      CRITICAL FAILURE
                    </h3>
                    <p className="mb-6 border-b border-red-500/20 pb-3 font-mono text-[0.65rem] tracking-widest text-red-400/80 sm:mb-12 sm:pb-4 sm:text-sm">
                      SYSTEM BREACH DETECTED
                    </p>
                    <div className="mb-6 flex items-center justify-between border border-red-500/20 bg-red-950/30 p-4 sm:mb-12 sm:p-6">
                      <div className="text-left">
                        <p className="mb-1 font-mono text-[0.6rem] tracking-widest text-white/50 sm:mb-2 sm:text-xs">
                          FINAL XP
                        </p>
                        <p className="font-mono text-3xl font-bold tabular-nums text-white sm:text-5xl">
                          {finalScore}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="mb-1 font-mono text-[0.6rem] tracking-widest text-sage/80 sm:mb-2 sm:text-xs">
                          PERSONAL BEST
                        </p>
                        <p className="font-mono text-3xl tabular-nums text-sage drop-shadow-[0_0_10px_rgba(143,167,154,0.5)] sm:text-5xl">
                          {highScore}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={startGame}
                      className="min-h-[52px] w-full border border-sage bg-sage py-4 font-mono text-base font-bold tracking-[0.3em] text-black transition-colors hover:border-white hover:bg-white sm:py-6 sm:text-lg"
                    >
                      REBOOT SYSTEM
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
