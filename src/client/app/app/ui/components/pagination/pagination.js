"use client";
import { useState, useMemo } from "react";

const Pagination = ({ pagination, setPagination }) => {
  //   const [pagination, setPagination] = useState({
  //     totalCount: 0,
  //     siblingCount: 1,
  //     currentPage: 1,
  //     pageSize: 20,
  //   });
  const handleChangePage = async (event) => {
    event.preventDefault();
    const pageNumber = parseInt(event.currentTarget.dataset.page);
    setPagination({ ...pagination, currentPage: pageNumber });
  };
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const DOTS = "...";

  const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
  }) => {
    const paginationRange = useMemo(() => {
      // Calculate total pages base on total count items
      const totalPageCount = Math.ceil(totalCount / pageSize);

      // The number of pages is showed = first page + last page + current page + 2 dots
      const totalPageNumbers = 5 + siblingCount;

      // Case 1: if the number of pages is less than page numbers => show all the number of pages
      if (totalPageCount <= totalPageNumbers) {
        return range(1, totalPageCount);
      }

      // Calculate left and right sibling index
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPageCount
      );

      // Show left and right dots
      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPageCount - 2;

      // First and last page index
      const firstPageIndex = 1;
      const lastPageIndex = totalPageCount;

      // Case 2: Left dots not show, right dots show
      if (!showLeftDots && showRightDots) {
        const leftItemCount = 1 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);
        return [...leftRange, DOTS, totalPageCount];
      }

      // Case 3: Left dots show, right dots not show
      if (showLeftDots && !showRightDots) {
        const rightItemCount = 1 + 2 * siblingCount;
        const rightRange = range(
          totalPageCount - rightItemCount + 1,
          totalPageCount
        );
        return [firstPageIndex, DOTS, ...rightRange];
      }

      // Case 4: Both left and right dots to be shown
      if (showLeftDots && showRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
      }
    }, [totalCount, pageSize, siblingCount, currentPage]);
    return paginationRange;
  };

  const paginationRange = usePagination(pagination);

  const handlePrevClick = (event) => {
    event.preventDefault();
    const pageNumber = pagination.currentPage - 1;
    if (pageNumber <= 0) {
      return;
    }
    setPagination({ ...pagination, currentPage: pageNumber });
  };
  const handleNextClick = (event) => {
    event.preventDefault();
    const totalPageNumbers = Math.ceil(
      pagination.totalCount / pagination.pageSize
    );
    const pageNumber = pagination.currentPage + 1;
    if (pageNumber > totalPageNumbers) {
      return;
    }
    setPagination({ ...pagination, currentPage: pageNumber });
  };

  return (
    <>
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <a
            href="#"
            onClick={handlePrevClick}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <a
                key={index}
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                &#8230;
              </a>
            );
          }
          return pageNumber === pagination.currentPage ? (
            <li key={index}>
              <a
                href="#"
                data-page={pageNumber}
                onClick={handleChangePage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-300 hover:bg-blue-500 hover:text-white dark:bg-blue-500 dark:text-white"
              >
                {pageNumber}
              </a>
            </li>
          ) : (
            <li key={index}>
              <a
                href="#"
                data-page={pageNumber}
                onClick={handleChangePage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
        <li>
          <a
            href="#"
            onClick={handleNextClick}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
