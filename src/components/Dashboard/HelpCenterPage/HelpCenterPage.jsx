import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import { SearchOutlined, EyeOutlined, RollbackOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import HelpDetailsModal from '../HelpDetailsModal';
import ReplyModal from '../ReplyModal';
import './helpCenterPage.css';
import Container from '../../SharedComponents/Container';
import BackButton from '../../SharedComponents/BackButton';
import SearchButton from '../../SharedComponents/SearchButton';
import CustomPagination from '../../SharedComponents/CustomPagination/CustomPagination';

import viewSign from '/images/view.png';
import replySign from '/images/reply.png';

export default function HelpCenterPage() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleView = (record) => {
    setSelectedOrder({
      name: record.email.split('@')[0],
      address: '123 Main Street, NY',
      date: record.date,
      payment: 'Paid',
      status: 'Delivered',
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleReply = (record) => {
    setSelectedReply(record);
    setIsReplyModalVisible(true);
  };

  const handleReplyCancel = () => {
    setIsReplyModalVisible(false);
    setSelectedReply(null);
  };

  const handleReplySubmit = (value) => {
    console.log('Reply submitted:', value);
    setIsReplyModalVisible(false);
  };

  const dataSource = [
    {
      key: 1,
      ticketId: '#1233',
      date: '2/11/12',
      email: 'bockely@att.com',
      phone: '(907) 555-0101',
      message: 'I Didn’t Receive My Referral R...',
    },
    {
      key: 2,
      ticketId: '#1233',
      date: '5/27/15',
      email: 'csilvers@rizon.com',
      phone: '(270) 555-0117',
      message: 'How Long Does It Take to Re...',
    },
    {
      key: 3,
      ticketId: '#1233',
      date: '9/18/16',
      email: 'qamaho@mail.com',
      phone: '(219) 555-0114',
      message: 'Can I Refer Someone Outside...',
    },
    {
      key: 4,
      ticketId: '#1233',
      date: '7/27/13',
      email: 'xterris@gmail.com',
      phone: '(252) 555-0126',
      message: 'My Referral Signed Up, But I...',
    },
    {
      key: 5,
      ticketId: '#1233',
      date: '4/4/18',
      email: 'xterris@gmail.com',
      phone: '(217) 555-0113',
      message: 'I Referred a Friend, But They...',
    },
    {
      key: 6,
      ticketId: '#1233',
      date: '12/10/13',
      email: 'xterris@gmail.com',
      phone: '(480) 555-0103',
      message: 'How Long Does It Take to Re...',
    },
    {
      key: 7,
      ticketId: '#1233',
      date: '5/19/12',
      email: 'xterris@gmail.com',
      phone: '(205) 555-0100',
      message: 'My Account Was Flagged for...',
    },
    {
      key: 8,
      ticketId: '#1233',
      date: '7/18/17',
      email: 'xterris@gmail.com',
      phone: '(603) 555-0123',
      message: 'Can I Withdraw My Rewards...',
    },
    {
      key: 9,
      ticketId: '#1233',
      date: '8/21/15',
      email: 'xterris@gmail.com',
      phone: '(684) 555-0102',
      message: 'My Referral Signed Up, But I...',
    },
    {
      key: 10,
      ticketId: '#1233',
      date: '8/2/19',
      email: 'xterris@gmail.com',
      phone: '(406) 555-0120',
      message: 'How Long Does It Take to Re...',
    },
  ];

  const columns = [
    {
      title: 'Ticket ID',
      dataIndex: 'ticketId',
      key: 'ticketId',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      width: 120,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>

          <a onClick={() => handleView(record)}
            type="primary"> <img src={viewSign} alt="view" /></a>
          <a onClick={() => handleReply(record)}
            type="primary"><img src={replySign} alt="reply" /></a>
        </div>
      ),
    },
  ];

  return (
    <>
     
        <div className="bg-white p-6 rounded-[8px] shadow-lg">
          <div className="mb-6 flex justify-between items-center">
            <BackButton text="Help Center"></BackButton>
            <SearchButton></SearchButton>
          </div>

          <Table
            dataSource={dataSource}
            columns={columns}
            className="rounded-lg overflow-hidden custom-table"
            pagination={CustomPagination({ currentPage, setCurrentPage})}
          />

          {/* 👁️ Details Modal */}
          <HelpDetailsModal open={isModalVisible} onCancel={handleCancel} order={selectedOrder} />

          {/* 💬 Reply Modal */}
          <ReplyModal
            open={isReplyModalVisible}
            onCancel={handleReplyCancel}
            onAdd={handleReplySubmit}
            fieldLabel="Question"
            fieldName="question"
            placeholder="Type question here"
          />
        </div>
   
    </>
  );
}
