export interface PaginationProps {
  onPageChange?: (page: number) => void;
  perPage?: number;
  currentPage: number;
  totalPages?: number;
  hasMoreResource: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  hasMoreResource,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageClick = (page: number) => {
    onPageChange && onPageChange(page);
  };

  const renderCurrentPageButton = () => {
    const pages = [];
    if (totalPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li
            role="button"
            className={`pagination-btn ${i === currentPage ? "active" : ""}`}
            onClick={() => handlePageClick(i)}
            key={i}
          >
            <span className="page">{i}</span>
          </li>,
        );
      }
    }
    return pages;
  };

  return (
    <div aria-label="Page navigation" className="pagination-container">
      <ul className="pagination-nav__list">
        {currentPage > 1 ? (
          <li
            role="button"
            className="pagination-btn"
            onClick={() => handlePageClick(currentPage - 1)}
          >
            <span className="previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        ) : (
          ""
        )}

        {renderCurrentPageButton()}

        {hasMoreResource ? (
          <li
            role="button"
            className="pagination-btn"
            onClick={() => handlePageClick(currentPage + 1)}
          >
            <span className="next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Pagination;
