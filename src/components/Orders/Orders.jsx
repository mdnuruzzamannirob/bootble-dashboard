import React, { useState } from 'react';
import { Table, Tag, Button, Avatar, Input, Space } from 'antd';
import DetailsModal from './DetailsModal';
import './order.css';
import EditModal from './EditModal';
import Container from '../SharedComponents/Container';
import BackButton from '../SharedComponents/BackButton';
import SearchButton from '../SharedComponents/SearchButton';
import CustomPagination from '../SharedComponents/CustomPagination/CustomPagination';
import ViewSign from '/images/view.png'
import EditSign from '/images/edit.png'


const { Search } = Input;

const data = [
  {
    key: '1',
    name: 'Annette Black',
    date: '12/03/25',
    total: '$58',
    address: 'West Greenwich, RI7',
    payment: 'Paid',
    status: 'Completed',
    avatar: '/images/users/user1.png',
  },
  {
    key: '2',
    name: 'Jerome Bell',
    date: '12/03/25',
    total: '$77',
    address: 'Jericho, NY 11753',
    payment: 'Pending',
    status: 'Canceled',
    avatar: '/images/users/user2.png',
  },
  {
    key: '3',
    name: 'Ronald Richards',
    date: '12/03/25',
    total: '$28',
    address: 'Aurora, OR 97002',
    payment: 'Paid',
    status: 'Completed',
    avatar: '/images/users/user3.png',
  },
  {
    key: '4',
    name: 'Dianne Russell',
    date: '12/03/25',
    total: '$94',
    address: 'Midland Park, NJ 072',
    payment: 'Paid',
    status: 'Shipped',
    avatar: '/images/users/user4.png',
  },
  {
    key: '5',
    name: 'Albert Flores',
    date: '12/03/25',
    total: '$55',
    address: 'Saint Cloud, FL 349',
    payment: 'Pending',
    status: 'Completed',
    avatar: '/images/users/user5.png',
  },
  {
    key: '6',
    name: 'Eleanor Pena',
    date: '12/03/25',
    total: '$85',
    address: 'Vineland, NJ 08360',
    payment: 'Paid',
    status: 'In Progress',
    avatar: '/images/users/user6.png',
  },
  {
    key: '7',
    name: 'Floyd Miles',
    date: '12/03/25',
    total: '$68',
    address: 'Castleton On Hudson',
    payment: 'Pending',
    status: 'Canceled',
    avatar: '/images/users/user7.png',
  },
  {
    key: '8',
    name: 'Cody Fisher',
    date: '12/03/25',
    total: '$30',
    address: 'Rockford, IL 61109',
    payment: 'Paid',
    status: 'Shipped',
    avatar: '/images/users/user8.png',
  },
  {
    key: '9',
    name: 'Ralph Edwards',
    date: '12/03/25',
    total: '$45',
    address: 'Anna Maria, FL 346',
    payment: 'Paid',
    status: 'Completed',
    avatar: '/images/users/user9.png',
  },
  {
    key: '10',
    name: 'Devon Lane',
    date: '12/03/25',
    total: '$24',
    address: 'Mountain View, C 3',
    payment: 'Pending',
    status: 'Shipped',
    avatar: '/images/users/user10.png',
  },
];

const getTagColor = (status, type) => {
  if (type === 'payment') {
    return status === 'Paid' ? 'green' : 'orange';
  }
  if (type === 'order') {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Canceled':
        return 'red';
      case 'Shipped':
        return 'gold';
      case 'In Progress':
        return 'blue';
      default:
        return 'default';
    }
  }
};


export default function Orders() {

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedEditOrder, setSelectedEditOrder] = useState(null);


  const handleView = (record) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setSelectedEditOrder(record);
    setIsEditModalVisible(true);
  };


  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    setSelectedEditOrder(null);
  };


  const columns = [
    {
      title: 'Order No.',
      dataIndex: 'key',
      key: 'orderNo',
      render: () => '#1233',
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} style={{ width: 48, height: 48, borderRadius: 8 }} />
          {text}
        </Space>
      ),
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
    { title: 'Shipping Address', dataIndex: 'address', key: 'address' },
    {
      title: 'Payment Status',
      dataIndex: 'payment',
      key: 'payment',
      align: 'center',
      render: (status) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tag
            color={getTagColor(status, 'payment')}
            style={{
              borderRadius: 226,
              width: 125,
              height: 36,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Inter',
            }}
          >
            {status}
          </Tag>
        </div>

      ),
    },
    {
      title: 'Order Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Tag
            color={getTagColor(status, 'order')}
            style={{
              borderRadius: 226,
              width: 125,
              height: 36,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontFamily: 'Inter',
            }}
          >
            {status}
          </Tag>
        </div>

      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      render: (_, record) => (
        <Space>
          <a type="text" onClick={() => handleView(record)}>
            <img src={ViewSign} alt="view" />
          </a>
          <a type="text" onClick={() => handleEdit(record)}>
            <img src={EditSign} alt="edit" />
          </a>
        </Space>
      ),
    },
  ];


  return (


    <>
    
        <div className="bg-white p-6 rounded-[8px] shadow-lg">
          <div className="mb-6 flex justify-between items-center">
            <BackButton text="Order Management"></BackButton>
            <SearchButton></SearchButton>
            
          </div>

          <Table
            className="custom-table"
            columns={columns}
            dataSource={data}
            pagination={CustomPagination({ currentPage, setCurrentPage})}
            bordered={false}
          />
        </div>
     

      {/* View Modal */}
      <DetailsModal open={isModalVisible} onCancel={handleCancel} order={selectedOrder} />

      {/* Edit modal */}
      <EditModal
        open={isEditModalVisible}
        onCancel={handleEditCancel}
        initialStatus={selectedEditOrder?.status}
        initialPayment={selectedEditOrder?.payment}
      />

    </>
  )
}
