import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { login } from "../store/slices/authSlice";

export default function Login() {
  const [formData, setFormData] = useState({ email: "royrahulraj54321@gmail.com", password: "88888888" });

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("email", formData.email);
    data.append("password", formData.password);
    
    dispatch(login(data));
  };

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated && user?.role === "Admin") {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded shadow-lg p-8">
        <h1 className="text-2xl font-bold text-purple-900 mb-6 text-center">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <label className="block">
            <span className="text-sm text-gray-600">Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-1 p-2 w-full rounded border border-gray-200 shadow-sm"
              placeholder="Email"
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-600">Password</span>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="mt-1 block p-2 w-full rounded border border-gray-200 shadow-sm"
              placeholder="Enter your password"
            />
          </label>

          <div className="px-2 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="remember" required className="w-4 h-4" />
              <label htmlFor="remember">Remember me</label>
            </div>

            <Link to="/password/forgot" className="text-purple-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded bg-purple-600 text-white font-medium transition-all shadow-sm hover:scale-105"
          >
            Sign in
          </button>
        </form>

        {/* <p className="mt-6 text-center text-sm text-gray-500">
          Need an account? <Link to="/register" className="text-purple-600 hover:underline">Sign up</Link>
        </p> */}
      </div>
    </div>
  );
}
