import { useState, useEffect } from "react";
import { Tabs, Input, Avatar, message, Upload, Button } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import BackButton from "../SharedComponents/BackButton";
import { useAuth } from "@/hooks/useAuth";
import { useGetMeQuery } from "@/store/features/auth/authApi"; // getMe query import
import {
  useChangePasswordMutation,
  useUpdateProfileMutation,
} from "@/store/features/profile/profileApi";
import "./profile.css";

const { TabPane } = Tabs;
const { Password } = Input;

export default function Profile() {
  const { user } = useAuth();
  const { refetch } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword, { isLoading: isChangingPass }] =
    useChangePasswordMutation();

  const [isTextUpdating, setIsTextUpdating] = useState(false);
  const [isImageUpdating, setIsImageUpdating] = useState(false);

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

  // --- Logic 1: Profile Image Update ---
  const handleImageUpload = async (file) => {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    const data = new FormData();
    data.append("profilePhoto", file);

    setIsImageUpdating(true);
    try {
      await updateProfile(data).unwrap();
      await refetch();
      message.success("Profile picture updated!");
    } catch (err) {
      message.error(err?.data?.message || "Image upload failed");
    } finally {
      setIsImageUpdating(false);
    }
    return false;
  };

  // --- Logic 2: Profile Info (Text) Update ---
  const handleUpdateProfile = async () => {
    setIsTextUpdating(true);
    try {
      await updateProfile({
        fullName: formData.fullName,
        contactNumber: formData.contactNumber,
        location: formData.location,
      }).unwrap();
      await refetch(); // Update er por getMe call
      message.success("Profile updated successfully!");
    } catch (err) {
      message.error(err?.data?.message || "Failed to update profile");
    } finally {
      setIsTextUpdating(false); // Button loading off
    }
  };

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword)
      return message.warning("Please fill all fields");
    if (passwordData.newPassword !== passwordData.confirmPassword)
      return message.error("Passwords do not match!");

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

  const buttonStyle = {
    backgroundColor: "#121030",
    border: "none",
    color: "#FEFEFE",
    borderRadius: 4,
    height: "48px",
    padding: "0 44px",
    display: "flex",
    alignItems: "center",
    fontSize: 16,
  };

  return (
    <div className="rounded-[8px] bg-white shadow-lg p-12">
      <BackButton text="Profile" />

      <div className="flex flex-col items-center">
        <div className="relative group">
          <Avatar
            size={110}
            src={user?.profilePhoto?.url}
            className={`border-4 border-gray-100 shadow-sm ${
              isImageUpdating ? "opacity-40" : ""
            }`}
          >
            {user?.fullName?.charAt(0)}
          </Avatar>

          <Upload
            showUploadList={false}
            beforeUpload={handleImageUpload}
            accept="image/*"
            disabled={isImageUpdating}
          >
            <div className="absolute bottom-1 right-1 bg-[#121030] rounded-full p-2 text-white cursor-pointer shadow-md">
              {isImageUpdating ? (
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <IoCameraOutline size={20} />
              )}
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
              {/* Inputs ... */}
              <div className="space-y-1">
                <label className="font-medium">User Name</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="py-2.5 px-4"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium">Email</label>
                <Input
                  value={formData.email}
                  disabled
                  className="py-2.5 px-4 bg-gray-50 opacity-60"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium">Contact no</label>
                <Input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="py-2.5 px-4"
                />
              </div>
              <div className="space-y-1">
                <label className="font-medium">Address</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="py-2.5 px-4"
                />
              </div>
            </div>
            <div className="flex justify-center pt-6">
              <Button
                loading={isTextUpdating}
                disabled={isTextUpdating}
                onClick={handleUpdateProfile}
                style={buttonStyle}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </TabPane>

        <TabPane tab="Change Password" key="2">
          <div className="space-y-5 max-w-xl mx-auto mt-6">
            {/* Password fields ... */}
            <div className="space-y-1">
              <label className="font-medium">Current Password</label>
              <Password
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="**********"
                className="py-2.5 px-4"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium">New Password</label>
              <Password
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="**********"
                className="py-2.5 px-4"
              />
            </div>
            <div className="space-y-1">
              <label className="font-medium">Confirm Password</label>
              <Password
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="**********"
                className="py-2.5 px-4"
              />
            </div>
            <div className="flex justify-center pt-10">
              <Button
                loading={isChangingPass}
                onClick={handleChangePassword}
                style={buttonStyle}
              >
                Update Password
              </Button>
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
