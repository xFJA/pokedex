import { useMemo } from 'react';
import { PaginationButton } from './PaginationButton';
import ChevronDoubleLeftIcon from '@assets/icons/chevron-double-left.svg?react';
import ChevronDoubleRightIcon from '@assets/icons/chevron-double-right.svg?react';
import ChevronLeftIcon from '@assets/icons/chevron-left.svg?react';
import ChevronRightIcon from '@assets/icons/chevron-right.svg?react';

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
      <PaginationButton
        onClick={goToFirstPage}
        disabled={!canGoToPreviousPage}
        ariaLabel="Go to first page"
      >
        <span className="sr-only">First</span>
        <ChevronDoubleLeftIcon className="h-6 w-6" />
      </PaginationButton>

      <PaginationButton
        onClick={goToPreviousPage}
        disabled={!canGoToPreviousPage}
        ariaLabel="Go to previous page"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-6 w-6" />
      </PaginationButton>

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

      <span className="sm:hidden text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <PaginationButton
        onClick={goToNextPage}
        disabled={!canGoToNextPage}
        ariaLabel="Go to next page"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="h-6 w-6" />
      </PaginationButton>

      <PaginationButton
        onClick={goToLastPage}
        disabled={!canGoToNextPage}
        ariaLabel="Go to last page"
      >
        <span className="sr-only">Last</span>
        <ChevronDoubleRightIcon className="h-6 w-6" />
      </PaginationButton>
    </nav>
  );
}

export default Pagination;
