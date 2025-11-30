import { useState, useEffect } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../components/PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { placeOrder } from "../store/slices/orderSlice";

const Payment = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { orderStep } = useSelector((state) => state.order);
  const { cart } = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!authUser) return navigate("/products");

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    loadStripe(import.meta.env.VITE_STRIPE_FRONTEND_KEY)
      .then((stripe) => setStripePromise(stripe))
      .catch((err) => console.log(err));
  }, []);

  const [shippingDetails, setShippingDetails] = useState({
    full_name: "",
    state: "delhi",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    country: "india",
  });

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  let totalWithTax = total + total * 0.18;
  if (total < 50) totalWithTax += 2;

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("full_name", shippingDetails.full_name);
    formData.append("state", shippingDetails.state);
    formData.append("phone", shippingDetails.phone);
    formData.append("address", shippingDetails.address);
    formData.append("city", shippingDetails.city);
    formData.append("pincode", shippingDetails.pincode);
    formData.append("country", shippingDetails.country);
    formData.append("orderedItems", JSON.stringify(cart));

    dispatch(placeOrder(formData));
  };

  if (cart.length === 0)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="bg-white shadow rounded-md p-10 w-[90%] max-w-md text-center border border-purple-400">
          <p className="text-purple-600 text-2xl font-bold mb-3">Your cart is empty</p>
          <p className="text-gray-600 mb-4">You haven’t added anything yet.</p>
          <Link to={"/products"} className="bg-purple-500 py-2 px-1 text-white rounded mb-2 text-sm">Explore our products</Link>
        </div>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <Link to="/cart" className="flex items-center gap-2 text-purple-600 mb-4">
        <ArrowLeft /> Back
      </Link>

      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Order Step */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${orderStep === 1 ? "bg-purple-600" : "bg-green-700"}`}>{orderStep === 1 ? "1" : <Check />}</div>
          <span className="text-gray-700 font-medium">Shipping</span>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold ${orderStep === 2 ? "bg-purple-600" : "bg-green-700"}`}>{orderStep > 2 ? <Check /> : "2"}
          </div>
          <span className="text-gray-700 font-medium">Payment</span>
        </div>
      </div>


      {/* Step 1 - Shipping Form */}
      {orderStep === 1 && (
        <form onSubmit={handlePlaceOrder} className="flex flex-col gap-4 border p-5 rounded-md">
          <h2 className="text-lg font-semibold">Shipping Details</h2>
          <input type="text" placeholder="Full Name" className="border p-2 rounded" value={shippingDetails.full_name} onChange={(e) => setShippingDetails({ ...shippingDetails, full_name: e.target.value })} required />
          <input type="text" placeholder="Phone" className="border p-2 rounded" value={shippingDetails.phone} onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })} required />
          <input type="text" placeholder="Address" className="border p-2 rounded" value={shippingDetails.address} onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })} required />
          <div className="flex gap-2">
            <input type="text" placeholder="City" className="border p-2 w-1/2 rounded" value={shippingDetails.city} onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })} required />
            <input type="text" placeholder="State" className="border p-2 w-1/2 rounded" value={shippingDetails.state} onChange={(e) => setShippingDetails({ ...shippingDetails, state: e.target.value })} required />
          </div>
          <input type="text" placeholder="Pincode" className="border p-2 rounded" value={shippingDetails.pincode} onChange={(e) => setShippingDetails({ ...shippingDetails, pincode: e.target.value })} required />
          <input type="text" placeholder="Country" className="border p-2 rounded" value={shippingDetails.country} onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })} required />

          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">Proceed to Payment</button>
        </form>
      )}

      {/* Step 2 - Payment */}
      {orderStep === 2 && stripePromise && (
        <Elements stripe={stripePromise}>
          <div className="mt-6 border p-5 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <PaymentForm />
          </div>
        </Elements>
      )}

      {/* Order Summary */}
      <div className="mt-8 border p-5 rounded-md">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
        <p className="text-sm">Subtotal: ₹{total}</p>
        <p className="text-sm">Tax (18%): ₹{(total * 0.18).toFixed(2)}</p>
        <p className="text-sm">Shipping: ₹{total < 50 ? 2 : 0}</p>
        <p className="text-lg font-semibold mt-2">Total: ₹{Math.round(totalWithTax)}</p>
      </div>
    </div>
  );
};

export default Payment;