import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./message-item";
import { ChatMessage } from "@/lib/openai";
import { SmartAIRouter } from "@/lib/smart-ai-router";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ChatInterfaceProps {
  onClose: () => void;
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello. I'm MindEase. I'm here to provide a safe, confidential space for you to explore your feelings.\n\nTake a deep breath. There is no judgment here, only support.\n\n**What's on your mind today?**",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current;
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" }
      ]);

      const systemMessage: ChatMessage = {
        role: "system",
        content: "You are a warm, empathetic, and professional therapeutic AI companion adhering to East African cultural understandings. Your tone is calm, soothing, and supportive. Keep responses concise (under 3 paragraphs) and focused on helping the user process emotions. Avoid solving problems immediately; instead, guide the user to reflect. Prioritize safety and validate feelings first."
      };

      const chatHistory = [...messages, userMessage].filter(msg => msg.role !== "system");

      await SmartAIRouter.getSmartCompletion(
        [systemMessage, ...chatHistory],
        (partialResponse: string) => {
          setMessages((prev) => {
            const newMessages = [...prev];
            if (newMessages.length > 0) {
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                content: partialResponse
              };
            }
            return newMessages;
          });
          scrollToBottom();
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.slice(0, -1));
      toast({
        title: "Connection paused",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-transparent relative">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-border/10 bg-white/40 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
          </div>
          <div>
            <h2 className="text-lg font-heading font-medium text-foreground">MindEase Session</h2>
            <div className="flex items-center text-xs text-foreground/60">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 pulse"></span>
              Secure Connection
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setMessages([])} className="text-foreground/60 hover:text-destructive hover:bg-destructive/10">
            Clear
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 py-6 md:px-8">
        <div className="max-w-3xl mx-auto space-y-6 pb-4">
          {messages.map((message, index) => (
            <MessageItem
              key={index}
              message={message}
              isLast={index === messages.length - 1}
              isStreaming={isLoading && index === messages.length - 1 && message.role === "assistant"}
            />
          ))}
          {isLoading && !messages[messages.length - 1].content && (
            <div className="flex items-center justify-center p-4">
              <span className="loading loading-dots loading-sm text-primary"></span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="flex-none p-4 md:p-6 bg-white/30 backdrop-blur-md border-t border-border/10">
        <div className="max-w-3xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-md transition-opacity opacity-0 group-hover:opacity-100"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-lg border border-white/50 flex items-end p-2 transition-shadow focus-within:shadow-xl hover:shadow-xl">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Share your thoughts..."
              className="flex-1 min-h-[50px] max-h-[150px] bg-transparent border-0 focus-visible:ring-0 resize-none py-3 px-4 text-base font-body text-foreground placeholder:text-foreground/40 leading-relaxed"
              rows={1}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`rounded-full h-10 w-10 mb-1 mr-1 transition-all duration-300 ${input.trim()
                ? 'bg-primary text-primary-foreground shadow-md hover:scale-105'
                : 'bg-primary/20 text-primary/40'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
            </Button>
          </div>
          <div className="text-center mt-3 text-[10px] text-foreground/40 font-medium tracking-wide uppercase">
            Start typing to chat
          </div>
        </div>
      </div>
    </div>
  );
}