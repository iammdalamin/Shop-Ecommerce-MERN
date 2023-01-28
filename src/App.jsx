import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div className="w-full mx-auto">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
