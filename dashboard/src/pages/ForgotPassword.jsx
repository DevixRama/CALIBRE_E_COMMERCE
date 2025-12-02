import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../store/slices/authSlice";
import { Link, Navigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPassword({ email }));
  };

  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated && user?.role === "Admin") return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded- shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-purple-700 mb-6 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">Email Address</span>
          </label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 block w-full rounded border border-gray-200 shadow-sm focus:outline-none" placeholder="Enter your email" />
          <p className="mt-6 text-end text-sm text-gray-500">
            <Link to="/login" className="text-purple-600 hover:underline">Remember password?</Link>
          </p>
          <button type="submit" disabled={loading} className="w-full py-2 rounded bg-purple-600 text-white font-medium shadow-sm hover:scale-105">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
}
