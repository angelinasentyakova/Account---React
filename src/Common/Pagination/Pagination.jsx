import "./Pagination.css";
import React from "react";

let Pagination = ({ totalItemsCount, pageSize, Paginate, currentPage }) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pageNumbers = [];

  for (let i = 1; i <= pagesCount; i++) {
        pageNumbers.push(i);
  };
  
  return (
    <div className="pagination-container">
      <ul className='pagination'>
        {pageNumbers.map(number => (<li  className={currentPage === number ? "selected-page" : ""} key={number} onClick={() => Paginate(number)}>{number}</li>))}
      </ul>
    </div>
  )
};

export default Pagination;
