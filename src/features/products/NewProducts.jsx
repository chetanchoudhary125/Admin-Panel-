// import { memo } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadProducts } from "../../utils/productStorage";

export const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      setProducts([...loadProducts()].reverse());
    } catch (storageError) {
      console.error("Failed to load products from local storage:", storageError);
      setError("Products could not be loaded from browser storage.");
    }
  }, []);

  return (
    <>
      {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <ul role="list" className="flex flex-col gap-4">
        {products.slice(0, 4).map(({ id, name, brand, price }) => (
          <li
            key={id}
            className="flex items-center gap-4 rounded-xl px-4 py-3 
                       border border-gray-200 bg-white shadow-sm 
                       hover:shadow-md hover:border-gray-300 
                       transition-all duration-200"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                Brand:{" "}
                <span className="font-medium text-gray-700">{brand}</span>
              </p>
              <p className="text-sm text-gray-700 mt-1">
                Price:{" "}
                <span className="font-semibold text-gray-900">
                  ${price}
                </span>
              </p>
            </div>

            <div className="hidden sm:flex items-center">
              <Link
                to="/products"
                aria-label={`View ${name}`}
                className="px-3 py-1.5 rounded-md text-xs font-medium 
                           bg-gray-100 text-gray-700 
                           hover:bg-gray-200 focus:outline-none 
                           focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                View
              </Link>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-6">
        <Link
          to="/products"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 
                     underline underline-offset-2 transition-colors"
        >
          View All Products →
        </Link>
      </div>
    </>
  );
};
