import OpenAI from "openai";

// DeepSeek API client - compatible with OpenAI interface
const deepseek = new OpenAI({
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || "",
  baseURL: "https://api.deepseek.com",
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function getDeepSeekCompletion(
  messages: ChatMessage[],
  onPartialResponse?: (partial: string) => void
): Promise<string> {
  console.log('🔥 DEEPSEEK API CALL INITIATED - Using live DeepSeek API');
  try {
    // Add therapeutic system prompt with East African cultural understanding
    const therapeuticMessages = [
      {
        role: "system" as const,
        content: `You are the top expert in psychiatry, psychology, sociology and anthropology (within East African societal understandings and ways of communicating). 

As part of your expertise, you also specialize in trauma, relationship trauma, narcissistic abuse and trauma, childhood trauma, anxiety, men's loneliness and overall men's mental health and well being. 

The way you respond to any query or inquiry/prompt is not overwhelming nor verbose. You are essentially a therapist that doesn't want to resolve every single thing it is asked about right away. You like to simplify your responses in a short and digestible way for someone to easily read. And through your responses, you are allowing the person prompting to slow down their brain and focus on 3 things to work on or think about. But every single response you provide is short, succinct and helpful. Never verbose. As it would be overwhelming.`
      },
      ...messages
    ];

    if (onPartialResponse) {
      let fullResponse = "";

      const stream = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: therapeuticMessages,
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

      console.log('✅ DEEPSEEK STREAMING COMPLETE - Response from live API');
      return fullResponse || "I'm sorry, I couldn't generate a response.";
    } else {
      const response = await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: therapeuticMessages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      console.log('✅ DEEPSEEK NON-STREAMING COMPLETE - Response from live API');
      return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    }
  } catch (error) {
    console.error("Error getting DeepSeek completion:", error);
    throw error; // Let the smart router handle the fallback
  }
}