import { Link } from "react-router-dom";
import AllProductsList from "../features/products/AllProducts";
import { useState } from "react";

const Products = () => {
    const [search, setSearch] = useState("")

  return (
    <div className="min-w-0 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
      <div>
        <div className="flex flex-col items-start gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-lg font-bold text-slate-900 sm:text-xl">Products</h1>
            <Link
              to="/products/add"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add Product
            </Link>
        </div>
        <div className="mt-4">
          <div className="w-full max-w-xl">
            <input
              type="text"
              placeholder="Search products"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
        </div>
        <div className="mt-4 min-w-0">
          
          <AllProductsList search={search} />
        </div>
      </div>
    </div>
  );
};
export default Products;
