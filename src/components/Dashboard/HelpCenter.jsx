import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { EyeOutlined, RollbackOutlined } from '@ant-design/icons';
import HelpDetailsModal from './HelpDetailsModal';
import ReplyModal from './ReplyModal'; // ✅ import your reply modal here
import { Link } from 'react-router-dom';
import viewSign from '/images/view.png';
import replySign from '/images/reply.png';

export default function HelpCenter() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);

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
      key: '1',
      ticketId: '#1233',
      date: '2/11/12',
      email: 'bockely@att.com',
      mobileNumber: '(907) 555-0101',
      message: "I Didn't Receive My Referral R...",
    },
    {
      key: '2',
      ticketId: '#1233',
      date: '5/27/15',
      email: 'csilvers@rizon.com',
      mobileNumber: '(270) 555-0117',
      message: 'How Long Does It Take to Re...',
    },
    {
      key: '3',
      ticketId: '#1233',
      date: '9/18/16',
      email: 'gamaho@gmail.com',
      mobileNumber: '(219) 555-0114',
      message: 'Can I Refer Someone Outside...',
    },
    {
      key: '4',
      ticketId: '#1233',
      date: '7/27/13',
      email: 'xterris@gmail.com',
      mobileNumber: '(252) 555-0126',
      message: 'My Referral Signed Up, But I...',
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
      width: 220,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      key: 'mobileNumber',
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
         
           <a  onClick={() => handleView(record)}
            type="primary"> <img src={viewSign} alt="view" /></a>
          <a  onClick={() => handleReply(record)}
            type="primary"><img src={replySign} alt="reply" /></a>
        </div>
      ),
    },
  ];

  return (
    <>
      <style>
        {`
          .ant-table-thead > tr > th {
            background-color: transparent !important;
            border-right: none !important;
            border-bottom: none !important;
            font-size: 16px;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
          }

          .ant-table-tbody > tr > td {
            border-right: none !important;
            border-bottom: none !important;
            font-size: 15px;
            font-family: 'Inter', sans-serif;
            font-weight: 400;
          }

          .ant-table-cell {
            border-right: none !important;
            border-bottom: none !important;
          }

          .ant-table-content table {
            border-collapse: collapse !important;
          }

          .ant-table-thead > tr:hover > th {
            background-color: transparent !important;
          }
        `}
      </style>

      <div className="flex items-center justify-center">
        <div className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex justify-between pl-4 pr-12 pt-6 pb-4">
            <h2 className="inter-semibold">Help Center</h2>
            <Link to="/help-center" className="font-[Inter] text-blue-700">
              View all
            </Link>
          </div>

          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered={false}
            className="rounded-lg overflow-hidden"
            rowClassName={(record, index) => (index === dataSource.length - 1 ? '' : '')}
          />
        </div>
      </div>

      {/* 👁️ Details Modal */}
      <HelpDetailsModal
        open={isModalVisible}
        onCancel={handleCancel}
        order={selectedOrder}
      />

      {/* 💬 Reply Modal */}
      <ReplyModal
        open={isReplyModalVisible}
        onCancel={handleReplyCancel}
        onAdd={handleReplySubmit}
        fieldLabel="Question"
        fieldName="question"
        placeholder="Type question here"
      />
    </>
  );
}
