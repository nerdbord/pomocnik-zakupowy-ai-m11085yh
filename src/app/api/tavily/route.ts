import { NextResponse } from "next/server";
import axios from "axios";

const TAVILY_API_URL = "https://api.tavily.com/search";
const API_KEY = process.env.NEXT_PUBLIC_TAVILY_API_KEY;

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const response = await axios.post(TAVILY_API_URL, {
      api_key: API_KEY,
      query: body.query,
      search_depth: body.search_depth || "basic",
      include_answer: body.include_answer || false,
      include_images: body.include_images || false,
      max_results: body.max_results || 5,
      include_domains: body.include_domains || [],
      exclude_domains: body.exclude_domains || [],
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error with Tavily API request:", error);
    return NextResponse.json(
      { error: error.message },
      { status: error.response?.status || 500 }
    );
  }
}
