import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NewProducts } from "../products/NewProducts";
import { TopSellingOrdersList } from "../../products/TopSellingOrdersList";

export const TopSelling = () => {
  return (
    <div className="my-5 grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.8fr)_minmax(18rem,1fr)]">
      <div className="min-w-0 rounded-2xl bg-white px-4 py-5 shadow-sm sm:px-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">Top selling products</h2>
          <p className="text-gray-600">
            This section will display the top selling products.
          </p>
        </div>
        <div className="mt-4 min-w-0 overflow-x-auto">
          <div className="min-w-[34rem]">
          <ul className="m-0 grid list-none grid-cols-12 items-center gap-2 rounded-lg border-b p-1 text-xs font-semibold sm:text-sm">
            <li className="col-span-2">No</li> 
            <li className="col-span-3">Product Name</li>
            <li className="col-span-2">Price</li>
            <li className="col-span-2">Sales</li>
            <li className="col-span-3">Product Status</li>
          </ul>
          <TopSellingOrdersList />
          </div>
        </div>
      </div>
      <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-1">
        <div className="flex flex-col rounded-2xl bg-white px-5 py-4 shadow-sm sm:px-6">
          <p className=" font-bold  mb-1">Total Products Sold</p>
          <p className="text-2xl font-bold pb-2 flex items-center gap-3  border-gray-400 border-b">
            11,856{" "}
            <span className="bg-[#F59E0B]  font-medium font-sans px-2 rounded-full text-base">
              -10%
            </span>
          </p>
          <div className="flex items-center justify-between pt-4">
            <p className="font-medium underline">view sales details</p>
            <Link to="/analytics" aria-label="View sales analytics">
              <FaArrowCircleRight />
            </Link>
          </div>
        </div>
        <div className="flex min-w-0 flex-col rounded-2xl bg-white px-5 py-4 shadow-sm sm:px-6">
          <div className="min-w-0">
            <p className="font-bold text-lg mb-3  ">New products </p>
            <p className="text-gray-600 mb-3">
              Recently added to your catalog.
              </p>
            <NewProducts />
          </div>
        </div>
      </div>
    </div>
  );
};
