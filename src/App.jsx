import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
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
import ProductsPage from "./pages/ProductsPage";
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
  const ProtectedRoute = ({ children }) => {
    if (user?.role === 1) {
      return children;
    } else {
      return <NotFoundPage />;
    }
  };
  return (
    <div className="w-full mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/ProductsPage" element={<ProductsPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* AdminPages */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard/product-add"
            element={
              <ProtectedRoute>
                <ProductCreatePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard/products"
            element={
              <ProtectedRoute>
                <AdminProductPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
