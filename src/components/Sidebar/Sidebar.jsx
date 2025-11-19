
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { FiBox, FiLogOut } from "react-icons/fi";
import { MdOutlineStore, MdListAlt } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import {AppstoreOutlined} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import logo from '/images/logo.svg';
import './sidebar.css'



const items = [
    { key: '/', icon: <AppstoreOutlined style={{ fontSize: '24px' }} />, label: <Link to="/">Dashboard</Link> },
    { key: '/user-management', icon: <HiOutlineUserCircle size={24} />, label: <Link to="/user-management">User Management</Link> },
    { key: '/order-management', icon: <MdListAlt size={24} />, label: <Link to="/order-management">Order Management</Link> },
    { key: '/category', icon: <MdOutlineCategory size={24} />, label: <Link to="/category">Categories</Link> },
    { key: '/products', icon: <FiBox size={24} />, label: <Link to="/products">Products</Link> },
    {
        key: 'sub1',
        label: 'Help & FAQs',
        icon: <MdOutlineStore size={24} />,
        children: [
            { key: '/help-support', label: <Link to="/help-support">Help & Support</Link> },
            { key: '/FAQs', label: <Link to="/FAQs">FAQs</Link> },

        ],
    },
    {
        key: 'sub2',
        label: 'Settings',
        icon: <IoSettingsOutline size={24} />,
        children: [
            { key: '/profile', label: <Link to="/profile">Profile</Link> },
            // { key: '/about', label: <Link to="/about">About Us</Link> },
            { key: '/terms-contiditions', label: <Link to="/terms-contiditions">Terms & Conditions</Link> },
            { key: '/privacy-policy', label: <Link to="/privacy-policy">Privacy Policy</Link> },

        ],
    },
];



export default function Sidebar() {
    const location = useLocation();


    return (
        <div className=' bg-[#EBEBFF] min-h-screen flex flex-col justify-between '>

            {/* Top Section */}
            <div >
                {/* Logo */}
                <div>
                    <img className='  pt-[16px] pb-[24px]' src={logo} alt="logo" />
                </div>

                {/* Menu */}
                <Menu
                    className="custom-sidebar-menu inter-medium"
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={['sub1', 'sub2']}
                    mode="inline"
                    theme="light"
                    
                    items={items}
                />

            </div>


            {/* Bottom Section */}
            <div className="mr-2 ">
                <Link to="/login">
                    <Button
                        className="logout-button inter-medium "
                        type="text"
                        icon={<FiLogOut style={{ fontSize: '24px' }} />}

                    >
                        Log out
                    </Button>
                </Link>
            </div>


        </div>

    )
}
