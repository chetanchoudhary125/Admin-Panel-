import {
  IconStar,
  IconEdit,
  IconTrash,
  IconPackage,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import EditProductModal from "./EditProductModal";
import { StockBadge } from "./ProductsStockBadge";
import { loadProducts, saveProducts } from "../../utils/productStorage";

const AllProductsList = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [storageError, setStorageError] = useState("");

  const page_size = 10;
  
  useEffect(() => {
    try {
      setProducts(loadProducts());
    } catch (error) {
      console.error("Failed to load products from local storage:", error);
      setStorageError("Products could not be loaded from this browser. Check your saved data and storage access.");
    }
  }, []);
  
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    try {
      saveProducts(updated);
      setProducts(updated);
      setStorageError("");
    } catch (error) {
      console.error("Failed to save product deletion:", error);
      setStorageError("The product could not be deleted because browser storage is unavailable.");
    }
  };

  const handleSave = (updatedProduct) => {
    const updated = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p,
    );
    try {
      saveProducts(updated);
      setProducts(updated);
      setEditProduct(null);
      setStorageError("");
    } catch (error) {
      console.error("Failed to save product changes:", error);
      setStorageError("Product changes could not be saved because browser storage is unavailable.");
    }
  };

  const matchingProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.trim().toLowerCase()),
  );
  const totalPages = Math.ceil(matchingProducts.length / page_size);
  const page = Math.min(currentPage, Math.max(totalPages, 1));
  const filtered = matchingProducts.slice((page - 1) * page_size, page * page_size);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  useEffect(() => {
    setCurrentPage((current) => Math.min(current, Math.max(totalPages, 1)));
  }, [totalPages]);

  if (filtered.length === 0) {
    return (
      <div>
        {storageError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}
        <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <IconPackage size={22} stroke={1.5} />
        </div>
        <p className="text-sm font-medium text-gray-700">
          {products.length === 0 ? "No products yet" : "No products found"}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          {products.length === 0 ? "Add a product to get started" : "Try a different search term"}
        </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {storageError && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{storageError}</p>}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full text-sm lg:min-w-0">
          {/* Column headers */}
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-400">
              <th className="px-4 py-3 text-left">Product</th>
              <th className="hidden px-4 py-3 text-left xl:table-cell">Brand</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Rating</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 bg-white">
            {filtered.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Product name + description */}
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-xs text-gray-400 truncate max-w-[180px]">
                    {product.description}
                  </p>
                </td>

                {/* Brand */}
                <td className="hidden px-4 py-3 text-gray-500 xl:table-cell">{product.brand}</td>

                {/* Price */}
                <td className="px-4 py-3 font-medium text-gray-700">
                  ${product.price.toLocaleString()}
                </td>

                {/* Stock badge */}
                <td className="px-4 py-3">
                  <StockBadge stock={product.stock} />
                </td>

                {/* Rating */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <IconStar size={14} stroke={1.5} color="#f59e0b" />
                    <span>{product.rating}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label={`Edit ${product.name}`}
                      onClick={() => setEditProduct(product)}
                      className="rounded-lg p-1.5 text-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <IconEdit size={16} stroke={1.5} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${product.name}`}
                      onClick={() => handleDelete(product.id)}
                      className="rounded-lg p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <IconTrash size={16} stroke={1.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center gap-4 p-5 sm:gap-8 sm:p-8">
          <button
            className="bg-blue-500 px-4 py-2 text-center rounded text-white"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <button
            className="bg-blue-500 px-4 py-2 text-center rounded text-white"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default AllProductsList;
