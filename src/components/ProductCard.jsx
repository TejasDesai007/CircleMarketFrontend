import { Star, MapPin } from "lucide-react";

export default function ProductCard({ product, viewMode }) {
  return (
    <div className={`
      ${viewMode === "grid" 
        ? "bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        : "flex bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      }
    `}>
      {/* Image Section */}
      <div className={viewMode === "grid" ? "relative" : "w-48 flex-shrink-0"}>
        <img
          src={product.image}
          alt={product.name}
          className={`
            ${viewMode === "grid" 
              ? "w-full h-48 object-cover" 
              : "w-full h-full object-cover"
            }
          `}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
          }}
        />
      </div>

      {/* Content Section */}
      <div className={viewMode === "grid" ? "p-4" : "p-6 flex-1"}>
        {/* Product Name and Price */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">
            ${parseFloat(product.price).toFixed(2)}
          </p>
        </div>

        {/* Seller Info */}
        <div className="flex items-center text-gray-600 text-sm">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2">
            <span className="text-blue-600 font-medium text-xs">
              {product.seller_name?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <p className="font-medium">{product.seller_name || "Unknown Seller"}</p>
            {product.seller_phone && (
              <p className="text-gray-500 text-xs">📞 {product.seller_phone}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}