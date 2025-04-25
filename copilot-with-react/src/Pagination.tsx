import React, { useState } from "react";

type PaginationProps = {
  totalPages: number;
  initialPage?: number;
  onPageChange?: (page: number) => void;
};

/**
 * Pagination component for navigating through pages.
 *
 * @component
 * @example
 * ```tsx
 * <Pagination
 *   totalPages={10}
 *   initialPage={1}
 *   onPageChange={(page) => console.log(`Navigating to page ${page}`)}
 * />
 * ```
 *
 * @param totalPages - The total number of pages.
 * @param initialPage - The initial page to display (default: 1).
 * @param onPageChange - Callback function triggered when a page is changed.
 */
const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  initialPage = 1,
  onPageChange,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      if (onPageChange) {
        onPageChange(page);
      }
    }
  };

  return (
    <div>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      <span>Page </span>
      <select
        value={currentPage}
        onChange={(e) => goToPage(Number(e.target.value))}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
      <span> of {totalPages}</span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
