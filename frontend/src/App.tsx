import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Info from "./pages/Info";
import SupportPage from './pages/SupportPage';
// Import thêm trang ProductDetail
import ProductDetail from "./pages/ProductDetail";
import Seller from "./pages/Seller";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/support" element={<Home />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/forgot" element={<Login />} />
        <Route path="/terms" element={<Register />} />
        <Route path="/policy" element={<Register />} />
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<SupportPage />} />
        {/* Thêm Route này để hứng đường dẫn có chứa ID sản phẩm */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;