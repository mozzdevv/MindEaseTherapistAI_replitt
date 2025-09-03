import { Brain, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIIndicatorProps {
  currentAI: 'claude' | 'deepseek' | null;
  confidence?: number;
  reason?: string;
  className?: string;
}

export function AIIndicator({ currentAI, confidence, reason, className }: AIIndicatorProps) {
  if (!currentAI) return null;

  const isDeepSeek = currentAI === 'deepseek';
  const confidencePercent = confidence ? Math.round(confidence * 100) : 0;

  return (
    <div className={cn(
      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
      isDeepSeek 
        ? "bg-blue-50 text-blue-700 border border-blue-200" 
        : "bg-purple-50 text-purple-700 border border-purple-200",
      className
    )}>
      {isDeepSeek ? (
        <Zap className="w-3 h-3" />
      ) : (
        <Brain className="w-3 h-3" />
      )}
      
      <span className="font-semibold">
        {isDeepSeek ? 'DeepSeek' : 'Claude'}
      </span>
      
      {confidence && (
        <span className="opacity-75">
          {confidencePercent}%
        </span>
      )}
      
      {reason && (
        <span className="hidden sm:inline opacity-60 max-w-32 truncate" title={reason}>
          • {reason}
        </span>
      )}
    </div>
  );
}