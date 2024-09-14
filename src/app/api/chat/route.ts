import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  console.log(messages);

  const msg = [{ role: "system", content: "How can I help you?" }, ...messages];

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages: convertToCoreMessages(msg),
  });

  return result.toDataStreamResponse();
}
