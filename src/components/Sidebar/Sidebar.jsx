import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineStore, MdUnsubscribe } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AppstoreOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Menu, Modal } from "antd";
import { FiLogOut } from "react-icons/fi";
import { GiMeditation } from "react-icons/gi";
import { AiOutlineEuro } from "react-icons/ai";
import logo from "/images/logo.svg";
import { useAuth } from "@/hooks/useAuth";
import "./sidebar.css";

const items = [
  {
    key: "/",
    icon: <AppstoreOutlined style={{ fontSize: "24px" }} />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "/user-management",
    icon: <HiOutlineUserCircle size={24} />,
    label: <Link to="/user-management">User Management</Link>,
  },
  {
    key: "/subscriptions",
    icon: <MdUnsubscribe size={24} />,
    label: <Link to="/subscriptions">Subscriptions</Link>,
  },
  {
    key: "/add-meditation",
    icon: <GiMeditation size={24} />,
    label: <Link to="/add-meditation">Add Meditation</Link>,
  },
  {
    key: "/transaction",
    icon: <AiOutlineEuro size={24} />,
    label: <Link to="/transaction">Transaction</Link>,
  },
  {
    key: "sub1",
    label: "Contact & FAQs",
    icon: <MdOutlineStore size={24} />,
    children: [
      {
        key: "/contact-support",
        label: <Link to="/contact-support">Contact Support</Link>,
      },
      { key: "/FAQs", label: <Link to="/FAQs">FAQs</Link> },
    ],
  },
  {
    key: "sub2",
    label: "Settings",
    icon: <IoSettingsOutline size={24} />,
    children: [
      { key: "/profile", label: <Link to="/profile">Profile</Link> },
      {
        key: "/terms-conditions",
        label: <Link to="/terms-conditions">Terms & Conditions</Link>,
      },
      {
        key: "/privacy-policy",
        label: <Link to="/privacy-policy">Privacy Policy</Link>,
      },
    ],
  },
];

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showLogoutModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const handleLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#EBEBFF] min-h-screen flex flex-col justify-between border-r border-gray-200">
      {/* Top Section */}
      <div>
        <div className="flex justify-center p-6">
          <img className="w-40" src={logo} alt="logo" />
        </div>

        {/* Menu */}
        <Menu
          className="custom-sidebar-menu inter-medium bg-transparent border-none"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={["sub1", "sub2"]}
          mode="inline"
          theme="light"
          items={items}
        />
      </div>

      {/* Logout Button Section */}
      <div className="px-4 pb-8">
        <Button
          onClick={showLogoutModal}
          className="logout-button inter-medium w-full flex items-center justify-start h-12 rounded-xl border-none text-gray-600 hover:!bg-red-50 hover:!text-red-500 transition-all duration-300"
          type="text"
          icon={<FiLogOut style={{ fontSize: "22px" }} />}
        >
          <span className="ml-2 font-semibold">Log out</span>
        </Button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        open={isModalOpen}
        onOk={handleLogout}
        onCancel={handleCancel}
        footer={null}
        centered
        maskClosable={true}
        width={400}
        className="logout-modal"
      >
        <div className="flex flex-col items-center text-center p-4">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <ExclamationCircleOutlined className="text-red-500 text-4xl" />
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">Logout</h2>
          <p className="text-gray-500 mb-8">
            Are you sure you want to log out from the system?
          </p>

          <div className="flex gap-4 w-full">
            <Button
              onClick={handleCancel}
              className="flex-1 h-11 rounded-lg border-gray-300 font-medium"
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogout}
              type="primary"
              danger
              className="flex-1 h-11 rounded-lg bg-red-500 hover:bg-red-600 font-medium"
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
