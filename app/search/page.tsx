"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const Search = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const searchResults = useQuery(api.events.search, { searchTerm: query });

  return <div>search</div>;
};

export default Search;
