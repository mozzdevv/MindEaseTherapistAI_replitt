import { getClaudeCompletion } from './claude';
import { getDeepSeekCompletion } from './deepseek';

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface AIDecision {
  chosenAI: 'claude' | 'deepseek';
  reason: string;
  confidence: number;
}

/**
 * Intelligent AI router that analyzes user messages and chooses the best AI model
 * Based on therapeutic needs and message content analysis
 */
export class SmartAIRouter {
  private static analyzeMessage(message: string): AIDecision {
    const lowerMessage = message.toLowerCase();
    
    // Claude excels at: complex emotional processing, trauma, philosophical questions
    const claudeIndicators = [
      'trauma', 'abuse', 'complex', 'philosophy', 'meaning', 'existential',
      'grief', 'loss', 'death', 'guilt', 'shame', 'identity', 'values',
      'deep', 'profound', 'spiritual', 'overwhelming', 'complicated',
      'conflicted', 'nuanced', 'ambiguous', 'struggling with who',
      'don\'t know who i am', 'purpose', 'why am i here'
    ];

    // DeepSeek excels at: practical advice, CBT techniques, structured approaches
    const deepseekIndicators = [
      'anxiety', 'panic', 'stress', 'worried', 'technique', 'strategy',
      'practical', 'help me', 'what should i do', 'how can i',
      'coping', 'manage', 'control', 'organize', 'routine', 'habit',
      'depression', 'sad', 'motivation', 'energy', 'sleep', 'appetite',
      'work', 'school', 'relationship', 'social', 'communication',
      'angry', 'frustrated', 'overwhelmed', 'specific problem'
    ];

    let claudeScore = 0;
    let deepseekScore = 0;

    // Count indicators
    claudeIndicators.forEach(indicator => {
      if (lowerMessage.includes(indicator)) claudeScore++;
    });

    deepseekIndicators.forEach(indicator => {
      if (lowerMessage.includes(indicator)) deepseekScore++;
    });

    // Additional scoring based on message characteristics
    if (message.length > 200) claudeScore += 1; // Claude better for longer, complex messages
    if (message.includes('?') && message.split('?').length > 2) deepseekScore += 1; // DeepSeek good for direct questions
    if (lowerMessage.includes('feel') || lowerMessage.includes('feeling')) claudeScore += 0.5;
    if (lowerMessage.includes('think') || lowerMessage.includes('should')) deepseekScore += 0.5;

    // Decision logic
    if (claudeScore > deepseekScore) {
      return {
        chosenAI: 'claude',
        reason: 'Message indicates complex emotional processing or philosophical inquiry',
        confidence: Math.min(0.9, 0.6 + (claudeScore - deepseekScore) * 0.1)
      };
    } else if (deepseekScore > claudeScore) {
      return {
        chosenAI: 'deepseek',
        reason: 'Message indicates need for practical advice or structured support',
        confidence: Math.min(0.9, 0.6 + (deepseekScore - claudeScore) * 0.1)
      };
    } else {
      // Default to alternating or based on message characteristics
      if (message.length > 150) {
        return {
          chosenAI: 'claude',
          reason: 'Longer message suggesting complex emotional content',
          confidence: 0.6
        };
      } else {
        return {
          chosenAI: 'deepseek',
          reason: 'Shorter message suggesting practical question',
          confidence: 0.6
        };
      }
    }
  }

  /**
   * Get AI completion using intelligent routing
   */
  static async getSmartCompletion(
    messages: ChatMessage[],
    onPartialResponse?: (partial: string) => void,
    onAIChoice?: (decision: AIDecision) => void
  ): Promise<string> {
    // Check if we have valid API keys - Claude disabled, only use DeepSeek
    const hasClaudeKey = false; // Disabled per user request
    const hasDeepSeekKey = Boolean(import.meta.env.VITE_DEEPSEEK_API_KEY);
    
    console.log('🔍 API Key Status:', {
      hasDeepSeekKey,
      keyLength: import.meta.env.VITE_DEEPSEEK_API_KEY?.length || 0
    });
    
    // If no API keys are available or all are invalid, use built-in response
    if (!hasDeepSeekKey) {
      console.log('🤖 No DeepSeek API key available, using built-in therapeutic responses');
      return this.getBuiltInTherapeuticResponse(messages, onPartialResponse);
    }
    
    try {
      // Analyze the latest user message to determine best AI
      const userMessages = messages.filter(msg => msg.role === 'user');
      const latestMessage = userMessages[userMessages.length - 1]?.content || '';
      
      let decision = this.analyzeMessage(latestMessage);
      
      // Force DeepSeek usage since Claude is disabled
      decision = { chosenAI: 'deepseek', reason: 'Using DeepSeek for therapeutic support', confidence: 0.9 };
      
      // Final check - if DeepSeek key not available, use built-in
      if (!hasDeepSeekKey) {
        console.log('🤖 DeepSeek not available, using built-in therapeutic responses');
        return this.getBuiltInTherapeuticResponse(messages, onPartialResponse);
      }
      
      // Notify about AI choice if callback provided
      onAIChoice?.(decision);

      console.log(`🤖 Smart Router Decision: Using ${decision.chosenAI.toUpperCase()} (confidence: ${Math.round(decision.confidence * 100)}%) - ${decision.reason}`);

      // Add timeout to prevent long waits
      const timeoutPromise = new Promise<string>((_, reject) => 
        setTimeout(() => reject(new Error('AI request timeout')), 15000)
      );

      // Try DeepSeek only (Claude disabled)
      try {
        console.log(`🤖 Using DeepSeek for therapeutic support`);
        const aiPromise = getDeepSeekCompletion(messages, onPartialResponse);
        return await Promise.race([aiPromise, timeoutPromise]);
      } catch (deepseekError) {
        console.error('DeepSeek API failed, using built-in response:', deepseekError);
        return this.getBuiltInTherapeuticResponse(messages, onPartialResponse);
      }
    } catch (error) {
      console.error('Smart AI Router error, using built-in response:', error);
      return this.getBuiltInTherapeuticResponse(messages, onPartialResponse);
    }
  }

  /**
   * Built-in therapeutic response when AI services are unavailable
   */
  private static async getBuiltInTherapeuticResponse(
    messages: ChatMessage[],
    onPartialResponse?: (partial: string) => void
  ): Promise<string> {
    console.warn('⚠️ FALLBACK RESPONSE USED - This should NOT happen with valid DeepSeek API key!');
    const userMessages = messages.filter(msg => msg.role === 'user');
    const latestMessage = userMessages[userMessages.length - 1]?.content || '';
    
    // Generate a therapeutic response based on message content
    let response = "";
    
    if (latestMessage.toLowerCase().includes('anxiety') || latestMessage.toLowerCase().includes('panic')) {
      response = `I hear you're feeling anxious. Let's slow this down.

**3 things to focus on:**
1. **Breathe slowly** - 4 counts in, 6 counts out
2. **Ground yourself** - name 3 things you can see right now  
3. **One small step** - what's one tiny thing you can do for yourself today?

What feels possible right now?`;
    } else if (latestMessage.toLowerCase().includes('sad') || latestMessage.toLowerCase().includes('depression')) {
      response = `I see you're carrying sadness. That's heavy.

**3 things to remember:**
1. **This feeling will shift** - even if it doesn't feel that way
2. **Small counts** - getting through today is enough
3. **You're not alone** - reaching out shows strength

What's one small way you're caring for yourself today?`;
    } else {
      response = `I hear you. What you're sharing takes courage.

**3 things to hold onto:**
1. **Your feelings are valid** - no matter what they are
2. **One moment at a time** - that's all we need to manage
3. **You matter** - your wellbeing is important

What feels most needed right now - someone to listen, practical help, or time to think?`;
    }

    // Simulate streaming if callback provided
    if (onPartialResponse) {
      return new Promise<string>((resolve, reject) => {
        let current = '';
        let charIndex = 0;
        let timeoutId: NodeJS.Timeout;
        
        // Safety timeout to prevent infinite loops
        const safetyTimeout = setTimeout(() => {
          console.warn('Streaming response timed out, resolving with current content');
          resolve(current || response);
        }, 30000); // 30 second safety timeout
        
        // Start with empty response
        onPartialResponse('');
        
        // Type character by character for smooth effect
        const typeCharacter = () => {
          // Safety check to prevent infinite loops
          if (charIndex >= response.length) {
            clearTimeout(safetyTimeout);
            resolve(response);
            return;
          }
          
          current += response[charIndex];
          onPartialResponse(current);
          charIndex++;
          
          // Check if we've finished typing
          if (charIndex >= response.length) {
            clearTimeout(safetyTimeout);
            resolve(response);
            return;
          }
          
          // Variable delay to simulate natural typing
          let delay = 30; // Base delay
          
          // Longer pauses after punctuation
          if (response[charIndex - 1] === '.' || response[charIndex - 1] === '!' || response[charIndex - 1] === '?') {
            delay = 300;
          } else if (response[charIndex - 1] === ',' || response[charIndex - 1] === ':') {
            delay = 150;
          } else if (response[charIndex - 1] === ' ') {
            delay = 50;
          } else {
            delay = 20 + Math.random() * 20; // 20-40ms per character
          }
          
          timeoutId = setTimeout(typeCharacter, delay);
        };
        
        // Start typing after a brief pause
        setTimeout(typeCharacter, 500);
      });
    }

    return Promise.resolve(response);
  }

  /**
   * Get analysis of which AI would be best for a message (for debugging/transparency)
   */
  static analyzeMessageForAI(message: string): AIDecision {
    return this.analyzeMessage(message);
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