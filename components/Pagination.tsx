interface PaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  handlePageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="p-6 flex gap-2 items-center justify-center">
      {/* Prev */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-3 py-2 rounded-md text-xs shadow disabled:opacity-50 hover:scale-105 transition"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 rounded-md text-xs shadow transition ${
            page === currentPage
              ? "bg-blue-600 text-white scale-105"
              : "hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-3 py-2 rounded-md text-xs shadow disabled:opacity-50 hover:scale-105 transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
