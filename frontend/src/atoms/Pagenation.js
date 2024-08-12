import "../atoms/Pagenation.css";

function Pagenation({
  currentPage,
  totalPages,
  onPageChange,
  upPageChange,
  downPageChange,
}) {

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
          onClick={() => onPageChange(i)}
        >
          <div className="NumberContent">{i}</div>
        </div>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="PagenationPage">
      <div className="FirstBorder" onClick={() => onPageChange(1)}>
        <div className="PageBorder">
          <img src="/image/pageimage/pageleft.svg" alt="firstpage" />
        </div>
      </div>
      <div
        className="NumberBorder"
        onClick={() => downPageChange(currentPage)}
        style={{ visibility: "visible" }}
      >
        <div className="NumberContent">{"<"}</div>
      </div>
      {renderPageNumbers()}
      <div
        className="NumberBorder"
        onClick={() => upPageChange(currentPage)}
        style={{ visibility: "visible" }}
      >
        <div className="NumberContent">{">"}</div>
      </div>
      <div className="LastBorder" onClick={() => onPageChange(totalPages)}>
        <div className="PageBorder">
          <img src="/image/pageimage/pageright.svg" alt="lastpage" />
        </div>
      </div>
    </div>
  );
}

export default Pagenation;
