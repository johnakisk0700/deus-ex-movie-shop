import { useState } from "react";

// always splits them to 20 / 1 for now
export const usePagination = (pageSize?: number) => {
  const [page, setPage] = useState(1);
  const [page_size, setPage_Size] = useState(pageSize || 12);
  return { page, setPage, page_size, setPage_Size };
};
