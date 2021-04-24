import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

type IUsePagination = {
  current: number;
  display: any[];
  pages: number;
  next: () => void;
  previous: () => void;
  first: () => void;
  last: () => void;
  set: (num: number) => void;
};

type UsePaginationProps = {
  items: any[],
  size: number
}

type PaginationFnProps = {
  total: number;
  current: number;
  size: number;
}

export const paginate = ({
  total,
  current,
  size,
}: PaginationFnProps) => {
  // calculate total pages
  let pages = Math.ceil(total / size)

  // ensure current page isn't out of range
  if (current < 1) {
      current = 1
  } else if (current > pages) {
      current = pages
  }

  // calculate start and end item indexes
  let start = (current - 1) * size
  let end = Math.min(start + size - 1, total - 1);

  // return object with all pager properties required by the view
  return {
      start,
      end
  }
}

/**
 * Use Pagination hook
 *
 * @param    {number} size
 *           pagination size
 * 
 * @param    {Array} items
 *           All items to paginate through
 *
 * @return   {Object}
 *           object with count and methods
 *
 * @property {Array} display
 *           The current items to display
 * 
 * @property {number} current
 *           The current page
 * 
 * @property {number} pages
 *           The total number of pages
 *
 * @property {()=>void} next
 *           the next page function
 *
 * @property {()=>void} previous
 *           the previous function
 *
 * @property {()=>void} first
 *           the first page function
 *
 * @property {()=>void} last
 *           the last page function
 * 
 * @property {(num)=>void} set
 *           the 'Go to page number' function
 * @example
 *   const ExampleComponent = () => {
 *     const { current, pages, display, next, previous } = usePagination({ items: props.items, size: props.size });
 *
 *     return (
 *       <>
 *         <p>Currently on page {current} of {pages}</p>
 *         <ul>
 *          {display.map(row => {
 *            <li>{row}</li> 
 *         })}
 *         </ul>
 *         <button onClick={next}>Next Page</button>
 *         <button onClick={previous}>Previous Page</button>
 *         <p>{count}</p>
 *       </>
 *      )
 *    }
 */

const usePagination = ({ items, size = 10 }: UsePaginationProps): IUsePagination => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [displayItems, setDisplayItems] = useState<any[]>([])
    const [totalPages, setTotalPages] = useState<number>(Math.ceil(items.length / size))

    useEffect(() => {
        setTotalPages(Math.ceil(items.length/size))
        const { start, end } = paginate({ total: items.length, current: currentPage, size })
        const display = items.slice(start, end + 1)

        setDisplayItems(display)
    }, [currentPage, items, size])

    return {
        current: currentPage,
        display: displayItems,
        pages: totalPages,
        next: () => setCurrentPage(currentPage + 1),
        previous: () => setCurrentPage(currentPage - 1),
        first: () => setCurrentPage(1),
        last: () => setCurrentPage(Math.ceil(items.length / size)),
        set: (num: number) => setCurrentPage(num)
    }
}

usePagination.PropTypes = {
  size: PropTypes.number,
  items: PropTypes.array
};

usePagination.defaultProps = {
  size: 10,
  items: []
};

export default usePagination
