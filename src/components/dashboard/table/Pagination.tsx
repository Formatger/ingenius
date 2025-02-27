import React from "react";

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
  filteredData: any[];
  dataToDisplay: any[];
  handlePrevious: () => void;
  handleNext: () => void;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  itemsPerPage,
  filteredData,
  dataToDisplay,
  handlePrevious,
  handleNext,
  totalPages,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <span>{`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
        currentPage * itemsPerPage,
        filteredData.length
      )} of ${filteredData.length}`}</span>
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || dataToDisplay.length === 0}
      >
        &lt;
      </button>
      <span>{currentPage}</span>
      <button
        onClick={handleNext}
        disabled={
          currentPage === totalPages ||
          dataToDisplay.length === 0 ||
          dataToDisplay.length < itemsPerPage
        }
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
