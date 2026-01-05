
export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

/**
 * Get completion from Minimax M2 model via Server Proxy
 * to resolve CORS issues.
 */
export async function getMinimaxCompletion(
    messages: ChatMessage[],
    onPartialResponse?: (partial: string) => void
): Promise<string> {
    try {
        console.log("🚀 Sending request to /api/chat Proxy...");

        // Send request to our own server
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
            throw new Error(`Server Proxy Error: ${response.statusText}`);
        }

        // Handle Streaming Response
        const reader = response.body?.getReader();
        if (!reader) {
            throw new Error("No response body available for streaming");
        }

        const decoder = new TextDecoder();
        let fullResponse = "";

        // Read the stream
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            if (chunk) {
                fullResponse += chunk;
                if (onPartialResponse) {
                    onPartialResponse(fullResponse);
                }
            }
        }

        return fullResponse || "I'm sorry, I couldn't generate a response.";

    } catch (error) {
        console.error("❌ Minimax Client Error:", error);
        return "I'm having trouble connecting to the service. Please try again later.";
    }
}
