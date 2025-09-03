import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./theme-toggle";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Fix Link + a tag nesting by creating a custom nav link component
  const NavLink = ({ to, children, className }: { to: string; children: React.ReactNode; className?: string }) => {
    const isActive = location === to;
    const baseClasses = "relative transition-colors duration-200";
    const activeClasses = "text-primary font-medium";
    const inactiveClasses = "text-foreground/80 hover:text-primary/80";

    return (
      <Link href={to}>
        <div className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className} cursor-pointer`}>
          {children}
          {isActive && (
            <motion.div 
              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" 
              layoutId="navbar-indicator"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </div>
      </Link>
    );
  };

  return (
    <header 
      className={`sticky top-0 z-50 backdrop-blur-lg ${
        scrolled 
          ? "bg-background/80 shadow-sm" 
          : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="premium-container max-w-7xl">
        <div className="flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center justify-center h-10 w-10">
                <div className="absolute inset-0 bg-primary/10 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-primary relative z-10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path className="text-slate-100" d="M12 3C7 3 3 5 3 10c0 4 4 5 9 11c5-6 9-7 9-11c0-5-4-7-9-7z" />
                  <path className="text-slate-100" d="M12 3C9 3 6 4 6 8c0 3 3 4 6 8c3-4 6-5 6-8c0-4-3-5-6-5z" />
                  <circle className="text-slate-100" cx="12" cy="10" r="2" />
                </svg>
              </div>
              <h1 className="text-xl font-medium text-primary">
                MindEase
              </h1>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/faq">Privacy FAQ</NavLink>
          </nav>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden w-9 h-9 rounded-full hover:bg-primary/10"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile menu with animation */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div 
            className="md:hidden backdrop-blur-xl bg-background/90 border-t border-border/10 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="premium-container py-3 space-y-1">
              <Link href="/">
                <div className={`flex items-center space-x-2 py-3 px-3 rounded-lg ${
                  location === "/" 
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5"
                } transition-colors cursor-pointer`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Home</span>
                </div>
              </Link>

              <Link href="/resources">
                <div className={`flex items-center space-x-2 py-3 px-3 rounded-lg ${
                  location === "/resources" 
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5"
                } transition-colors cursor-pointer`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>Resources</span>
                </div>
              </Link>

              <Link href="/faq">
                <div className={`flex items-center space-x-2 py-3 px-3 rounded-lg ${
                  location === "/faq" 
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-primary/5"
                } transition-colors cursor-pointer`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Privacy FAQ</span>
                </div>
              </Link>

              {/* Theme toggle section removed as we no longer support theme switching */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}