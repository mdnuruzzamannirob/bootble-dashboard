import { useState, useEffect } from "react";
import { Tabs, Input, Avatar, message, Upload, Button } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import BackButton from "../SharedComponents/BackButton";
import PrimaryButton from "../SharedComponents/PrimaryButton";
import { useAuth } from "@/hooks/useAuth";
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from "@/store/features/profile/profileApi";
import "./profile.css";

const { TabPane } = Tabs;
const { Password } = Input;

export default function Profile() {
  const { user } = useAuth();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPass }] =
    useChangePasswordMutation();

  // State matching your JSON structure
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    location: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Dynamic data loading
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        contactNumber: user.contactNumber || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // 1. Update Profile Logic
  const handleUpdateProfile = async () => {
    try {
      await updateProfile({
        fullName: formData.fullName,
        contactNumber: formData.contactNumber,
        location: formData.location,
      }).unwrap();
      message.success("Profile updated successfully!");
    } catch (err) {
      message.error(err?.data?.message || "Failed to update profile");
    }
  };

  // 2. Change Password Logic
  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      return message.warning("Please fill all password fields");
    }
    if (passwordData.newPassword === passwordData.currentPassword) {
      return message.error(
        "New password must be different from current password!"
      );
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return message.error("New passwords do not match!");
    }
    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();
      message.success("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      message.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="rounded-[8px] bg-white shadow-lg p-12">
      <BackButton text="Profile" />

      {/* Avatar Section */}
      <div className="flex flex-col items-center">
        <div className="relative group">
          <Avatar
            size={110}
            src={user?.profilePhoto?.url}
            className="border-4 border-gray-100 shadow-sm"
          >
            {user?.fullName?.charAt(0)}
          </Avatar>
          <Upload showUploadList={false} accept="image/*">
            <div className="absolute bottom-1 right-1 bg-[#121030] rounded-full p-2 text-white cursor-pointer hover:bg-blue-600 transition-colors shadow-md">
              <IoCameraOutline size={20} />
            </div>
          </Upload>
        </div>
        <h2 className="mt-4 text-[28px] font-semibold text-[#121030]">
          {user?.fullName}
        </h2>
        <p className="text-gray-500 capitalize">{user?.role}</p>
      </div>

      <Tabs defaultActiveKey="1" centered className="mt-8 custom-tabs">
        <TabPane tab="Edit Profile" key="1">
          <div className="space-y-5 max-w-xl mx-auto mt-6">
            <div className="grid grid-cols-1 gap-4 text-[#333]">
              <div className="space-y-1">
                <label className="font-medium">User Name</label>
                <Input
                  name="fullName" // Matched with state
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="py-2.5 px-4 rounded-md border-gray-400"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  disabled
                  className="py-2.5 px-4 rounded-md bg-gray-50 text-gray-400"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium">Contact no</label>
                <Input
                  name="contactNumber" // Matched with state
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="py-2.5 px-4 rounded-md border-gray-400"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium">Address</label>
                <Input
                  name="location" // Matched with state
                  value={formData.location}
                  onChange={handleInputChange}
                  className="py-2.5 px-4 rounded-md border-gray-400"
                />
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <div onClick={handleUpdateProfile}>
                <Button
                  loading={isUpdating}
                  disabled={isUpdating}
                  style={{
                    backgroundColor: "#121030",
                    border: "none",
                    color: "#FEFEFE",
                    borderRadius: 4,
                    height: "48px",
                    padding: "0 44px",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                  }}
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabPane>

        <TabPane tab="Change Password" key="2">
          <div className="space-y-5 max-w-xl mx-auto mt-6">
            <div className="space-y-1">
              <label className="font-medium">Current Password</label>
              <Password
                name="currentPassword" // Matched with state
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="**********"
                className="py-2.5 px-4 border-gray-400"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium">New Password</label>
              <Password
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="**********"
                className="py-2.5 px-4 border-gray-400"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium">Confirm Password</label>
              <Password
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="**********"
                className="py-2.5 px-4 border-gray-400"
              />
            </div>
            <div className="flex justify-center pt-10">
              <div onClick={handleChangePassword}>
                <Button
                  loading={isChangingPass}
                  disabled={isChangingPass}
                  style={{
                    backgroundColor: "#121030",
                    border: "none",
                    color: "#FEFEFE",
                    borderRadius: 4,
                    height: "48px",
                    padding: "0 44px",
                    display: "flex",
                    alignItems: "center",
                    fontFamily: "Inter, sans-serif",
                    fontSize: 16,
                  }}
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
