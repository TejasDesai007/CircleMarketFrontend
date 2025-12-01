import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sell from "./pages/Sell";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} setUser={setUser} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {currentPage === "home" && <Home />}
      {currentPage === "login" && <Login setUser={setUser} setCurrentPage={setCurrentPage} />}
      {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
      {currentPage === "sell" && <Sell user={user} setCurrentPage={setCurrentPage} />}
    </div>
  );
}
