import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center text-white justify-center space-x-1 m-2">
      <button onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} disabled={currentPage === 1} className="p-2 rounded-full cursor-pointer bg-purple-400"><ChevronLeft className="w-5 h-5 text-primary" /></button>
      {pages.map((page, index) => page === "..." ? (
        <span key={index} className="px-3 py-3 text-muted-foreground select-none">...</span>
      ) : (
        <button key={index} onClick={() => onPageChange(page)} className={`p-2 w-10 text-gray-800 h-10 rounded-lg transition-all ${currentPage === page ? "bg-purple-300" : "bg-purple-100"}`}>{page}</button>
      ))}
      <button onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="p-2 rounded-full cursor-pointer bg-purple-400"><ChevronRight className="w-5 h-5 text-primary" /></button>
    </div>
  );
};

export default Pagination;
