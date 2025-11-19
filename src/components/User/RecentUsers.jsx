
import { Table, Avatar, Input, Button, Space } from 'antd';
import './User.css'

import dangerSign from '/images/users/danger.png'
import { Link } from 'react-router-dom';

// Dummy data
const data = Array.from({ length: 4 }, (_, index) => ({
  key: index,
  sl: '#1233',
  name: ['Annette Black', 'Jerome Bell', 'Ronald Richards', 'Dianne Russell', 'Albert Flores', 'Eleanor Pena', 'Floyd Miles', 'Cody Fisher', 'Ralph Edwards', 'Devon Lane'][index],
  email: index < 2 ? ['bockely@att.com', 'csilvers@rizon.com'][index] : 'xterris@gmail.com',
 
  address: [
    'West Greenwich, RI7', 'Jericho, NY 11753', 'Aurora, OR 97002', 'Midland Park, NJ 072',
    'Saint Cloud, FL 349', 'Vineland, NJ 08360', 'Castleton On Hudson', 'Rockford, IL 61109',
    'Anna Maria, FL 346', 'Mountain View, C 3'
  ][index],
  avatar: `/images/users/user${index + 1}.png`,
}));

// Columns
const columns = [
  {
    title: 'SL No.',
    dataIndex: 'sl',
    key: 'sl',

  },
  {
    title: 'Full Name',
    key: 'name',
    render: (_, record) => (
      <Space>
        <Avatar src={record.avatar}
          style={{ width: 48, height: 48, borderRadius: 8 }}
          shape="square"
        />
        {record.name}
      </Space>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    
    align: 'center',
    render: () => (

      <button className='cursor-pointer'><img src={dangerSign} alt="Danger" /></button>
    ),
    

  },
];


export default function RecentUsers() {

  return (
    <>
   
        <div className='bg-white p-6 rounded-[8px] shadow-lg '>
          <div className="flex justify-between pl-4 pr-12 pt-6 pb-4">
            <h2 className="inter-semibold">Recent Users</h2>
            <Link to="/user-management" className="font-[Inter] text-[#4b4bc2] hover:underline">
              View all
            </Link>
          </div>

          <Table
            className='custom-table'
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered={false}
          />
        </div>
      

    </>
  )
}
