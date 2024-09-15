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

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    system:
      "Jesteś asystentem sklepowym. Będziesz pomagał użytkownikowi w znalezieniu odpowiedniego produktu dla niego w internecie. Najpierw wypytaj użytkownika o szczegóły dotyczące produktu (np. marka, rozmiar, kolor, cenę, itp.), a następnie znajdź dla niego produkty na podstawie podanych informacji. Proszę, bądź bardzo konkretny.",
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
