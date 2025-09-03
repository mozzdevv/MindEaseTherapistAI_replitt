import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/chat/chat-interface";
import { APIConfig } from "@/components/api-config";
import { motion } from "framer-motion";

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [showAPIConfig, setShowAPIConfig] = useState(false);
  const [hasValidKeys, setHasValidKeys] = useState(false);

  // Check for API keys on component mount
  useEffect(() => {
    const claudeKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    const deepseekKey = import.meta.env.VITE_DEEPSEEK_API_KEY;
    const hasKeys = Boolean(claudeKey || deepseekKey);
    setHasValidKeys(hasKeys);
  }, []);

  const toggleChat = () => {
    if (!hasValidKeys) {
      setShowAPIConfig(true);
    } else {
      setShowChat(!showChat);
    }
  };

  const handleKeysConfigured = () => {
    setShowAPIConfig(false);
    setHasValidKeys(true);
    setShowChat(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  const featureVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 380,
        damping: 30
      }
    }
  };

  // Feature items
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "No Data Storage",
      description: "Your conversations are never saved or logged on our servers or in your browser."
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 005 10a6 6 0 0012 0c0-.35-.035-.691-.1-1.02A5 5 0 0010 11z"
            clipRule="evenodd"
          />
        </svg>
      ),
      title: "No Account Needed",
      description: "Start a conversation instantly without creating an account or providing personal information."
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
            clipRule="evenodd"
          />
          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
        </svg>
      ),
      title: "No Tracking",
      description: "We use no cookies, analytics, or any kind of user identification or session tracking."
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Smart AI Routing",
      description: "Automatically switches between Claude and DeepSeek AI to provide the most effective therapeutic response for your needs."
    }
  ];

  return (
    <section className="premium-section relative z-10 min-h-[calc(100vh-70px)] flex items-center">
      <div className="premium-container">
        {!showChat && (
          <motion.div 
            className="flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main heading */}
            <motion.div 
              className="text-center max-w-3xl mx-auto mb-14"
              variants={itemVariants}
            >
              <div className="inline-flex items-center px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium">Complete Privacy, Guaranteed</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-4 premium-gradient-text">
                A Safe Space for Your Thoughts
              </h1>

              <p className="text-lg text-foreground/90 md:text-xl max-w-2xl mx-auto leading-relaxed">
                Express your thoughts and feelings in a private, zero-storage environment 
                where nothing is saved, stored, or tracked.
              </p>
            </motion.div>

            {/* Feature badges */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3 mb-12"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm border border-border/20 px-4 py-2.5 rounded-full shadow-sm"
                  variants={featureVariants}
                  whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-primary/80">{feature.icon}</div>
                  <span className="text-sm font-medium text-foreground/80">{feature.title}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="mb-20"
            >
              <Button
                id="start-chat-button"
                onClick={toggleChat}
                className="premium-button bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-lg font-medium group transition-all duration-300"
                size="lg"
              >
                <span className="mr-2">Start a private conversation</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5" 
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </Button>
            </motion.div>

            {/* Bottom info cards */}
            <motion.div 
              className="w-full max-w-5xl mx-auto"
              variants={itemVariants}
            >
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="premium-card bg-background/95 backdrop-blur-md p-6 flex flex-col shadow-lg border-border/30"
                    variants={featureVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="mb-4 bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-medium mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-foreground/80 leading-relaxed text-sm">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center text-sm text-foreground/70 mt-12">
                <p>MindEase is built with privacy at its core, prioritizing your digital well-being and mental health.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {/* Chat Interface - Fullscreen popup overlay */}
        {showChat && (
          <div className="fixed inset-0 z-[99999] overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            {/* Global styles for the chat overlay are in index.css */}
            
            <motion.div 
              className="fixed inset-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              onAnimationComplete={() => {
                document.body.classList.add('chat-active');
              }}
            >
              {/* Semi-transparent backdrop */}
              <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md" 
                onClick={toggleChat}
                style={{ zIndex: 99999 }}
              ></div>
              
              {/* Chat container */}
              <motion.div 
                id="chat"
                className="absolute inset-0 flex items-center justify-center w-full h-full px-4"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{ zIndex: 100000 }}
              >
                <div className="w-full h-[100vh] max-w-5xl mx-auto overflow-hidden rounded-none md:rounded-2xl shadow-2xl">
                  <ChatInterface onClose={() => {
                    document.body.classList.remove('chat-active');
                    toggleChat();
                  }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* API Configuration Modal */}
        {showAPIConfig && (
          <motion.div 
            className="fixed inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            style={{ zIndex: 100001 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <APIConfig onKeysSet={handleKeysConfigured} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}