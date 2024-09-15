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

const API_KEY = process.env.NEXT_PUBLIC_TAVILY_API_KEY;

function mapResults(response: ProductSearchResponse) {
  return response.results.map((result, index) => ({
    title: result.title,
    url: result.url,
    image: response.images[index] || null,
  }));
}

export const findProductsLinks = async (productDescription: string) => {
  try {
    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: API_KEY,
        query: `${productDescription}, prawdziwe linki do produktów`,
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

    return mapResults(data);
  } catch (error: any) {
    console.error(error);
  }
};
