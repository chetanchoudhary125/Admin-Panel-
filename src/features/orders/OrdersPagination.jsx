export const OrdersPagination = ({setCurrentPage ,currentPage,totalPages}) =>{
    return (
        <div className="flex justify-center items-center mt-5 gap-2">
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  disabled={currentPage <= 1 || totalPages === 0}
                >
                  Prev
                </button>
        
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 border rounded ${
                      currentPage === index + 1 ? "bg-gray-300" : ""
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
        
                <button
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={totalPages === 0 || currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
    )
}