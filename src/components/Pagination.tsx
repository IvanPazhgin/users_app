import React from "react";

interface PaginationProps {
  page: number;
  limit: number;
  setLimit: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prevPage: () => void;
  nextPage: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  limit,
  setLimit,
  prevPage,
  nextPage,
}) => {
  return (
    <>
      <div>
        <label>
          Количество пользователей на странице:
          <input
            type="number"
            value={limit}
            onChange={setLimit}
            min="1"
            style={{ width: "2rem" }}
          />
        </label>
      </div>

      <div>
        <button onClick={prevPage} disabled={page === 1}>
          Предыдущая страница
        </button>

        <span style={{ margin: "1rem" }}>Page: {page}</span>

        <button onClick={nextPage}>Следующая страница</button>
      </div>
    </>
  );
};
