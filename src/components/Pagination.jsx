import React, { useState } from "react";

const Pagination = ({ tasks, tasksPerPage, paginate, currentPage }) => {
  // Function to generate pagination buttons
  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(tasks.length / tasksPerPage); // Calculate total pages
    let buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button 
          key={i} 
          onClick={() => paginate(i)} 
          disabled={currentPage === i} 
          style={{ margin: "5px", padding: "5px 10px", cursor: "pointer" }}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div>
      {/* Previous Button */}
      <button 
        onClick={() => paginate(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* Call the function to render pagination buttons */}
      {renderPaginationButtons()}

      {/* Next Button */}
      <button 
        onClick={() => paginate(currentPage + 1)} 
        disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
