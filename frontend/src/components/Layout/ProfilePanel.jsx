import { useEffect, useState } from "react";
import { X, LogOut, Upload, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, logout, updatePassword, updateProfile } from "../../store/slices/authSlice";
import { toggleAuthPopup } from "../../store/slices/popupSlice";

const ProfilePanel = () => {
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile, isUpdatingPassword } = useSelector((state) => state.auth);
  const { isAuthPopupOpen } = useSelector((state) => state.popup);

  const [name, setName] = useState(authUser?.name || "");
  const [email, setEmail] = useState(authUser?.email || "");
  const [avatar, setAvatar] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "");
      setEmail(authUser.email || "");
    }
  }, [authUser]);

  const handleLogout = () => dispatch(logout());

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  const handleUpdatePassword = () => {
    const formData = new FormData();
    formData.append("currentPassword", currentPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmNewPassword", confirmNewPassword);
    dispatch(updatePassword(formData)).then(() => {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    });
  };

  if (!isAuthPopupOpen || !authUser) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="relative w-full sm:w-[360px] h-full bg-white shadow-xl border-l p-4 overflow-y-auto">
        <button onClick={() => dispatch(toggleAuthPopup())} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 rounded"><X className="w-5 h-5" /></button>
        <div className="text-center mb-3"><h2 className="text-xl font-semibold text-gray-900">Profile</h2></div>
        <div className="flex flex-col items-center">
          <label htmlFor="avatar" className="relative cursor-pointer group">
            <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300"><img src={authUser?.avatar?.url || "/avatar-holder.avif"} alt="avatar" className="w-full h-full object-cover rounded-full" /></div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition"><Upload className="text-white w-5 h-5" /></div>
          </label>
          <input id="avatar" type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} className="hidden" />
        </div>
        <div className="flex flex-col items-center py-2 mb-2 mx-auto gap-1">
          <h3 className="text-sm font-bold text-gray-600">{authUser?.name}</h3>
          <h3 className="text-sm font-bold text-gray-600">{authUser?.email}</h3>
        </div>
        <div className="space-y-3 mb-4">
          <div><label className="block text-xs mb-1 text-gray-500">Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-2 py-1.5 border rounded bg-transparent" /></div>
          <div><label className="block text-xs mb-1 text-gray-500">Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-2 py-1.5 border rounded bg-transparent" /></div>
          <button onClick={handleUpdateProfile} disabled={isUpdatingProfile} className="w-full bg-purple-500 text-white py-1.5 rounded hover:bg-purple-600 transition disabled:opacity-60 text-sm">{isUpdatingProfile ? "Updating..." : "Update Profile"}</button>
        </div>
        <div className="border-t my-3" />
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-center text-gray-700">Change Password</h3>
          <div className="relative"><input type={showPassword ? "text" : "password"} placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-2 py-1.5 border rounded bg-transparent pr-8" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-gray-500 rounded">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
          <div className="relative"><input type={showPassword ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-2 py-1.5 border rounded bg-transparent pr-8" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-gray-500 rounded">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
          <div className="relative"><input type={showPassword ? "text" : "password"} placeholder="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="w-full px-2 py-1.5 border rounded bg-transparent pr-8" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2 text-gray-500 rounded">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
        </div>
        <div className="flex gap-1 pt-4">
          <button onClick={handleUpdatePassword} disabled={isUpdatingPassword} className="w-1/2 bg-purple-500 text-white py-1.5 rounded hover:bg-purple-600 transition disabled:opacity-60 text-sm">{isUpdatingPassword ? "Updating..." : "Update Password"}</button>
          <button onClick={handleLogout} className="w-1/2 flex items-center justify-center gap-2 text-white border py-2 bg-red-500 rounded hover:bg-red-600 text-sm"><LogOut className="w-4 h-4" /> Logout</button></div>
      </div>
    </div>
  );
};

export default ProfilePanel;
