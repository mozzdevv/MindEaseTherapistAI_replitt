// Re-export from smart AI router for backward compatibility
export { getChatCompletion } from './smart-ai-router';
import { SmartAIRouter } from './smart-ai-router';
import OpenAI from "openai";

// This is a client-side only implementation - API calls are made directly from the browser
// This ensures privacy as we don't need to send messages through a server
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  dangerouslyAllowBrowser: true // Required for client-side usage
});

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// Legacy OpenAI-only function (kept for compatibility)
export async function getOpenAICompletion(
  messages: ChatMessage[],
  onPartialResponse?: (partial: string) => void
): Promise<string> {
  try {
    // If streaming is enabled (onPartialResponse is provided)
    if (onPartialResponse) {
      let fullResponse = "";

      const stream = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          onPartialResponse(fullResponse);
        }
      }

      return fullResponse || "I'm sorry, I couldn't generate a response.";
    } 
    // If streaming is not enabled, use the standard approach
    else {
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error getting chat completion:", error);
    return "I'm having trouble connecting to my knowledge base. Please try again in a moment.";
  }
}

export async function mentalHealthAnalysis(text: string): Promise<{
  sentiment: string;
  suggestions: string[];
  reflection: string;
  deeperQuestions: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: "You are the world's best therapist and psychiatrist. Your expertise lies in deeply understanding emotions and guiding people to insight. Analyze the user's text with the precision of a skilled therapist. Identify underlying emotions beyond the surface. Generate thoughtful reflections and insightful questions that would help the person explore deeper. Return JSON with: 1) 'sentiment' (brief emotional tone); 2) 'suggestions' (3-4 gentle, non-directive guidance points); 3) 'reflection' (thoughtful validation that mirrors their experience in a new light); 4) 'deeperQuestions' (3-4 open-ended, non-judgmental questions a skilled therapist would ask to facilitate deeper self-exploration)."
        },
        {
          role: "user",
          content: text
        }
      ],
      response_format: { type: "json_object" },
    });

    const jsonResponse = JSON.parse(response.choices[0].message.content || "{}");
    return {
      sentiment: jsonResponse.sentiment || "neutral",
      suggestions: jsonResponse.suggestions || ["Take a deep breath", "Consider reflecting on the underlying feelings", "Remember that all emotions are valid"],
      reflection: jsonResponse.reflection || "It sounds like there's a lot happening beneath the surface of these feelings. Your experience is unique and valid.",
      deeperQuestions: jsonResponse.deeperQuestions || ["What do you think these feelings might be telling you?", "How has this experience shaped your view of yourself?", "When did you first notice these feelings emerging?"]
    };
  } catch (error) {
    console.error("Error analyzing mental health text:", error);
    return {
      sentiment: "neutral",
      suggestions: ["Take a deep breath", "Consider journaling about your feelings", "Remember that all emotions contain valuable information"],
      reflection: "Your experiences and emotions are worthy of exploration and understanding.",
      deeperQuestions: ["What might these feelings be trying to tell you?", "How do these emotions connect to your core values?", "When you sit with this feeling, what else emerges?"]
    };
  }
}
