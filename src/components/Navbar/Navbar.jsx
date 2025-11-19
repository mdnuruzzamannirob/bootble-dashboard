import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Button } from 'antd';
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import ProfileImg from '/images/robert_smith.png'
export default function Navbar() {
  return (
    <div className='flex items-center gap-3 my-[24px] pr-12 justify-end '> 
      <div className='h-[42px] w-[42px] bg-[#121030] rounded-full mr-6 flex  justify-center items-center'>
        <Link to="/notifications"><IoMdNotificationsOutline className='text-white h-[24px] w-[24px] '/></Link>
        
      </div>
      <img className='h-[44px] w-[44px] rounded-full' src={ProfileImg} alt="image" />
      
      
       <Button color="default" variant="link" className='poppins-medium'>
           <Link to="/profile">Robert Smith</Link>
          </Button>
          
      
    </div>
  )
}
