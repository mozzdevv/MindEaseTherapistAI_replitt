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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Bubble/circle properties
    const circles: Circle[] = [];
    const numCircles = 15;
    
    class Circle {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      alpha: number;
      canvasWidth: number;
      canvasHeight: number;
      
      constructor() {
        // Make sure to capture the current theme state
        const currentIsDark = resolvedTheme === "dark";
        
        this.canvasWidth = canvas ? canvas.width : window.innerWidth;
        this.canvasHeight = canvas ? canvas.height : window.innerHeight;
        
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.radius = Math.random() * 80 + 30;
        this.dx = (Math.random() - 0.5) * 0.5;
        this.dy = (Math.random() - 0.5) * 0.5;
        
        // Inverted color scheme for dark mode
        const purpleHues = [260, 275, 285, 295]; // Vibrant purple variations
        const greenHues = [140, 150, 160]; // Vibrant green variations
        
        const baseHue = currentIsDark 
          ? Math.random() > 0.3 ? greenHues[Math.floor(Math.random() * greenHues.length)] : purpleHues[Math.floor(Math.random() * purpleHues.length)]
          : purpleHues[Math.floor(Math.random() * purpleHues.length)]; 
        const hue = baseHue + (Math.random() * 10 - 5);
        const saturation = currentIsDark ? 75 + Math.random() * 20 : 80 + Math.random() * 20;
        const lightness = currentIsDark ? 70 + Math.random() * 15 : 15 + Math.random() * 15;
        const opacity = currentIsDark ? 0.12 : 0.22;
        
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
        this.alpha = currentIsDark ? 0.08 + Math.random() * 0.08 : 0.05 + Math.random() * 0.1;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        // Get current canvas dimensions in case they've changed
        this.canvasWidth = canvas ? canvas.width : window.innerWidth;
        this.canvasHeight = canvas ? canvas.height : window.innerHeight;
        
        if (this.x + this.radius > this.canvasWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        
        if (this.y + this.radius > this.canvasHeight || this.y - this.radius < 0) {
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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Light gradient background
      const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      
      const currentIsDark = resolvedTheme === "dark";
      if (currentIsDark) {
        // Dark mode gradient - inverted to lighter, more ethereal tones
        bgGradient.addColorStop(0, 'rgba(240, 250, 250, 0.05)'); // very subtle light teal
        bgGradient.addColorStop(0.3, 'rgba(230, 255, 240, 0.08)'); // subtle light mint
        bgGradient.addColorStop(0.7, 'rgba(235, 252, 245, 0.06)'); // subtle light green
        bgGradient.addColorStop(1, 'rgba(245, 255, 250, 0.04)'); // very subtle green-white
      } else {
        // Light mode gradient - inverted to deeper, richer tones
        bgGradient.addColorStop(0, 'rgba(20, 15, 35, 0.95)'); // deep purple-black
        bgGradient.addColorStop(0.3, 'rgba(32, 15, 60, 0.98)'); // rich purple
        bgGradient.addColorStop(0.7, 'rgba(25, 10, 50, 0.96)'); // medium purple-black
        bgGradient.addColorStop(1, 'rgba(12, 8, 24, 0.99)'); // very deep purple
      }
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw all circles
      circles.forEach(circle => circle.update());
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mounted, resolvedTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full transition-colors duration-1000"
      />
    </div>
  );
}
