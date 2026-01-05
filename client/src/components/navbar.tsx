import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
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
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
    const isActive = location === to;
    return (
      <Link href={to}>
        <div className={`cursor-pointer text-sm font-medium transition-all duration-300 relative px-3 py-1 ${isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
          }`}>
          {children}
          {isActive && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/80 rounded-full mx-3"
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 rounded-b-2xl ${scrolled
          ? "py-3 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-sm border-b border-white/20"
          : "py-6 bg-transparent"
        }`}
    >
      <div className="container max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer group">
              {/* Minimal Logo */}
              <div className="relative flex items-center justify-center h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-foreground/80 group-hover:text-foreground transition-colors"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M7 13l2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5" />
                </svg>
              </div>
              <span className="text-xl font-heading font-semibold text-foreground tracking-tight">
                MindEase
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm p-1.5 rounded-full border border-white/10">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/resources">Resources</NavLink>
            <NavLink to="/faq">About</NavLink>
          </nav>

          {/* Empty div to balance flex for desktop, or separate actions if needed */}
          <div className="hidden md:block w-8"></div>

          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="md:hidden rounded-full hover:bg-black/5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/10 p-4 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col space-y-2">
              <Link href="/"><span className="block py-3 px-4 rounded-lg hover:bg-black/5 text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Home</span></Link>
              <Link href="/resources"><span className="block py-3 px-4 rounded-lg hover:bg-black/5 text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>Resources</span></Link>
              <Link href="/faq"><span className="block py-3 px-4 rounded-lg hover:bg-black/5 text-foreground font-medium" onClick={() => setMobileMenuOpen(false)}>About</span></Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}