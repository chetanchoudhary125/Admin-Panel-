import { createDummyProducts } from "../features/products/dummyProducts";

export function loadProducts() {
  const stored = localStorage.getItem("products");
  if (stored === null) {
    const seeded = createDummyProducts();
    localStorage.setItem("products", JSON.stringify(seeded));
    return seeded;
  }

  const products = JSON.parse(stored);
  if (!Array.isArray(products)) {
    throw new Error("Saved products must be a list.");
  }
  return products;
}

export function saveProducts(products) {
  localStorage.setItem("products", JSON.stringify(products));
}
