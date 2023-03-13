import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import { getUserDetails } from "./helpers/SessionHelper";
import AboutPage from "./pages/AboutPage";
import ProductCreatePage from "./pages/Admin/ProductCreatePage";
import AdminDashboard from "./pages/AdminDashboard";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
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

  return (
    <div className="w-full mx-auto">
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
          <Route path="/admin/productCreate" element={<ProductCreatePage />} />

          <Route path="*" element={<h1>Error source</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
