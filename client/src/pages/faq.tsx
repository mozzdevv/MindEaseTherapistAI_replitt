import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "How does MindEase protect my privacy?",
      answer:
        "MindEase uses a zero-knowledge architecture, meaning your conversations happen entirely in your browser and are never sent to or stored on our servers. We don't use cookies, local storage, or any other persistence mechanisms. When you close or refresh the page, all conversation data is completely erased. We don't require account creation or collect any personal information.",
    },
    {
      question: "Is my conversation with the AI assistant really private?",
      answer:
        "Yes. All processing happens locally in your browser. We use a lightweight AI model that runs entirely client-side, so your messages never leave your device. The conversation is not logged, recorded, or transmitted to any external servers. For complete transparency, our code is open-source so you can verify these privacy claims.",
    },
    {
      question: "Does MindEase collect any data at all?",
      answer:
        "MindEase collects absolutely no personal data. We don't use analytics tools, tracking pixels, or any other monitoring mechanisms. The only data transmitted is the initial download of the application code and AI model to your browser. We don't even know how many people use the application or how they use it, and we prefer it that way to ensure maximum privacy.",
    },
    {
      question: "Can MindEase provide medical advice?",
      answer:
        "No. MindEase is not a substitute for professional medical or mental health care. The AI assistant can help you process thoughts and feelings, but cannot diagnose conditions, prescribe treatment, or provide emergency services. If you need medical attention or are experiencing a mental health crisis, please contact a qualified healthcare provider or use one of the crisis resources listed in our Resources section.",
    },
    {
      question: "How can I verify MindEase's privacy claims?",
      answer:
        "Our code is completely open-source and available for review on GitHub. You can examine it to verify our privacy practices. Additionally, you can use your browser's developer tools to monitor network traffic while using MindEase - you'll see that no conversation data is ever transmitted from your device. We're committed to transparency and welcome security researchers to audit our application.",
    },
    {
      question: "Can I save or continue a conversation later?",
      answer:
        "No. Due to our strict privacy design, conversations cannot be saved or resumed. When you close or refresh the page, all conversation data is permanently erased. While this means you can't continue past conversations, it ensures complete privacy and confidentiality. If you need to reference something important from your conversation, you would need to manually copy it elsewhere before closing MindEase.",
    },
  ];

  return (
    <section id="faq" className="py-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-4">
            Privacy FAQ
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your privacy is our top priority. Learn more about how MindEase works to protect your
            conversations and personal information.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 py-4 text-left text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
