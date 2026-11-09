import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadProducts, saveProducts } from "../../utils/productStorage";

const initialProduct = {
  name: "",
  description: "",
  brand: "",
  price: "",
  stock: "",
};

const AddProductForm = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialProduct);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const currentProducts = loadProducts();
      const newProduct = {
        ...product,
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
        name: product.name.trim(),
        description: product.description.trim(),
        brand: product.brand.trim(),
        price: Number(product.price),
        stock: Number(product.stock),
        rating: 0,
      };
      saveProducts([...currentProducts, newProduct]);
      navigate("/products");
    } catch (storageError) {
      console.error("Failed to save the new product:", storageError);
      setError("The product could not be saved. Check your browser storage and try again.");
    }
  };

  return (
    <section className="w-full rounded-2xl bg-white p-4 shadow-sm sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">Add product</h1>
        <p className="mt-1 text-sm text-gray-500">Add a new item to your catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="flex min-w-0 flex-col gap-1 sm:col-span-2">
          <label htmlFor="product-name" className="text-sm font-medium text-gray-600">Product Name</label>
          <input
            id="product-name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-description" className="text-sm font-medium text-gray-600">Description</label>
          <input
            id="product-description"
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Enter product description"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-brand" className="text-sm font-medium text-gray-600">Brand</label>
          <input
            id="product-brand"
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Enter brand name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-price" className="text-sm font-medium text-gray-600">Price ($)</label>
          <input
            id="product-price"
            type="number"
            name="price"
            min="0"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Enter price"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product-stock" className="text-sm font-medium text-gray-600">Stock</label>
          <input
            id="product-stock"
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            required
            min="0"
            step="1"
            className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-400"
            placeholder="Enter stock count"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700 sm:col-span-2"
        >
          Add Product
        </button>
      </form>
    </section>
  );
};

export default AddProductForm
