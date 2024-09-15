import { openai } from "@ai-sdk/openai";
import { generateObject, TypeValidationError, JSONParseError } from "ai";
import { z } from "zod";

const productItemSchema = z.object({
  title: z.string(),
  url: z.string(),
  image: z.string().nullable(),
  price: z.number(),
});

const productsSchema = z.object({
  products: z.array(productItemSchema),
});

export type Product = z.infer<typeof productItemSchema>;
export type Products = z.infer<typeof productsSchema>;

export const findProductsLinksWithBot = async (
  productDescription: string,
): Promise<
  | { type: "success"; products: Products }
  | { type: "parse-error"; text: string }
  | { type: "validation-error"; value: unknown }
  | { type: "unknown-error"; error: unknown }
> => {
  const PROMPT = `Find the products links for the given product description: ${productDescription}. Make sure the links are relevant and accurate, the product is available for purchase what means it has button "Buy now", and the links are from reputable sources. When you find the links, provide the title, URL, image, and price for each product and generate message for user like: "Here are the products". If you can't find any products, please let the user know.`;

  try {
    const resp = await generateObject({
      model: openai("gpt-4o"),
      schema: productsSchema,
      prompt: PROMPT,
    });

    console.log("resp", resp.object);

    return { type: "success", products: resp.object };
  } catch (error) {
    if (TypeValidationError.isInstance(error)) {
      return { type: "validation-error", value: error.value };
    } else if (JSONParseError.isInstance(error)) {
      return { type: "parse-error", text: error.text };
    } else {
      return { type: "unknown-error", error };
    }
  }
};
