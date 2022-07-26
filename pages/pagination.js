/* eslint-disable react/jsx-key */
import _ from "lodash";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;

  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a onClick={() => onPageChange(page)} className="" href="page-link">
              {" "}
              {page}
            </a>
          </li>
        ))}
      </ul>
      asdasd
    </nav>
  );
};

export default Pagination;
