import React from "react";
import "../atoms/Authentication/Page.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // 보여줄 페이지 수 설정 (여기서는 5로 설정)
    const maxPageNumbers = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div
          key={i}
          className={`NumberBorder ${currentPage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          <div className="NumberContent">{i}</div>
        </div>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="Page">
      <div className="FirstBorder" onClick={() => handlePageChange(1)}>
        <div className="PageBorder">
          <img src="/pageimage/pageleft.svg" alt="firstpage" />
        </div>
      </div>
      <div
        className="NumberBorder"
        onClick={() => handlePageChange(currentPage - 1)}
        style={{ visibility: currentPage > 1 ? "visible" : "hidden" }}
      >
        <div className="NumberContent">{"<"}</div>
      </div>
      {renderPageNumbers()}
      <div
        className="NumberBorder"
        onClick={() => handlePageChange(currentPage + 1)}
        style={{ visibility: currentPage < totalPages ? "visible" : "hidden" }}
      >
        <div className="NumberContent">{">"}</div>
      </div>
      <div className="LastBorder" onClick={() => handlePageChange(totalPages)}>
        <div className="PageBorder">
          <img src="/pageimage/pageright.svg" alt="lastpage" />
        </div>
      </div>
    </div>
  );
}

export default Pagination;
