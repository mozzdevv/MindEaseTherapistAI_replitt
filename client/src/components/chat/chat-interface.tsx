import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./message-item";
import { ChatMessage } from "@/lib/openai";
import { SmartAIRouter } from "@/lib/smart-ai-router";
import { AIIndicator } from "@/components/ai-indicator";
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
      content: "Hello, I'm MindEase. I'm here to provide a safe, confidential space for you to explore your thoughts and feelings. I'd like to understand what brings you here today.\n\nFeel free to share whatever is on your mind - whether it's something that's been troubling you, a feeling you're trying to make sense of, or simply something you'd like to talk about. There's no judgment here, only support and understanding.\n\n**What would you like to talk about today?**",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(true);
  const [currentAI, setCurrentAI] = useState<'claude' | 'deepseek' | null>(null);
  const [aiDecision, setAIDecision] = useState<{reason: string; confidence: number} | null>(null);
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
      console.warn('Cannot send message: input empty or already loading');
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
      // Add an empty assistant message that will be updated as the response streams in
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" }
      ]);

      // Prepare context and messages with East African cultural understanding
      const systemMessage: ChatMessage = {
        role: "system",
        content: "You are the top expert in psychiatry, psychology, sociology and anthropology (within East African societal understandings and ways of communicating). \n\nAs part of your expertise, you also specialize in trauma, relationship trauma, narcissistic abuse and trauma, childhood trauma, anxiety, men's loneliness and overall men's mental health and well being. \n\nThe way you respond to any query or inquiry/prompt is not overwhelming nor verbose. You are essentially a therapist that doesn't want to resolve every single thing it is asked about right away. You like to simplify your responses in a short and digestible way for someone to easily read. And through your responses, you are allowing the person prompting to slow down their brain and focus on 3 things to work on or think about. But every single response you provide is short, succinct and helpful. Never verbose. As it would be overwhelming."
      };

      const chatHistory = [...messages, userMessage].filter(msg => msg.role !== "system");

      // Handle streaming response with smart AI routing
      await SmartAIRouter.getSmartCompletion(
        [systemMessage, ...chatHistory],
        (partialResponse: string) => {
          // Update the assistant's message as new content arrives
          setMessages((prev) => {
            const newMessages = [...prev];
            // Update the last message (which is the assistant's response)
            if (newMessages.length > 0) {
              newMessages[newMessages.length - 1] = {
                role: "assistant",
                content: partialResponse
              };
            }
            return newMessages;
          });

          // Make sure we scroll to the latest content
          scrollToBottom();
        },
        (decision) => {
          // Update AI choice for display
          setCurrentAI(decision.chosenAI);
          setAIDecision({
            reason: decision.reason,
            confidence: decision.confidence
          });
        }
      );
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the empty assistant message if there was an error
      setMessages((prev) => prev.slice(0, -1));
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
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
    <div className="chat-container w-full h-full max-w-4xl mx-auto bg-background/95 rounded-none sm:rounded-3xl overflow-hidden transition-all backdrop-blur-md z-50">
      {/* Privacy Notice Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2 text-green-600" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <circle cx="12" cy="16" r="1"></circle>
              </svg>
              Zero-Storage Privacy Mode
            </DialogTitle>
            <DialogDescription>
              MindEase is designed with your privacy as the top priority. Here's how we protect your data:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4 text-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative mt-1 mr-3">
                <div className="absolute animate-ping h-5 w-5 rounded-full bg-green-500 opacity-10"></div>
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="font-medium text-sm"><strong>No server storage:</strong> Your conversation never reaches our servers. All processing happens in your browser.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative mt-1 mr-3">
                <div className="absolute animate-ping h-5 w-5 rounded-full bg-green-500 opacity-10"></div>
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="font-medium text-sm"><strong>Auto-deletion:</strong> All conversation data is automatically erased when you close this chat, refresh, or navigate away.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative mt-1 mr-3">
                <div className="absolute animate-ping h-5 w-5 rounded-full bg-green-500 opacity-10"></div>
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="font-medium text-sm"><strong>No cookies or tracking:</strong> We don't use cookies, local storage, or any other technology to track your conversations or activity.</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 relative mt-1 mr-3">
                <div className="absolute animate-ping h-5 w-5 rounded-full bg-green-500 opacity-10"></div>
                <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <p className="font-medium text-sm"><strong>No account needed:</strong> You can use MindEase without creating an account or providing any personal information.</p>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              className="flex items-center bg-green-600 hover:bg-green-700 text-white" 
              onClick={() => setShowPrivacyDialog(false)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2" 
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              I understand
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Header - Compact on mobile */}
      <div className="p-2 sm:p-6 bg-background/90 backdrop-blur-md border-b border-border/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full shadow-elevated bg-primary/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/5"></div>
              <div className="absolute inset-0 rounded-full animate-pulse-slow opacity-70"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-6 sm:w-6 text-primary relative z-10"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm sm:text-lg leading-tight text-foreground">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  <span className="hidden sm:inline">MindEase Therapeutic Chat</span>
                  <span className="sm:hidden">MindEase Chat</span>
                </span>
              </h3>
              <div className="flex items-center text-[10px] sm:text-xs text-primary/80 mt-0.5 sm:mt-1">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2 mr-1 sm:mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-secondary"></span>
                </span>
                <span className="font-medium">Private session active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* AI Indicator */}
            {currentAI && (
              <AIIndicator 
                currentAI={currentAI}
                confidence={aiDecision?.confidence}
                reason={aiDecision?.reason}
                className="hidden sm:flex"
              />
            )}
            <Button
              variant="outline"
              size="sm"
              className="inline-flex items-center justify-center p-2 rounded-full border-primary/50 text-slate-100 hover:bg-primary/15 h-7 sm:h-9 w-7 sm:w-9 bg-primary/10 shadow-sm"
              onClick={() => setShowPrivacyDialog(true)}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-3.5 w-3.5 sm:h-4 sm:w-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                <circle cx="12" cy="16" r="1"></circle>
              </svg>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-background/80 border-border/20 backdrop-blur-sm text-foreground/80 transition-all hover:bg-primary/10 hover:text-primary hover:scale-105"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5 text-slate-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex flex-col" style={{ height: "calc(100vh - 140px)" }}>
        <ScrollArea 
          ref={scrollAreaRef} 
          className="flex-1 px-3 sm:px-6 py-3 sm:py-5 space-y-4 sm:space-y-6"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        >
          {messages.map((message, index) => (
            <MessageItem 
              key={index} 
              message={message} 
              isLast={index === messages.length - 1}
              isStreaming={isLoading && index === messages.length - 1 && message.role === "assistant"}
            />
          ))}
        </ScrollArea>

        {/* Chat Input Area - Optimized for mobile */}
        <div className="px-2 sm:px-6 pt-2 sm:pt-4 pb-4 sm:pb-6 bg-background/95 backdrop-blur-md border-t border-border/10">
          <div className="relative">
            <div className="relative rounded-xl sm:rounded-2xl shadow-subtle overflow-hidden transition-all duration-200 group focus-within:shadow-elevated hover:shadow-elevated">
              <Textarea
                id="message-input"
                ref={textareaRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="chat-input pr-10 sm:pr-14 resize-none min-h-[48px] sm:min-h-[60px] max-h-[120px] sm:max-h-[200px] text-foreground text-sm sm:text-base border-0 focus:ring-0 !outline-none shadow-none transition-all duration-200 font-body"
                placeholder="Type your message..."
                rows={1}
              />
              <Button
                size="icon"
                disabled={isLoading || !input.trim()}
                className="premium-button w-8 h-8 sm:w-11 sm:h-11 absolute right-1 bottom-1 rounded-lg sm:rounded-2xl bg-primary text-white hover:bg-primary/90 transition-all duration-200 active:scale-95"
                onClick={handleSendMessage}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <div className="h-4 w-4 sm:h-5 sm:w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:rotate-12 transition-transform duration-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-2 sm:mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-secondary/10 text-secondary p-1 rounded-full mr-1 sm:mr-2.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <span className="hidden sm:inline text-xs font-medium text-foreground/70">
                Zero-storage privacy active — this conversation will be erased when closed
              </span>
              <span className="sm:hidden text-[10px] font-medium text-foreground/70">Private — data auto-erased</span>
            </div>

            <div>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 sm:h-8 px-2 sm:px-3 text-[10px] sm:text-xs font-medium border-destructive/20 text-destructive hover:bg-destructive/5 transition-colors duration-200"
                onClick={() => {
                  setMessages([{
                    role: "assistant",
                    content: "Hello, I'm MindEase. I'm here to provide a safe, confidential space for you to explore your thoughts and feelings. I'd like to understand what brings you here today.\n\nFeel free to share whatever is on your mind - whether it's something that's been troubling you, a feeling you're trying to make sense of, or simply something you'd like to talk about. There's no judgment here, only support and understanding.\n\n**What would you like to talk about today?**",
                  }]);
                  toast({
                    title: "Conversation deleted",
                    description: "Your conversation has been permanently erased",
                    variant: "default",
                  });
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5 mr-1 sm:mr-1.5" 
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                <span className="hidden sm:inline">Clear Conversation</span>
                <span className="sm:hidden">Clear</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}