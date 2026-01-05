import { useEffect, useState, useRef } from "react";
import { useTheme } from "next-themes";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // After mounting, we can access the DOM
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (canvas) {
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Bubble/circle properties
    const circles: Circle[] = [];
    const numCircles = 8; // Fewer, larger, slower circles for "Serene" feel

    class Circle {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      canvasWidth: number;
      canvasHeight: number;

      constructor() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;

        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.radius = Math.random() * 200 + 100; // Much larger
        this.dx = (Math.random() - 0.5) * 0.2; // Very slow
        this.dy = (Math.random() - 0.5) * 0.2;

        // SERENE PALETTE: Sage, Lavender, Soft Teal
        const palettes = [
          'hsla(160, 40%, 85%, 0.4)', // Sage
          'hsla(240, 60%, 92%, 0.4)', // Lavender
          'hsla(180, 45%, 88%, 0.4)', // Soft Teal
          'hsla(200, 50%, 90%, 0.3)', // Pale Blue
        ];

        // For dark mode, use deeper but still soft versions
        const darkPalettes = [
          'hsla(160, 30%, 15%, 0.1)',
          'hsla(240, 20%, 20%, 0.1)',
          'hsla(180, 25%, 15%, 0.1)',
        ];

        this.color = resolvedTheme === 'dark'
          ? darkPalettes[Math.floor(Math.random() * darkPalettes.length)]
          : palettes[Math.floor(Math.random() * palettes.length)];
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        // Use a gradient for the circle itself for softer edges
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

        // Parse the HSLA to get the color without alpha for the gradient stops
        // Simply reusing the color string here as it works for fillStyle, 
        // but for radial transparency we can just hack it by keeping fillStyle simple
        // or actually assume simple circle fill with globalBlur is easier.

        ctx.fillStyle = this.color;
        // Blur effect for softness
        ctx.filter = 'blur(60px)';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.filter = 'none'; // Reset filter
      }

      update() {
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight;

        if (this.x + this.radius > this.canvasWidth + 200 || this.x - this.radius < -200) {
          this.dx = -this.dx;
        }

        if (this.y + this.radius > this.canvasHeight + 200 || this.y - this.radius < -200) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    // Create circles
    for (let i = 0; i < numCircles; i++) {
      circles.push(new Circle());
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Use actual canvas attributes

      // Background base
      ctx.fillStyle = resolvedTheme === 'dark' ? 'hsl(165, 40%, 5%)' : 'hsl(150, 20%, 98%)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw all circles
      circles.forEach(circle => circle.update());
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transition-colors duration-1000"
      />
      {/* Texture overlay for 'paper' or 'noise' feel if desired, optional */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
    </div>
  );
}
