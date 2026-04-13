import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Info from "./pages/Info";
// Import thêm trang ProductDetail
import ProductDetail from "./pages/ProductDetail";
import Seller from "./pages/Seller";
import Checkout from "./pages/Checkout";
import SupportPage from './pages/SupportPage';
// Import thêm trang ProductDetail
import ProductList from "./pages/ProductList";
import CustomerChatPage from "./pages/CustomerChatPage";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/cart" element={<Checkout />} />
        <Route path="/forgot" element={<Login />} />
        <Route path="/terms" element={<Register />} />
        <Route path="/policy" element={<Register />} />
        <Route path="/info" element={<Info />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/customer-chat" element={<CustomerChatPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
				<Route path="/order/:id" element={<OrderDetail />} />
        <Route path="*" element={<div>Not Found</div>} />
			</Routes>
		</BrowserRouter>
  );
}

export default App;