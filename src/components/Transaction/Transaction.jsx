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
    subscription: 'Silver',
    status: 'Completed',
    avatar: '/images/users/user1.png',
  },
  {
    key: '2',
    name: 'Jerome Bell',
    date: '12/03/25',
    subscription: 'Gold',
    
    status: 'Canceled',
    avatar: '/images/users/user2.png',
  },
  {
    key: '3',
    name: 'Ronald Richards',
    date: '12/03/25',
    subscription: 'Silver',
 
    status: 'Completed',
    avatar: '/images/users/user3.png',
  },
  {
    key: '4',
    name: 'Dianne Russell',
    date: '12/03/25',
    subscription: 'Gold',
    
    status: 'Expired',
    avatar: '/images/users/user4.png',
  },
  {
    key: '5',
    name: 'Albert Flores',
    date: '12/03/25',
    subscription: 'Diamond',
   
    status: 'Completed',
    avatar: '/images/users/user5.png',
  },
  {
    key: '6',
    name: 'Eleanor Pena',
    date: '12/03/25',
    subscription: 'Gold',
    status: 'Pending',
    avatar: '/images/users/user6.png',
  },
  {
    key: '7',
    name: 'Floyd Miles',
    date: '12/03/25',
    subscription: 'Diamond',
   
    status: 'Pending',
    avatar: '/images/users/user7.png',
  },
  {
    key: '8',
    name: 'Cody Fisher',
    date: '12/03/25',
    subscription: 'Diamond',
    address: 'Rockford, IL 61109',
    payment: 'Paid',
    status: 'Expired',
    avatar: '/images/users/user8.png',
  },
  {
    key: '9',
    name: 'Ralph Edwards',
    date: '12/03/25',
    subscription: 'Diamond',
    address: 'Anna Maria, FL 346',
    payment: 'Paid',
    status: 'Completed',
    avatar: '/images/users/user9.png',
  },
  {
    key: '10',
    name: 'Devon Lane',
    date: '12/03/25',
    subscription: 'Diamond',
    status: 'Expired',
    avatar: '/images/users/user10.png',
  },
];

const getTagColor = (status) => {
  
   {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'Canceled':
        return 'red';
      case 'Expired':
        return 'gold';
      case 'Pending':
        return 'blue';
      default:
        return 'default';
    }
  }
};


export default function Transaction() {

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
      title: 'Tran Id.',
      dataIndex: 'key',
      key: 'transaction',
      render: () => '#1233',
    },
    {
      title: 'User ',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} style={{ width: 48, height: 48, borderRadius: 8 }} />
          {text}
        </Space>
      ),
    },
    { title: 'Date', dataIndex: 'date', key: 'date',align: 'center' },
    { title: 'Subscription', dataIndex: 'subscription', key: 'subscription' , align: 'center'},
    
    {
      title: 'Payment Status',
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
    
  ];


  return (


    <>
    
        <div className="bg-white p-6 rounded-[8px] shadow-lg">
          <div className="mb-6 flex justify-between items-center">
            <BackButton text="Transactions"></BackButton>
            {/* <SearchButton></SearchButton> */}
            
          </div>

          <Table
            className="custom-table"
            columns={columns}
            dataSource={data}
            pagination={CustomPagination({ currentPage, setCurrentPage})}
            bordered={false}
          />
        </div>
     

      

    </>
  )
}
