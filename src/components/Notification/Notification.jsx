import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteOutlined } from '@ant-design/icons'
import { Pagination } from 'antd';
import Container from '../SharedComponents/Container';
import BackButton from '../SharedComponents/BackButton';
import CustomPagination from '../SharedComponents/CustomPagination/CustomPagination';

import DeleteSign from '/images/delete-small.png';
import PrimaryButton from '../SharedComponents/PrimaryButton';


const data = [
  {
    key: '1',
    details: 'New Customer Registered – New user signed up: Nayeem Akash (nayeem@email.com).',
    time: 'Just Now',
  },
  {
    key: '2',
    details: 'Support Ticket Opened: – New support ticket from Farhana K. .',
    time: '5 min ago',
  },
  {
    key: '3',
    details: 'Feedback forms for the last episode have been completed by participants.',
    time: '30 min ago',
  },
  {
    key: '4',
    details: 'Reminder: The next podcast episode is scheduled for tomorrow at 5 PM.',
    time: '6 hours ago',
  },
  {
    key: '5',
    details: 'Podcast episode has been successfully completed.',
    time: '8 hours ago',
  },
]

export default function Notification() {
  
  return (
    <>

      <div className="rounded-[8px] bg-white shadow-lg p-12">

        {/* Header */}
        <div className='mb-[24px]'>
          <BackButton text="Notifications"></BackButton>
        </div>
        {/* Sub-header */}
        <div className="mb-[32px]">
          <h3 className="text-[18px] font-[Inter] font-semibold">Total 128 Notifications</h3>
        </div>

        {/* Notification List */}
        <div className="space-y-4">
          {data.map((item) => (
            <div
              key={item.key}
              className={`flex justify-between items-center p-4 rounded-[4px] `}
            >
              <div className="text-[16px] font-[Inter] text-[#232323]">{item.details}</div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-[16px] font-[Inter] mr-4">{item.time}</span>
                {/* <DeleteOutlined className="text-red-500 cursor-pointer" /> */}
                {/* <img src={DeleteSign} alt="" /> */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {/* <div className="flex justify-center mt-12">
          <Pagination
            {...CustomPagination({
              currentPage,
              setCurrentPage,
              total: 1000,
              pageSize: 10,
            })}
          />


        </div> */}

       <div className='flex justify-center'>
         <PrimaryButton text="Show More"/>
       </div>
      </div>

    </>
  )
}
