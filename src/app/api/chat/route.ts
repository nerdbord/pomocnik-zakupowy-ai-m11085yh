import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages, StreamData, Message } from "ai";

// Ustawienie maksymalnego czasu na odpowiedź (stream)
export const maxDuration = 30;

// Typy dla wiadomości (user/assistant)
interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

// Funkcja generująca dynamiczne pytanie na podstawie dotychczasowej rozmowy
async function generateQuestion(
  conversation: ConversationMessage[]
): Promise<string> {
  const prompt = `
    Jesteś asystentem zakupowym AI. Na podstawie poniższej rozmowy wygeneruj kolejne pytanie, które pomoże zebrać więcej szczegółów na temat preferencji użytkownika dotyczących produktu:
    
    Rozmowa: ${conversation
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n")}
    
    Twoim celem jest zadanie jednego, jasnego i zwięzłego pytania, które pomoże użytkownikowi doprecyzować jego preferencje dotyczące produktu. Pytaj o kategorie, markę, funkcje, budżet lub inne szczegóły w zależności od tego, co użytkownik już wspomniał.
  `;

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: [
      {
        role: "system",
        content:
          "Jesteś pomocnym asystentem zakupowym AI, który zadaje pytania doprecyzowujące, aby znaleźć odpowiedni produkt dla użytkownika.",
      },
      { role: "user", content: prompt },
    ],
  });

  return (await result.text).trim();
}

export async function POST(req: Request): Promise<Response> {
  const { messages }: { messages: Message[] } = await req.json();

  const data = new StreamData();
  const coreMessages = convertToCoreMessages(messages);

  // Filtrowanie wiadomości, aby zostawić tylko te od użytkownika i asystenta
  const conversation: ConversationMessage[] = coreMessages
    .filter((msg) => msg.role === "user" || msg.role === "assistant")
    .map((msg) => ({
      role: msg.role as "user" | "assistant",
      // Rzutowanie `content` na string, zakładając, że inne formaty można spłaszczyć
      content: Array.isArray(msg.content)
        ? msg.content.map((part) => part.toString()).join(" ")
        : msg.content,
    }));

  // Wygenerowanie dynamicznego pytania na podstawie dotychczasowej rozmowy
  const nextQuestion = await generateQuestion(conversation);

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages: [...coreMessages, { role: "assistant", content: nextQuestion }],
    system:
      "Jesteś asystentem zakupowym, który zadaje odpowiednie pytania, aby znaleźć właściwy produkt dla użytkownika.",
    onFinish() {
      data.close();
    },
  });

  return result.toDataStreamResponse({ data });
}
