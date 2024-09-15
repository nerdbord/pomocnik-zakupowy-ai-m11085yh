import { Product } from "@/app/api/tools/findProductsWithBot";
import Image from "next/image";
import Link from "next/link";

type ToolResult = {
  url: string;
  title: string;
  image: string | null;
};

export const ToolResults = ({ results }: { results: Product[] }) => (
  <ul className="flex gap-3">
    {results.map(r => (
      <li key={r.url} className="flex items-center gap-2">
        <Link href={r.url} target="_blank" rel="noreferrer">
          <img
            src={r.image || ""}
            alt={r.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <h3 className="text-sm font-semibold">{r.title}</h3>
          <p>{r.price}</p>
        </Link>
      </li>
    ))}
  </ul>
);
