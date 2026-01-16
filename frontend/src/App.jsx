import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Layout Components
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import SearchOverlay from "./components/Layout/SearchOverlay";
import CartSidebar from "./components/Layout/CartSidebar";
import ProfilePanel from "./components/Layout/ProfilePanel";
import LoginModal from "./components/Layout/LoginModal";
import Footer from "./components/Layout/Footer";

// Pages
import Index from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/authSlice";
import { fetchAllProducts } from "./store/slices/productSlice";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const App = () => {

  const { authUser, isCheckingAuth } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [])


  useEffect(() => {
    dispatch(fetchAllProducts({ availability : "", price : "1-10000", category : "", ratings : "", search : "", page : 1 }))
  }, [])

  const {products} = useSelector(state => state.product)


  if ((isCheckingAuth && !authUser) || !products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10" />
      </div>
    );
  }


  return (
    <>
        <BrowserRouter>
          <div className="min-h-screen mx-4 md:mx-10">
            <Navbar />
            <SearchOverlay />
            <Sidebar />
            <CartSidebar />
            <LoginModal />
            <ProfilePanel />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/password/reset/:resetToken" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
          <ToastContainer />
        </BrowserRouter>
    </>
  );
};

export default App;
