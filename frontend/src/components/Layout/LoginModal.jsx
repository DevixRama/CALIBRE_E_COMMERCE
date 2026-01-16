import { useState, useEffect } from "react";
import { X, Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleAuthPopup } from "../../store/slices/popupSlice";
import { forgetPassword, getUser, login, register, resetPassword } from "../../store/slices/authSlice";

const LoginModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthPopupOpen } = useSelector((state) => state.popup);
  const { authUser, isSigningUp, isLoggingIn, isRequestingForToken } = useSelector((state) => state.auth);
  const [mode, setMode] = useState("signIn");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  useEffect(() => {
    if (location.pathname.startsWith("/password/reset")) {
      setMode("reset");
      dispatch(toggleAuthPopup());
    }
  }, [dispatch, location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (mode === "signUp") data.append("name", formData.name);
    if (mode === "forgot") {
      dispatch(forgetPassword({ email: formData.email })).then(() => {
        dispatch(toggleAuthPopup());
        setMode("signIn");
      });
      return;
    }
    if (mode === "reset") {
      const resetToken = location.pathname.split("/").pop();
      dispatch(resetPassword({ resetToken, password: formData.password, confirmPassword: formData.confirmPassword }));
      return;
    }
    if (mode === "signUp") dispatch(register(data));
    else dispatch(login(data)).then(() => dispatch(getUser()));
    if (authUser) setFormData({ name: "", email: "", password: "", confirmPassword: "" });
  };

  if (!isAuthPopupOpen || authUser) return null;
  const isLoading = isLoggingIn || isSigningUp || isRequestingForToken;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md bg-white rounded shadow-xl p-6">
        <button onClick={() => dispatch(toggleAuthPopup())} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"><X className="w-5 h-5" /></button>
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-900">{mode === "signIn" && "Sign In"}{mode === "signUp" && "Create Account"}{mode === "forgot" && "Forgot Password"}{mode === "reset" && "Reset Password"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signUp" && (<div className="relative"><User className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded" required /></div>)}
          {mode !== "reset" && (<div className="relative"><Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded" required /></div>)}
          {mode !== "forgot" && (<div className="relative"><Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded" required /></div>)}
          {mode === "reset" && (<div className="relative"><Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" /><input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded" required /></div>)}
          <button type="submit" disabled={isLoading} className="w-full py-2 rounded-md bg-purple-800 hover:bg-purple-900 text-white font-medium transition disabled:opacity-60">{isLoading ? "Processing..." : mode === "signIn" ? "Sign In" : mode === "signUp" ? "Sign Up" : mode === "forgot" ? "Send Reset Link" : "Reset Password"}</button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-600">
          {mode === "signIn" && (<><p>Don’t have an account? <button onClick={() => setMode("signUp")} className="text-blue-600 hover:underline">Sign up</button></p><p className="mt-1"><button onClick={() => setMode("forgot")} className="text-blue-600 hover:underline">Forgot password?</button></p></>)}
          {mode === "signUp" && (<p>Already have an account? <button onClick={() => setMode("signIn")} className="text-blue-600 hover:underline">Sign in</button></p>)}
          {mode === "forgot" && (<p>Remembered your password? <button onClick={() => setMode("signIn")} className="text-blue-600 hover:underline">Back to sign in</button></p>)}
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
