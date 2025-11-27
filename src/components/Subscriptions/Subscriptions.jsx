import React, { useState } from 'react'
import PrimaryButton from '../SharedComponents/PrimaryButton'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import BackButton from '../SharedComponents/BackButton';
import { Table } from 'antd';
import CustomPagination from '../SharedComponents/CustomPagination/CustomPagination';
import SubscriptionModal from './SubscriptionModal';


export default function Subscriptions() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const dataSource = [
    {
        key: '1',
        slNo: '01',
        subscriptionName: 'Silver',
        duration: 'Monthly',
        subscriptionFee: '£99.00',
        description: 'View',
        action: 'Edit',
    },
    {
        key: '2',
        slNo: '02',
        subscriptionName: 'Gold',
        duration: 'Yearly',
        subscriptionFee: '£99.99',
        description: 'View',
        action: 'Edit',
    },
    {
        key: '3',
        slNo: '03',
        subscriptionName: 'Diamond',
        duration: 'Yearly',
        subscriptionFee: '£99.99',
        description: 'View',
        action: 'Edit',
    },
];

const columns = [
    {
        title: 'Sl no.',
        dataIndex: 'slNo',
        key: 'slNo',
    },
    {
        title: 'Subscription Name',
        dataIndex: 'subscriptionName',
        key: 'subscriptionName',
        align: 'center',
    },
    {
        title: 'Duration',
        dataIndex: 'duration',
        key: 'duration',
        align: 'center',
    },
    {
        title: 'Subscription Fee',
        dataIndex: 'subscriptionFee',
        key: 'subscriptionFee',
        align: 'center',
    },
    //   {
    //     title: 'Description',
    //     dataIndex: 'description',
    //     key: 'description',
    //     render: (text) => (
    //       <span style={{ color: '#52c41a', cursor: 'pointer' }}>{text}</span>
    //     ),
    //   },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        render: (text) => (
            <span style={{ color: '#1AA972', cursor: 'pointer' }}
            onClick={handleAddSubscription}>{text}</span>
        ),
    },
];


    const handleAddSubscription = () => {
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setIsModalOpen(false)

    }

    return (
        <div className="bg-white p-6 rounded-[8px] shadow-lg">
            <div className="mb-6 flex justify-between items-center">
                <BackButton text="Subscription Plan"></BackButton>
                <PrimaryButton
                    text="Add Subscription"
                    icon={<PlusOutlined />}
                    onClick={handleAddSubscription}>
                </PrimaryButton>
            </div>

            <Table
                className="custom-table"
                columns={columns}
                dataSource={dataSource}
                pagination={CustomPagination({ currentPage, setCurrentPage })}
                bordered={false}
            />


            <SubscriptionModal
                isOpen={isModalOpen}


                onClose={handleModalClose}

            />
        </div>
    )
}