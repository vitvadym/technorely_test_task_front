import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePage = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = searchParams.get("limit") || 6;

  const handleChangePage = (page: number) => {
    setPage(page);
    setSearchParams({
      ...setSearchParams,
      skip: String((page - 1) * +limit),
      limit: String(limit),
    });
  };

  return {
    page,
    handleChangePage,
  };
};

export default usePage;
