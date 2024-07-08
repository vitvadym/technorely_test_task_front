import { useSearchParams } from "react-router-dom";

const SearchResult = () => {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  console.log(searchQuery);

  return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"></div>;
};

export default SearchResult;
