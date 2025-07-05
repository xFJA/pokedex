import { useMemo } from 'react';

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  siblingCount?: number;
}

interface UsePaginationReturn {
  totalPages: number;
  pageNumbers: (number | 'dots')[];
  canGoToPreviousPage: boolean;
  canGoToNextPage: boolean;
}

export function usePagination({
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 1,
}: UsePaginationProps): UsePaginationReturn {
  const totalPages = useMemo(() => Math.ceil(totalCount / pageSize), [totalCount, pageSize]);

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

      return [...leftRange, 'dots' as const, totalPages];
    }

    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 1 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );

      return [1, 'dots' as const, ...rightRange];
    }

    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i,
      );

      return [1, 'dots' as const, ...middleRange, 'dots' as const, totalPages];
    }

    return [];
  }, [totalPages, currentPage, siblingCount]);

  return {
    totalPages,
    pageNumbers,
    canGoToPreviousPage: currentPage > 1,
    canGoToNextPage: currentPage < totalPages,
  };
}
