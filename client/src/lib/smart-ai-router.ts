import { getMinimaxCompletion, ChatMessage } from './minimax';

// Re-export models for compatibility
export type { ChatMessage };

interface AIDecision {
  chosenAI: 'minimax';
  reason: string;
  confidence: number;
}

/**
 * Simplified AI router that now exclusively uses Minimax M2
 * Keeping the class structure for minimal code changes in consuming components
 */
export class SmartAIRouter {
  /**
   * Get AI completion using Minimax
   */
  static async getSmartCompletion(
    messages: ChatMessage[],
    onPartialResponse?: (partial: string) => void,
    onAIChoice?: (decision: AIDecision) => void
  ): Promise<string> {

    // Notify "decision" (now always Minimax)
    onAIChoice?.({
      chosenAI: 'minimax',
      reason: 'Using Minimax M2 Model',
      confidence: 1.0
    });

    try {
      console.log(`🤖 Using Minimax M2 for therapeutic support`);
      return await getMinimaxCompletion(messages, onPartialResponse);
    } catch (error) {
      console.error('Minimax API failed:', error);
      return "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
    }
  }

  // Deprecated/Stub for compatibility
  static analyzeMessageForAI(message: string): AIDecision {
    return { chosenAI: 'minimax', reason: 'Defaulting to Minimax', confidence: 1.0 };
  }
}

/**
 * Main export - use this for all AI completions
 */
export async function getChatCompletion(
  messages: ChatMessage[],
  onPartialResponse?: (partial: string) => void
): Promise<string> {
  return SmartAIRouter.getSmartCompletion(messages, onPartialResponse);
}