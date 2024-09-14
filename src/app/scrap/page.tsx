"use client";
import React, { useState } from "react";

const Scrap = () => {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/firecrawl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error("Failed to scrape the website");
      }

      const result = await response.json();
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Scrape a Website</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL to scrape"
      />
      <button onClick={handleScrape} disabled={loading}>
        Scrape Website
      </button>

      {loading && <p>Scraping...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>Scrape Results:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Scrap;
