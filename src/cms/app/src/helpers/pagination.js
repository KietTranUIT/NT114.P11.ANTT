import { useMemo } from "react"
import { range } from "./../helpers/service";

// totalCount: the number of items in database
// pageSize: limit the number of items on a page
// siblingCount: the number of both left right at current index
// currentPage: current page is cusored

export const DOTS = '...'

export const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage}) => {
    const paginationRange = useMemo(() => {
        // Calculate total pages base on total count items
        const totalPageCount = Math.ceil(totalCount / pageSize)

        // The number of pages is showed = first page + last page + current page + 2 dots
        const totalPageNumbers = 5 + siblingCount

        // Case 1: if the number of pages is less than page numbers => show all the number of pages
        if (totalPageCount <= totalPageNumbers) {
            return range(1, totalPageCount)
        }

        // Calculate left and right sibling index
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

        // Show left and right dots
        const showLeftDots = leftSiblingIndex > 2
        const showRightDots = rightSiblingIndex < (totalPageCount - 2)

        // First and last page index
        const firstPageIndex = 1
        const lastPageIndex = totalPageCount

        // Case 2: Left dots not show, right dots show
        if (!showLeftDots && showRightDots) {
            const leftItemCount = 1 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)
            return [...leftRange, DOTS, totalPageCount]
        }

        // Case 3: Left dots show, right dots not show
        if (showLeftDots && !showRightDots) {
            const rightItemCount = 1 + 2 * siblingCount
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
            return [firstPageIndex, DOTS, ...rightRange]
        }

        // Case 4: Both left and right dots to be shown
        if (showLeftDots && showRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
        }
    }, [totalCount, pageSize, siblingCount, currentPage])
    return paginationRange
}