"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

// Game State
type GameStatus = "idle" | "playing" | "gameover";

// Entity Types
interface Bean {
  x: number;
  y: number;
  speed: number;
  id: number;
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

export default function BeanCatcherGame() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [status, setStatus] = useState<GameStatus>("idle");
  
  // High score persists across renders
  const [highScore, setHighScore] = useState(0);
  
  // Highly mutable engine state (keeps React out of the hot path)
  const engine = useRef({
    cup: { x: 400, vx: 0, lastX: 400, tilt: 0 },
    beans: [] as Bean[],
    particles: [] as Particle[],
    shockwaves: [] as Shockwave[],
    texts: [] as FloatingText[],
    stats: { xp: 0, strikes: 0, lastSpawnTime: 0, beanCounter: 0 },
    vfx: { glitchTime: 0, gridOffset: 0 },
    isGameOver: false,
  });

  const startGame = () => {
    setStatus("playing");
    engine.current = {
      cup: { x: 400, vx: 0, lastX: 400, tilt: 0 },
      beans: [],
      particles: [],
      shockwaves: [],
      texts: [],
      stats: { xp: 0, strikes: 0, lastSpawnTime: performance.now(), beanCounter: 0 },
      vfx: { glitchTime: 0, gridOffset: 0 },
      isGameOver: false,
    };
  };

  // -------------------------------------------------------------
  // THE GAME ENGINE LOOP
  // -------------------------------------------------------------
  useEffect(() => {
    if (status !== "playing" || !isInView) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); // Opaque for performance
    if (!ctx) return;

    let rafId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;
      const state = engine.current;

      // 1. CLEAR & BACKGROUND (Synthwave Void)
      ctx.fillStyle = "#0a0a0f"; // Deep void black/blue
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. 3D PERSPECTIVE GRID (Optical Illusion of Hyper-Speed)
      state.vfx.gridOffset = (state.vfx.gridOffset + (200 + state.stats.xp * 0.5) * dt) % 40;
      
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = `rgba(143, 167, 154, ${0.15 + (state.stats.xp / 10000)})`; // Sage neon
      ctx.lineWidth = 1.5;
      
      const vanishY = canvas.height * 0.3; // Horizon line
      const vanishX = canvas.width / 2;
      
      // Vertical converging lines
      for (let i = -10; i <= 10; i++) {
        const bottomX = vanishX + i * 150;
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(bottomX, canvas.height);
      }
      
      // Horizontal perspective lines moving towards camera
      for (let i = 0; i < 20; i++) {
        // Perspective math: closer lines are further apart and lower
        const z = Math.pow(1.2, i) * 10 - state.vfx.gridOffset;
        if (z > 0) {
          const y = vanishY + z;
          if (y < canvas.height) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
          }
        }
      }
      ctx.stroke();
      
      // Horizon Glow
      const grd = ctx.createLinearGradient(0, vanishY, 0, vanishY + 200);
      grd.addColorStop(0, "rgba(143, 167, 154, 0.4)");
      grd.addColorStop(1, "rgba(10, 10, 15, 0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, vanishY, canvas.width, 200);
      ctx.restore();

      // 3. GLITCH SYSTEM (On Strike)
      if (state.vfx.glitchTime > 0) {
        state.vfx.glitchTime -= dt;
        const glitchIntensity = state.vfx.glitchTime * 30;
        ctx.translate((Math.random() - 0.5) * glitchIntensity, (Math.random() - 0.5) * glitchIntensity);
        
        // Chromatic Aberration overlay
        if (Math.random() > 0.5) {
            ctx.fillStyle = "rgba(255, 0, 0, 0.1)";
            ctx.fillRect(5, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(0, 255, 255, 0.1)";
            ctx.fillRect(-5, 0, canvas.width, canvas.height);
        }
      }

      // 4. DIFFICULTY CURVE
      const level = Math.floor(state.stats.xp / 150);
      const spawnRate = Math.max(100, 1000 - (level * 150));
      const fallSpeed = 250 + (level * 80);

      // Spawn Beans
      if (time - state.stats.lastSpawnTime > spawnRate) {
        state.beans.push({
          x: Math.random() * (canvas.width - 60) + 30,
          y: -20,
          speed: fallSpeed + (Math.random() * 100),
          id: state.stats.beanCounter++,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 15
        });
        state.stats.lastSpawnTime = time;
      }

      // 5. UPDATE & DRAW BEANS
      const cupY = canvas.height - 80;
      
      ctx.save();
      for (let i = state.beans.length - 1; i >= 0; i--) {
        const b = state.beans[i];
        b.y += b.speed * dt;
        b.rotation += b.rotSpeed * dt;

        // Draw Bean Volumetric
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rotation);
        
        // Glow/Aura based on speed
        ctx.shadowBlur = b.speed > 400 ? 15 : 5;
        ctx.shadowColor = "#d8a262";
        
        // 3D Specular Gradient
        const bGrad = ctx.createRadialGradient(-3, -3, 1, 0, 0, 12);
        bGrad.addColorStop(0, "#d8a262"); // Highlight
        bGrad.addColorStop(0.4, "#8a5c2c"); // Midtone
        bGrad.addColorStop(1, "#2a1810"); // Core shadow
        
        ctx.fillStyle = bGrad;
        ctx.beginPath();
        ctx.ellipse(0, 0, 10, 15, 0, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.rotate(-b.rotation);
        ctx.translate(-b.x, -b.y);
        ctx.shadowBlur = 0; // Reset

        // Collision Logic
        if (b.y > cupY - 15 && b.y < cupY + 15) {
          if (Math.abs(b.x - state.cup.x) < 55) {
            // CAUGHT!
            state.stats.xp += 10;
            
            // Spawn VFX
            state.shockwaves.push({ x: b.x, y: cupY, radius: 10, maxRadius: 100, life: 0, maxLife: 0.4 });
            for(let p=0; p<10; p++) {
              state.particles.push({
                x: b.x, y: cupY,
                vx: (Math.random() - 0.5) * 600, vy: (Math.random() - 1.5) * 600,
                life: 0, maxLife: 0.4 + Math.random()*0.4,
                color: Math.random() > 0.5 ? "#d8a262" : "#8FA79A",
                size: Math.random() * 5 + 2
              });
            }
            state.texts.push({ x: b.x, y: cupY - 30, text: "+10", life: 0, maxLife: 0.8, color: "#8FA79A" });
            
            state.beans.splice(i, 1);
            continue;
          }
        }

        // Missed Logic
        if (b.y > canvas.height + 20) {
          state.stats.strikes += 1;
          state.vfx.glitchTime = 0.5; // Trigger glitch
          
          state.shockwaves.push({ x: b.x, y: canvas.height, radius: 10, maxRadius: 150, life: 0, maxLife: 0.6 });
          state.texts.push({ x: b.x, y: canvas.height - 40, text: "STRIKE", life: 0, maxLife: 1.0, color: "#ef4444" });
          
          state.beans.splice(i, 1);
          if (state.stats.strikes >= 3) {
            state.isGameOver = true;
          }
        }
      }
      ctx.restore();

      // 6. UPDATE & DRAW PARTICLES
      ctx.save();
      ctx.globalCompositeOperation = "screen"; // Additive blending for neon particles
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) { state.particles.splice(i, 1); continue; }
        
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vy += 1500 * dt; // Heavy gravity
        
        const alpha = 1 - (p.life / p.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Shockwaves
      for (let i = state.shockwaves.length - 1; i >= 0; i--) {
        const s = state.shockwaves[i];
        s.life += dt;
        if (s.life >= s.maxLife) { state.shockwaves.splice(i, 1); continue; }
        
        const progress = s.life / s.maxLife;
        // Easing out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentRadius = s.radius + (s.maxRadius - s.radius) * easeOut;
        const alpha = 1 - progress;
        
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = "#8FA79A";
        ctx.lineWidth = 4 * (1 - progress);
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#8FA79A";
        ctx.beginPath();
        ctx.ellipse(s.x, s.y, currentRadius, currentRadius * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // 7. CUP PHYSICS & RENDER (The Vessel)
      const cx = state.cup.x;
      // Calculate velocity for banking
      state.cup.vx = (cx - state.cup.lastX) / dt;
      state.cup.lastX = cx;
      
      // Smooth tilt based on velocity
      const targetTilt = Math.max(-0.4, Math.min(0.4, state.cup.vx * 0.0003));
      state.cup.tilt += (targetTilt - state.cup.tilt) * 10 * dt;

      ctx.save();
      ctx.translate(cx, cupY);
      ctx.rotate(state.cup.tilt);
      
      // Vessel Energy Shield (Back)
      ctx.fillStyle = "rgba(143, 167, 154, 0.1)";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#8FA79A";
      ctx.beginPath();
      ctx.ellipse(0, -10, 60, 15, 0, Math.PI, Math.PI*2);
      ctx.fill();

      // Vessel Body (Cyber-Ceramic)
      const cGrad = ctx.createLinearGradient(-40, 0, 40, 0);
      cGrad.addColorStop(0, "#1c1c1c");
      cGrad.addColorStop(0.5, "#3a3a3a");
      cGrad.addColorStop(1, "#1c1c1c");
      
      ctx.fillStyle = cGrad;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(-45, 0);
      ctx.lineTo(45, 0);
      ctx.lineTo(30, 60);
      ctx.lineTo(-30, 60);
      ctx.closePath();
      ctx.fill();
      
      // Cyber Grid Lines on Cup
      ctx.strokeStyle = "#8FA79A";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(-35, 20); ctx.lineTo(35, 20);
      ctx.moveTo(-30, 40); ctx.lineTo(30, 40);
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Vessel Rim (Glowing Intake)
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.ellipse(0, 0, 45, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.strokeStyle = "#8FA79A";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#8FA79A";
      ctx.beginPath();
      ctx.ellipse(0, 0, 45, 12, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // 8. HOLOGRAPHIC HUD (Drawn inside canvas)
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform in case glitch left it translated
      ctx.fillStyle = "#8FA79A";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#8FA79A";
      ctx.font = "bold 20px 'Courier New', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`XP: ${state.stats.xp.toString().padStart(5, '0')}`, 20, 40);
      
      // Strikes
      ctx.fillStyle = "#ef4444";
      ctx.shadowColor = "#ef4444";
      ctx.textAlign = "right";
      ctx.fillText(`SYSTEM DMGS: ${state.stats.strikes}/3`, canvas.width - 20, 40);

      // 9. FLOATING COMBAT TEXT
      ctx.save();
      for (let i = state.texts.length - 1; i >= 0; i--) {
        const t = state.texts[i];
        t.life += dt;
        if (t.life >= t.maxLife) { state.texts.splice(i, 1); continue; }
        
        t.y -= 80 * dt; // Fast float up
        
        ctx.globalAlpha = 1 - Math.pow(t.life / t.maxLife, 2); // Fast fade at end
        ctx.fillStyle = t.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = t.color;
        ctx.font = "bold 28px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText(t.text, t.x, t.y);
      }
      ctx.restore();

      // GAME OVER CHECK
      if (state.isGameOver) {
        if (state.stats.xp > highScore) setHighScore(state.stats.xp);
        setStatus("gameover");
        return; 
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [status, isInView, highScore]);

  // Pointer tracking
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (status !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const x = (e.clientX - rect.left) * scaleX;
    
    engine.current.cup.x = Math.max(50, Math.min(canvas.width - 50, x));
  };

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-24 lg:py-44" aria-label="The 929 Rush - Cyber Espresso Simulator">
      
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sage/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 lg:px-10 flex flex-col items-center">
        
        <div className="text-center mb-16">
          <p className="font-mono text-sm text-sage tracking-widest mb-4 animate-pulse">[ INITIATE NEON SEQUENCE ]</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(143,167,154,0.3)]">THE 929 RUSH</h2>
        </div>

        <div ref={containerRef} className="w-full max-w-[1000px]">
          
          {/* Main Game Container - Heavy Cyberpunk Glassmorphism */}
          <div className="border border-sage/20 bg-black/40 backdrop-blur-2xl rounded-3xl relative overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_0_40px_rgba(143,167,154,0.1)] p-4 md:p-8">
            
            {/* The Engine Canvas */}
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl overflow-hidden border border-white/5 bg-[#0a0a0f] shadow-[inset_0_0_80px_rgba(0,0,0,1)]">
              
              {status === "playing" && (
                <canvas 
                  ref={canvasRef}
                  width={1200}
                  height={800}
                  onPointerMove={handlePointerMove}
                  className="w-full h-full touch-none cursor-crosshair"
                  style={{ touchAction: 'none' }}
                />
              )}

              {/* Holographic Start Overlay */}
              {status === "idle" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-30">
                  <div className="border-t-2 border-b-2 border-sage/50 bg-black/80 py-12 px-8 text-center max-w-lg w-full relative overflow-hidden">
                    {/* Scanline effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
                    
                    <h3 className="font-mono text-4xl text-sage tracking-[0.2em] mb-6 drop-shadow-[0_0_15px_rgba(143,167,154,0.8)]">SYSTEM BOOT</h3>
                    <p className="text-white/60 font-mono text-sm leading-loose mb-10">
                      PILOT THE VESSEL. <br/>
                      ABSORB THE PAYLOAD. <br/>
                      AVOID CRITICAL DAMAGE.
                    </p>
                    <motion.button 
                      whileHover={{ scale: 1.05, textShadow: "0 0 20px #8FA79A", boxShadow: "0 0 40px rgba(143,167,154,0.4)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="bg-sage/20 border border-sage text-sage px-12 py-5 font-mono text-lg font-bold tracking-widest hover:bg-sage hover:text-black transition-all"
                    >
                      ENGAGE
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Holographic Game Over Overlay */}
              {status === "gameover" && (
                <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/80 backdrop-blur-xl z-30">
                  <div className="border border-red-500/50 bg-black/90 p-12 text-center max-w-xl w-full relative shadow-[0_0_100px_rgba(239,68,68,0.4)]">
                    
                    <h3 className="font-mono text-5xl text-red-500 tracking-[0.2em] mb-4 font-bold drop-shadow-[0_0_20px_rgba(239,68,68,1)]">CRITICAL FAILURE</h3>
                    <p className="font-mono text-sm text-red-400/80 tracking-widest mb-12 border-b border-red-500/20 pb-4">SYSTEM BREACH DETECTED</p>
                    
                    <div className="flex justify-between items-center bg-red-950/30 p-6 border border-red-500/20 mb-12">
                      <div className="text-left">
                        <p className="font-mono text-xs text-white/50 tracking-widest mb-2">FINAL XP</p>
                        <p className="font-mono text-5xl text-white font-bold">{engine.current.stats.xp}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-xs text-sage/80 tracking-widest mb-2">PERSONAL BEST</p>
                        <p className="font-mono text-5xl text-sage drop-shadow-[0_0_10px_rgba(143,167,154,0.5)]">{highScore}</p>
                      </div>
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(143,167,154,0.6)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startGame}
                      className="bg-sage border border-sage text-black w-full py-6 font-mono text-lg font-bold tracking-[0.3em] hover:bg-white hover:border-white transition-all"
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
