import { useState } from "react";
import { Heart, Share2, Eye, Star, MapPin, Clock } from "lucide-react";

export default function ProductCard({ product, viewMode = "grid" }) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on MarketPlace`,
        url: window.location.href,
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateDiscount = (originalPrice, currentPrice) => {
    if (originalPrice && originalPrice > currentPrice) {
      const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
      return Math.round(discount);
    }
    return null;
  };

  const discount = calculateDiscount(product.originalPrice, product.price);

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group">
        <div className="flex">
          {/* Product Image */}
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              src={imageError ? "/api/placeholder/300/300" : product.image}
              alt={product.name}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
            )}
            
            {/* Discount Badge */}
            {discount && (
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{discount}%
              </div>
            )}
            
            {/* Like Button */}
            <button
              onClick={handleLike}
              className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full hover:scale-110 transition-transform duration-200"
            >
              <Heart
                size={16}
                className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}
              />
            </button>
          </div>

          {/* Product Info */}
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center space-x-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-gray-600 font-medium">
                  {product.rating || "4.5"}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {product.description || "High-quality product with excellent features and durability."}
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{product.location || "Mumbai"}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{product.timePosted || "2 hours ago"}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Share2 size={18} />
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={imageError ? "/api/placeholder/400/300" : product.image}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`w-full h-48 object-cover transition-all duration-500 ${
            imageLoaded ? 'opacity-100 group-hover:scale-105' : 'opacity-0'
          }`}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
            -{discount}%
          </div>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleLike}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
          >
            <Heart
              size={18}
              className={isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}
            />
          </button>
          <button
            onClick={handleShare}
            className="bg-white/90 backdrop-blur-sm p-2 rounded-full hover:scale-110 transition-transform duration-200 shadow-lg"
          >
            <Share2 size={18} className="text-gray-600" />
          </button>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={18} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Tag */}
        {product.category && (
          <div className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mb-2">
            {product.category}
          </div>
        )}

        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 mb-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center space-x-1">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 font-medium">
              {product.rating || "4.5"}
            </span>
            <span className="text-sm text-gray-500">({product.reviews || "24"})</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {product.seller_name?.charAt(0) || "U"}
              </span>
            </div>
            <span className="text-sm text-gray-600">by {product.seller_name || "Unknown"}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <MapPin size={14} />
            <span className="text-xs">{product.location || "Mumbai"}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}