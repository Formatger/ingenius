import React from 'react';

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  noSlicedData: any[];
  data: any[];
  handlePrevious: () => void;
  handleNext: () => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  noSlicedData,
  data,
  handlePrevious,
  handleNext,
  totalPages
}: PaginationProps) => {
  return (
    <div className="pagination">
      <span>{`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
        currentPage * itemsPerPage,
        noSlicedData.length
      )} of ${noSlicedData.length}`}</span>
      <button onClick={handlePrevious} disabled={currentPage === 1 || data.length === 0}>
        &lt;
      </button>
      <span>{currentPage}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || data.length === 0 || data.length < itemsPerPage}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;