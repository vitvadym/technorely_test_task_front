import { FC } from "react";
import clsx from "clsx";

type PaginateProps = {
  perPage: number;
  total: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Paginate: FC<PaginateProps> = ({
  perPage,
  total,
  currentPage,
  onChangePage,
}) => {
  const pages = [...Array(Math.ceil(total / perPage))].map(
    (_, index) => index + 1,
  );

  const handleSetPage = (page: number) => {
    if (page === currentPage) {
      return;
    }
    onChangePage(page);
  };

  return (
    <>
      {pages.map((page, index) => (
        <button
          key={index}
          className={clsx(
            "btn join-item btn-sm",
            currentPage === page && "btn-active",
          )}
          onClick={() => handleSetPage(page)}
        >
          {page}
        </button>
      ))}
    </>
  );
};

export default Paginate;
