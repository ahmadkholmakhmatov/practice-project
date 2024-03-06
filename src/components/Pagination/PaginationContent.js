import React from "react";
import { Pagination } from "@mui/material";
import "./Pagination.scss";

const PaginationContent = ({ setPage, pageNumber }) => {
  console.log(pageNumber)
  const handleChange = (e) => {
    setPage(e.target.textContent);
    window.scroll(0, 0);
  };
  return (
    <div className="d-flex justify-content-center align-items-center my-3 pagination">
      <Pagination onChange={handleChange} count={pageNumber} />
    </div>
  );
};

export default PaginationContent;
