import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatMessage } from "@/lib/openai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MessageItemProps {
  message: ChatMessage;
  isLast?: boolean;
  isStreaming?: boolean;
}

export default function MessageItem({ message, isLast, isStreaming = false }: MessageItemProps) {
  const isUser = message.role === "user";
  const [isTyping, setIsTyping] = useState(!isUser && message.content === "");
  
  // Show typing indicator when the assistant message is empty or being streamed in
  useEffect(() => {
    if (!isUser) {
      if (message.content === "") {
        setIsTyping(true);
      } else if (isTyping && message.content.length > 0) {
        // Once we have content, give it a short delay before removing the typing indicator
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [message.content, isUser, isTyping]);

  // Helper function to format text with better spacing and structure
  const formatContentForDisplay = (content: string) => {
    // Add proper spacing between paragraphs if needed
    return content.trim();
  };

  // Animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div 
      className={`flex items-start ${isUser ? "flex-row-reverse" : ""} mb-8 group`}
      initial="hidden"
      animate="visible"
      variants={messageVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={`flex-shrink-0 ${isUser ? "ml-4" : "mr-4"} transition-transform group-hover:scale-105 duration-200`}>
        <Avatar className={`w-10 h-10 ${
          isUser 
            ? "bg-gradient-to-br from-primary/30 to-primary/20" 
            : "bg-gradient-to-br from-primary/20 to-primary/10"
          } shadow-elevated border-2 ${
            isUser ? "border-primary/30" : "border-primary/20"
          } transition-all duration-300 avatar-glow`}>
          <AvatarFallback className={`text-base flex items-center justify-center ${isUser ? "text-primary" : "text-primary"}`}>
            {isUser ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            )}
          </AvatarFallback>
        </Avatar>
      </div>

      <div
        className={`chat-message relative ${isUser ? "max-w-[85%] sm:max-w-md" : "max-w-[90%] sm:max-w-xl"} ${
          isUser
            ? "user-message" 
            : "assistant-message"
        }`}
      >
        <div className={`${isUser ? "px-3 sm:px-3.5 py-2 sm:py-2.5" : "px-3 sm:px-4 py-2.5 sm:py-3.5"}`}>
          {isUser ? (
            <p className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed text-foreground">{message.content}</p>
          ) : (
            <div className="markdown-content text-xs sm:text-sm text-foreground">
              {isTyping ? (
                <div className="flex items-center">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="ml-2 text-sm text-gray-500">Thinking...</div>
                </div>
              ) : (
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1" {...props} />,
                    ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1.5" {...props} />,
                    h1: ({node, ...props}) => <h1 className="text-lg font-medium mt-4 mb-2 text-primary/90" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-base font-medium mt-3 mb-2 text-primary/80" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-sm font-medium mt-3 mb-2 text-primary/70" {...props} />,
                    blockquote: ({node, ...props}) => (
                      <blockquote className="border-l-4 border-primary/30 bg-primary/5 pl-3 py-1 my-3 italic rounded-r" {...props} />
                    ),
                    code: ({node, className, ...props}: any) => {
                      const isInline = !className?.includes('language-');
                      return isInline 
                        ? <code className="bg-primary/10 px-1.5 py-0.5 rounded text-xs font-medium" {...props} />
                        : <code className="block bg-primary/10 p-3 rounded-md overflow-x-auto my-3 font-mono text-xs" {...props} />
                    },
                    strong: ({node, ...props}) => <strong className="font-semibold text-primary/90" {...props} />,
                  }}
                >
                  {formatContentForDisplay(message.content)}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>
        
        {/* Time indicator with better positioning */}
        <div 
          className={`text-[9px] font-medium tracking-wide uppercase
            ${isUser ? "text-white/70" : "text-foreground/50"}
            whitespace-nowrap mt-1 opacity-70 transition-opacity group-hover:opacity-100
            ${isUser ? "mr-2 text-right" : "ml-2"}`}
          style={{
            position: "absolute",
            bottom: "-16px",
            [isUser ? "right" : "left"]: "0"
          }}
        >
          Just now
        </div>
      </div>
    </motion.div>
  );
}
