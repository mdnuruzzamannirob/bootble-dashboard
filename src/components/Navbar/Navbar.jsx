import { Avatar, Badge } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-end gap-6 my-6 pr-12">
      {/* Notification Icon with Badge */}
      <Link
        to="/notifications"
        className="relative size-10 bg-white  rounded-full flex justify-center items-center text-[#121030]"
      >
        <Badge dot offset={[-2, 4]} color="red">
          <IoMdNotificationsOutline size={24} />
        </Badge>
      </Link>

      {/* Profile Section */}
      <Link to="/profile" className="flex items-center gap-3 ">
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-900 leading-none">
            {user?.fullName || "Guest User"}
          </p>
          <p className="text-[12px] text-gray-500 capitalize mt-1">
            {user?.role || "Member"}
          </p>
        </div>

        <Avatar
          size={44}
          src={user?.profilePhoto?.url}
          alt="User Profile"
          className="border-2 border-white shadow-sm "
        >
          {user?.fullName?.charAt(0)}
        </Avatar>
      </Link>
    </div>
  );
}
