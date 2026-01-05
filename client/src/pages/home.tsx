import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/chat/chat-interface";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  // Minimax API Key is pre-configured via Vite/Env

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center pt-16">
      <div className="container max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          {!showChat && (
            <motion.div
              className="flex flex-col items-center justify-center min-h-[70vh]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
            >
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/40 border border-white/50 backdrop-blur-md shadow-sm text-foreground/80">
                  <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  <span className="text-sm font-medium">Private & Secure AI Therapy</span>
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-heading font-medium text-center text-foreground mb-8 leading-tight tracking-tight"
              >
                Find your <span className="text-primary italic">clarity</span> <br />
                in a safe space.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-center text-foreground/70 max-w-2xl mb-12 leading-relaxed"
              >
                A completely private space to express your thoughts. <br className="hidden md:block" />
                No tracking, no storage, just supportive conversation.
              </motion.p>

              <motion.div variants={itemVariants}>
                <Button
                  onClick={toggleChat}
                  className="rounded-full px-10 py-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  Start Conversation
                </Button>
              </motion.div>

              {/* Minimal Footer Features */}
              <motion.div
                variants={itemVariants}
                className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl"
              >
                {[
                  { title: "Zero Data Storage", desc: "Your chats disappear when you close the tab." },
                  { title: "Smart AI Routing", desc: "Adaptive responses for your emotional needs." },
                  { title: "Complete Privacy", desc: "No cookies, no accounts, no tracking." }
                ].map((feature, i) => (
                  <div key={i} className="text-center p-6 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors">
                    <h3 className="font-heading font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                    <p className="text-sm text-foreground/70">{feature.desc}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Interface - Glass Overlay */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-background/20 backdrop-blur-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleChat}
              />

              <div className="w-full h-full max-w-5xl relative z-10 glass-card overflow-hidden shadow-2xl flex flex-col">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-20 rounded-full bg-black/5 hover:bg-black/10"
                  onClick={toggleChat}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </Button>
                <ChatInterface onClose={toggleChat} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}