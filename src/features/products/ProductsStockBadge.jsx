export const StockBadge = ({ stock }) => {
  if (stock === 0)
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">
        Out of stock
      </span>
    );
  if (stock <= 8)
    return (
      <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
        Low — {stock} left
      </span>
    );
  return (
    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
      In stock · {stock}
    </span>
  );
};