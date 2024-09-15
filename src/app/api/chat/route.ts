import { findProductsLinks } from "@/app/api/tools/findProductsLinks";
import { findProductsLinksWithBot } from "@/app/api/tools/findProductsWithBot";
import { openai } from "@ai-sdk/openai";
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
    model: openai("gpt-4o"),
    system:
      "You are a shop assistant. You are helping a customer find a product. The customer will ask you for help. Firstly you need to ask the customer about the right product (e.g. firm, size, color, budget) and then you need to find the products for the customer based on the information provided. Please, be super specific.",
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
            // const resp = await findProductsLinks(productDescription);
            const resp = await findProductsLinksWithBot(productDescription);

            console.dir(resp, { depth: 999 });

            if (resp.type === "success") {
              return resp.products;
            } else {
              throw new Error("Failed to find products");
            }
          } catch (error) {
            console.error(error);
          }
        },
      }),
    },
    maxSteps: 2,
  });

  return result.toDataStreamResponse();
}
