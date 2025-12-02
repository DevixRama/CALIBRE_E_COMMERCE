import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { resetPassword } from "../store/slices/authSlice";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("password", formData.password);
    data.append("confirmPassword", formData.confirmPassword);
    dispatch(resetPassword({resetToken, data}));
  };

  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.role === "Admin") return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold text-purple-600 text-center mb-6">Reset Password</h2>
        <input type="password" placeholder="New Password" className="w-full border border-gray-200 rounded px-3 py-2 mb-4 focus:outline-none" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
        <input type="password" placeholder="Confirm Password" className="w-full border border-gray-200 rounded px-3 py-2 mb-4 focus:outline-none" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition">
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
