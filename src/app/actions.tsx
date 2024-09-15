"use server";

import { createStreamableValue } from "ai/rsc";
import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function continueConversation(messages: CoreMessage[]) {
  "use server";
  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system: "you are ai helper, speak in polish",
  });
  const data = { test: "hello" };
  const stream = createStreamableValue(result.textStream);
  return { message: stream.value, data };
}
