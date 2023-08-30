import React from "react";

const Pagination = ({
  currentPage,
  itemsPerPage,
  totalItems,
  handlePageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col gap-3 py-3 text-[#777777]">
      <div className="flex flex-col">
        <span className="font-bold">
          Page of {currentPage}
        </span>
        <span className="text-sm text-slate-500">Total Items {totalItems}</span>
      </div>
      <ul className="flex flex-row gap-5">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              onClick={() => handlePageChange(number)}
              className="btn-login rounded-xl py-2 px-4 hover:bg-blue-500 text-white font-semibold">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
