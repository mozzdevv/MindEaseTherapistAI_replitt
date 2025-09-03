import { useEffect, useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Resources from "@/pages/resources";
import FAQ from "@/pages/faq";
import Navbar from "@/components/navbar";
import MobileNav from "@/components/mobile-nav";
import AnimatedBackground from "@/components/animated-background";
import { useIsMobile } from "@/hooks/use-mobile";

function App() {
  const [location] = useLocation();
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
        <div className="min-h-screen flex flex-col transition-colors duration-200">
          <AnimatedBackground />
          <Navbar />

          <main className="flex-grow container mx-auto px-4 py-8 pb-20 md:pb-8 relative z-10">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/resources" component={Resources} />
              <Route path="/faq" component={FAQ} />
              <Route component={NotFound} />
            </Switch>
          </main>

          <footer className="bg-white border-t border-gray-200 py-8 relative z-10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <div className="flex items-center space-x-2">
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
                  <h2 className="text-lg font-heading font-semibold text-gray-900">
                    MindEase
                  </h2>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Privacy-first mental wellbeing conversations</p>
                </div>

                <div className="text-sm text-gray-500">
                  <p>&copy; {new Date().getFullYear()} MindEase. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </QueryClientProvider>
  );
}

export default App;