import { openai } from "@ai-sdk/openai";
import { generateObject, TypeValidationError, JSONParseError } from "ai";
import { z } from "zod";

const productItemSchema = z.object({
  title: z.string(),
  url: z.string(),
  image: z.string(),
  price: z.string(),
  currency: z.string(),
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
  const PROMPT = `Jesteś asystentem sklepowym. Dostaniesz opis tego czego szuka i potrzebuje uzytkownik. Opis: ${productDescription}. Proszę abyś znalazł linki do stron z produktami spełniającymi opis podany przez użytkownika. Gdyby opis był nie wystarczający, masz dopytać użytkownika aby uzyskać więcej informacji. Linki mają być prawdziwe, to znaczy prowadzić do stron z rzeczywistymi produktami, które można zakupić (np. allegro.pl itp.).`;

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
