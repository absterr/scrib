import { db } from "@/db/drizzle";
import { noteEmbedding } from "@/db/schema/note-schema";
import { Document } from "@langchain/core/documents";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { UIMessage } from "ai";
import { sql } from "drizzle-orm";
import { formatDocumentsAsString } from "langchain/util/document";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  const messageHistory = messages.slice(0, -1).map((message) => {
    const text = message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ");

    return message.role === "user"
      ? new HumanMessage(text)
      : new AIMessage(text);
  });
  const latestMessage =
    messages[messages.length - 1]?.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ") ?? "";

  if (!latestMessage) {
    return NextResponse.json(
      { error: "User message is not provided" },
      { status: 400 }
    );
  }

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });
  const [queryEmbedding] = await embeddings.embedDocuments([latestMessage]);
  const vectorString = `[${queryEmbedding.join(",")}]`;

  const results = await db
    .select({
      id: noteEmbedding.id,
      noteId: noteEmbedding.noteId,
      content: noteEmbedding.content,
      metadata: noteEmbedding.metadata,
      score:
        sql<number>`1-(${noteEmbedding.embedding} <=> ${sql`${vectorString}::vector`})`.as(
          "score"
        ),
    })
    .from(noteEmbedding)
    .orderBy(
      sql`${noteEmbedding.embedding} <=> ${sql`${vectorString}::vector`}`
    )
    .limit(5);

  const docs = results.map(
    (result) =>
      new Document({
        pageContent: result.content,
        metadata: {
          ...result.metadata,
          score: result.score,
          noteId: result.noteId,
        },
      })
  );
  const context = formatDocumentsAsString(docs);

  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-3.5-turbo",
    temperature: 0,
    streaming: true,
  });

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      `You are an intelligent AI assistant for a Document/Note-taking application.
       You have access to the user's notes.
       Always try to answer using the user's notes first. If insufficient, augment with your general knowledge.
       Provide concise, helpful and accurate responses. Do not fabricate anything.`,
    ],
    ...messageHistory,
    [
      "system",
      "Here are the relevant note retrieved from the database:\n{context}",
    ],
    ["user", "{question}"],
  ]);

  const chain = prompt.pipe(model);
  const stream = await chain.stream({
    context,
    question: latestMessage,
  });

  return new NextResponse(stream, {
    headers: { "Content-Type": "text/event-stream" },
  });
}
