import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import avatar from "../assets/avatar.jpg";
import { updateAdminProfile, updateAdminPassword } from "../store/slices/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: null,
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", profileData.name);
    data.append("email", profileData.email);
    if (profileData.avatar) data.append("avatar", profileData.avatar);
    dispatch(updateAdminProfile(data));
    setIsEditProfile(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAdminPassword(passwordData));
    setIsEditPassword(false);
  };

  return (
    <div className="max-h-screen w-full px-12 py-3">
      <Header />
      <div className="p-6 flex flex-col">
        <h2 className="text-3xl font-semibold text-purple-600 mb-4">Profile</h2>

        <div className="bg-white w-full p-6 rounded shadow-md">
          <h2 className="text-xl p-3 font-medium text-purple-600 mb-4">Profile Information</h2>

          {!isEditProfile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={user?.avatar?.url || avatar} alt="avatar" className="w-20 h-20 rounded-full object-cover" />
                <div>
                  <p className="text-lg font-medium">{user?.name}</p>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm font-medium text-gray-500 py-1 rounded-md">role: {user?.role}</p>
                </div>
              </div>
              <button onClick={() => setIsEditProfile(true)} className="px-4 py-1 bg-purple-500 rounded text-white">Edit</button>
            </div>
          ) : (
            <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Name</label>
                <input type="text" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} className="w-full border px-3 py-2 rounded-md" />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Email</label>
                <input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} className="w-full border px-3 py-2 rounded-md" />
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Avatar</label>
                <input type="file" accept="image/*" onChange={(e) => setProfileData({ ...profileData, avatar: e.target.files[0] })} className="w-full" />
              </div>

              <div className="flex gap-3">
                <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
                <button type="button" onClick={() => setIsEditProfile(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
              </div>
            </form>
          )}

          <div className="bg-white my-4 p-3 rounded shadow-md">
            <h2 className="text-xl font-medium text-purple-600 mb-4">Change Password</h2>

            {!isEditPassword ? (
              <button onClick={() => setIsEditPassword(true)} className="px-4 py-2 bg-purple-600 text-white rounded">Update Password</button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">Old Password</label>
                  <input type="password" value={passwordData.oldPassword} onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })} className="w-full border px-3 py-2 rounded-md" />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">New Password</label>
                  <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full border px-3 py-2 rounded-md" />
                </div>

                <div>
                  <label className="block text-gray-600 mb-1">Confirm Password</label>
                  <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full border px-3 py-2 rounded-md" />
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">Save</button>
                  <button type="button" onClick={() => setIsEditPassword(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;
