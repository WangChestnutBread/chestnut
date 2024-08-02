import React from "react";
import "../atoms/Authentication/Page.css";

function Pagenation({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <div className="Page">
      <div className="FirstBorder" onClick={() => handlePageChange(1)}>
        <div className="PageBorder">
          <img src="/pageimage/pageleft.svg" alt="firstpage" />
        </div>
      </div>
      <div className="NumberBorder" onClick={() => handlePageChange(currentPage - 1)}>
        <div className="NumberContent">{"<"}</div>
      </div>
      <div className="NumberBorder" onClick={() => handlePageChange(1)}>
        <div className="NumberContent">1
        </div>
      </div>
      <div className="NumberBorder" onClick={() => handlePageChange(2)}>
        <div className="NumberContent">2
        </div>
      </div>
      <div className="NumberBorder" onClick={() => handlePageChange(currentPage + 1)}>
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

export default Pagenation;