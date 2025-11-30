import { useState } from "react";
import { Plus, Upload, ArrowLeft, CheckCircle } from "lucide-react";
import API from "../api/api";

export default function Sell({ user, setCurrentPage }) {
  const [form, setForm] = useState({ 
    name: "", 
    price: "", 
    image: "" 
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="text-blue-600" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to list your products for sale</p>
          <button 
            onClick={() => setCurrentPage("login")} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full"
          >
            Go to Login
          </button>
        </div>
      </div>
    );

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Product name must be at least 2 characters";
    }
    
    if (!form.price) {
      newErrors.price = "Price is required";
    } else if (parseFloat(form.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    
    if (!form.image.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!isValidUrl(form.image)) {
      newErrors.image = "Please enter a valid image URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const submit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await API.post("/products/add", { user_id: user.id, ...form });
      setShowSuccess(true);
      setTimeout(() => {
        setCurrentPage("home");
      }, 2000);
    } catch (error) {
      setErrors({ submit: "Failed to add product. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    setCurrentPage("home");
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Success!</h2>
          <p className="text-gray-600 mb-6">Your product has been listed successfully</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-gray-500 text-sm mt-4">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button 
            onClick={handleGoBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Sell Your Product</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-center">
            <div className="bg-white bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="text-white" size={28} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">List New Product</h2>
            <p className="text-green-100">Fill in the details below to start selling</p>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            <div className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input 
                  name="name" 
                  placeholder="e.g., Vintage Camera, Designer Handbag..."
                  value={form.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input 
                    name="price" 
                    type="number" 
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.price ? "border-red-500" : "border-gray-300"
                    }`}
                    min="0"
                    step="0.01"
                  />
                </div>
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Upload size={18} />
                  </span>
                  <input 
                    name="image" 
                    placeholder="https://example.com/image.jpg"
                    value={form.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
                {form.image && !errors.image && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                    <img 
                      src={form.image} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700 text-sm">{errors.submit}</p>
                </div>
              )}

              <button 
                onClick={submit} 
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <Plus size={20} className="mr-2" />
                    Add Product
                  </>
                )}
              </button>

              {/* Help Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 text-sm text-center">
                  Your product will be visible to all users after submission
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}