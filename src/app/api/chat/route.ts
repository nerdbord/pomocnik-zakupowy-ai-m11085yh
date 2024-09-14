﻿import { openai } from "@ai-sdk/openai";
import { streamText, CoreMessage, tool } from "ai";
import { z } from "zod";

type ProductSearchResult = {
  title: string;
  url: string;
  content: string;
  score: number;
  raw_content: string | null;
};

type ProductSearchResponse = {
  query: string;
  follow_up_questions: string | null;
  answer: string | null;
  images: string[];
  results: ProductSearchResult[];
};

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const API_KEY = process.env.NEXT_PUBLIC_TAVILY_API_KEY;

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    system:
      "You are a shop assistant. You are helping a customer find a product. The customer will ask you for help. Firstly you need to ask the customer about the right product and then you need to find the products for the customer based on the information provided. Please, be super specific.",
    messages: messages,
    tools: {
      findRightProducts: tool({
        description: "A tool for finding the right products",
        parameters: z.object({
          productDescription: z
            .string()
            .describe("The description of the searching product"),
        }),
        execute: async ({ productDescription }) => {
          try {
            const response = await fetch("https://api.tavily.com/search", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                api_key: API_KEY,
                query: productDescription,
                search_depth: "basic",
                include_answer: false,
                include_images: true,
                include_raw_content: false,
                max_results: 3,
                include_domains: [],
                exclude_domains: [],
              }),
            });

            if (!response.ok) {
              throw new Error("Failed to fetch");
            }

            const data: ProductSearchResponse = await response.json();

            return data.results.map(r => ({ url: r.url, title: r.title }));
          } catch (error: any) {
            console.error(error);
          }
        },
      }),
    },
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
