import transectionData from "../../data/transection.json";

export const TransectionDetails = () => {
  return (
    <div className="w-full min-w-0 p-2 sm:p-4">
      <div className="hidden lg:grid grid-cols-6 gap-4 font-semibold text-gray-600 border-b pb-2">
        <span>Customer ID</span>
        <span>Customer Name</span>
        <span>Product</span>
        <span>Date</span>
        <span>Price</span>
        <span>Status</span>
      </div>

      {transectionData.slice().map((transection) => {
        const { id, customer, product, date, amount, status } = transection;

        const statusClasses = {
          Recieved: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Cancelled: "bg-red-100 text-red-800",
          Refunded: "bg-blue-100 text-blue-800",
        };

        return (
          <div
            key={id}
            className="grid grid-cols-1 overflow-clip lg:grid-cols-6 gap-2 md:gap-4 items-center border rounded-xl p-3 my-2 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between md:block">
              <span className="md:hidden font-semibold text-gray-500">
                Customer ID:
              </span>
              <span className="truncate">{id}</span>
            </div>

            <div className="flex justify-between md:block">
              <span className="md:hidden font-semibold text-gray-500">
                Customer:
              </span>
              <span className="truncate">{customer}</span>
            </div>

            <div className="flex justify-between md:block">
              <span className="md:hidden font-semibold text-gray-500">
                Product:
              </span>
              <span className="truncate">{product}</span>
            </div>

            <div className="flex justify-between md:block">
              <span className="md:hidden font-semibold text-gray-500">
                Date:
              </span>
              <span>{date}</span>
            </div>

            <div className="flex justify-between md:block">
              <span className="md:hidden font-semibold text-gray-500">
                Price:
              </span>
              <span>${amount}</span>
            </div>

            <div className="flex justify-between md:block">
              <span className="md:hidden font-semibold text-gray-500">
                Status:
              </span>
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${statusClasses[status]}`}
              >
                {status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
