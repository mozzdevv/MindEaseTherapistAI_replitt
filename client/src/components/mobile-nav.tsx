import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ThemeToggle from "./theme-toggle";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const handleNavigation = () => {
    setIsOpen(false);
  };
  
  // Close sheet when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('[data-sheet]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },
    {
      name: "Resources",
      path: "/resources",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
          <path fillRule="evenodd" d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: "FAQ",
      path: "/faq",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <>
      {/* Fixed Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-background/90 backdrop-blur-lg border-t border-border/20 shadow-elevated">
        <nav className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <Button 
                variant="ghost" 
                className={`flex flex-col items-center py-2 h-auto text-sm font-medium ${
                  location === item.path 
                    ? 'text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                }`}
                onClick={handleNavigation}
              >
                <span className="mb-1">{item.icon}</span>
                <span className="text-xs">{item.name}</span>
                {location === item.path && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-1/2 bg-primary rounded-full"
                    layoutId="navIndicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Button>
            </Link>
          ))}
          
          {/* Theme toggle removed as we no longer support theme switching */}
        </nav>
      </div>
      
      {/* Side Navigation Panel */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent 
          side="left" 
          className="w-[80%] p-0 border-r border-border/10 bg-background/95 backdrop-blur-lg"
        >
          {/* Hidden accessible title for screen readers */}
          <div className="sr-only" aria-live="polite">Navigation Menu</div>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-border/10">
              <div className="flex items-center space-x-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3C7 3 3 5 3 10c0 4 4 5 9 11c5-6 9-7 9-11c0-5-4-7-9-7z" />
                    <path d="M12 3C9 3 6 4 6 8c0 3 3 4 6 8c3-4 6-5 6-8c0-4-3-5-6-5z" />
                    <circle cx="12" cy="10" r="2" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-foreground">MindEase</h3>
              </div>
            </div>
            
            <nav className="py-6 flex-1">
              <div className="px-3 mb-6">
                <h4 className="px-4 text-xs uppercase tracking-wider text-foreground/60 font-medium mb-2">Navigation</h4>
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <SheetClose asChild>
                        <Link href={item.path}>
                          <Button 
                            variant="ghost" 
                            className={`w-full justify-start px-4 py-6 h-auto text-base font-medium transition-all duration-200 ${
                              location === item.path 
                                ? 'bg-primary/10 text-primary'
                                : 'text-foreground/70 hover:text-foreground hover:bg-muted'
                            }`}
                            onClick={handleNavigation}
                          >
                            <span className="inline-flex items-center">
                              <span className="mr-3">{item.icon}</span>
                              {item.name}
                              {location === item.path && (
                                <motion.span 
                                  className="ml-auto h-2 w-2 rounded-full bg-primary"
                                  layoutId="activeIndicator"
                                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                              )}
                            </span>
                          </Button>
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Settings section removed as we no longer support theme switching */}
            </nav>
            
            <div className="p-6 border-t border-border/10">
              <div className="flex flex-col">
                <p className="text-xs text-foreground/60">
                  MindEase provides private mental health conversations with zero data storage.
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
