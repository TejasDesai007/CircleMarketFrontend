import { useState } from "react";
import { ShoppingBag, User, LogOut, Menu, X, Plus, Home } from "lucide-react";

export default function Navbar({ user, setUser, currentPage, setCurrentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setCurrentPage("home");
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const NavButton = ({ page, icon: Icon, label, activeClass, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        currentPage === page
          ? activeClass
          : "hover:bg-gray-100 text-gray-700 hover:text-gray-900"
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavigation("home")}
          >
            <div className="relative">
              <div className="bg-blue-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <div className="absolute -inset-1 bg-blue-200 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-200 -z-10"></div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MarketPlace
              </span>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 rounded-full"></div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <NavButton
              page="home"
              icon={Home}
              label="Home"
              activeClass="bg-blue-100 text-blue-600 shadow-sm"
              onClick={() => handleNavigation("home")}
            />

            {user ? (
              <>
                <NavButton
                  page="sell"
                  icon={Plus}
                  label="Sell"
                  activeClass="bg-green-100 text-green-600 shadow-sm"
                  onClick={() => handleNavigation("sell")}
                />

                {/* User Profile Dropdown */}
                <div className="relative group ml-2">
                  <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 cursor-pointer group-hover:shadow-md transition-all duration-200">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <User size={16} className="text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {user.name}
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full border border-white shadow-sm"></div>
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-600 border-b border-gray-100">
                        Welcome back!
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <button
                  onClick={() => handleNavigation("login")}
                  className="px-6 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium border border-transparent hover:border-blue-200"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavigation("signup")}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {user && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg mr-2">
                <User size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-4 py-3 space-y-2">
              <button
                onClick={() => handleNavigation("home")}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-all ${
                  currentPage === "home"
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Home size={20} />
                <span>Home</span>
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => handleNavigation("sell")}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium transition-all ${
                      currentPage === "sell"
                        ? "bg-green-100 text-green-600"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Plus size={20} />
                    <span>Sell</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-all"
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavigation("login")}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    <User size={20} />
                    <span>Login</span>
                  </button>

                  <button
                    onClick={() => handleNavigation("signup")}
                    className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all"
                  >
                    <span>Sign Up</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Loading Bar */}
      <div className="h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 w-0 group-hover:w-full transition-all duration-500"></div>
    </nav>
  );
}