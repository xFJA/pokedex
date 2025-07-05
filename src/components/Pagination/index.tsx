import { useMemo } from 'react';
import { PaginationButton } from './PaginationButton';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}: PaginationProps) {
  const pageNumbers = useMemo(() => {
    const totalPageNumbers = siblingCount * 2 + 3; // siblings + current + first + last

    // Case 1: If the number of pages is less than the page numbers we want to show
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    // Don't show dots when there's just one page number to be inserted
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    // Case 2: No left dots to show, but right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 1 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);

      return [...leftRange, 'dots', totalPages];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );

      return [1, 'dots', ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );

      return [1, 'dots', ...middleRange, 'dots', totalPages];
    }

    return [];
  }, [totalPages, currentPage, siblingCount]);

  const canGoToPreviousPage = currentPage > 1;
  const canGoToNextPage = currentPage < totalPages;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const goToNextPage = () => {
    if (canGoToNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (canGoToPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    onPageChange(1);
  };

  const goToLastPage = () => {
    onPageChange(totalPages);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className={`flex items-center justify-center space-x-1 ${className}`}
      aria-label="Pagination"
    >
      {/* First page button */}
      <PaginationButton
        onClick={goToFirstPage}
        disabled={!canGoToPreviousPage}
        ariaLabel="Go to first page"
      >
        <span className="sr-only">First</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </PaginationButton>

      {/* Previous page button */}
      <PaginationButton
        onClick={goToPreviousPage}
        disabled={!canGoToPreviousPage}
        ariaLabel="Go to previous page"
      >
        <span className="sr-only">Previous</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </PaginationButton>

      {/* Page numbers */}
      <div className="hidden sm:flex space-x-1">
        {pageNumbers.map((pageNumber, index) =>
          pageNumber === 'dots' ? (
            <span
              key={`dots-${index}`}
              className="px-3 py-1 text-gray-500 select-none"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <PaginationButton
              key={pageNumber}
              onClick={() => goToPage(Number(pageNumber))}
              disabled={Number(pageNumber) === currentPage}
              ariaLabel={`Page ${pageNumber}`}
              isActive={Number(pageNumber) === currentPage}
            >
              {pageNumber}
            </PaginationButton>
          ),
        )}
      </div>

      {/* Current page indicator for mobile */}
      <span className="sm:hidden text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next page button */}
      <PaginationButton
        onClick={goToNextPage}
        disabled={!canGoToNextPage}
        ariaLabel="Go to next page"
      >
        <span className="sr-only">Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </PaginationButton>

      {/* Last page button */}
      <PaginationButton
        onClick={goToLastPage}
        disabled={!canGoToNextPage}
        ariaLabel="Go to last page"
      >
        <span className="sr-only">Last</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 15.707a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L8.586 10 4.293 14.293a1 1 0 000 1.414zm6 0a1 1 0 001.414 0l5-5a1 1 0 000-1.414l-5-5a1 1 0 00-1.414 1.414L15.586 10l-4.293 4.293a1 1 0 000 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </PaginationButton>
    </nav>
  );
}

export default Pagination;
