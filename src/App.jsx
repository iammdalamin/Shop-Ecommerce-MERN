import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { getUserDetails } from "./helpers/SessionHelper";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminProductPage from "./pages/Admin/AdminProductPage";
import ProductCreatePage from "./pages/Admin/ProductCreatePage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import SignupPage from "./pages/SignupPage";
function App() {
  const [user, setUser] = useState();
  const UserDetails = async () => {
    const user = getUserDetails();
    if (user) {
      setUser(user.data);
    } else {
      setUser(null);
    }
  };
  useEffect(() => {
    UserDetails();
  }, []);
  console.log(user?.role);
  return (
    <div className="w-full mx-auto">
      {user?.role !== 1 ? (
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ContactPage" element={<ContactPage />} />
            <Route path="/AboutPage" element={<AboutPage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<CartPage />} />

            {/* AdminPages */}

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route
              path="/admin/dashboard/product-add"
              element={<ProductCreatePage />}
            />
            <Route
              path="/admin/dashboard/products"
              element={<AdminProductPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
