import React from 'react';
import { Modal } from 'antd';
import CloseIcon from '../SharedComponents/CloseIcon';

export default function HelpDetailsModal({ open, onCancel, order }) {
  if (!order) return null;

  const orderedItems = [
    { name: 'Ultimate Player T-Shirt', quantity: 1, price: 55 },
    { name: 'Pokémon TCG Collectors', quantity: 2, price: 125 },
  ];

  const totalItemPrice = orderedItems.reduce((acc, item) => acc + item.price, 0);

    return (
       <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      width={560}
      style={{ padding: 24, borderRadius: 8 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-semibold font-[Inter] mx-auto">Details</h2>
        <CloseIcon onClick={onCancel} />
      </div>

      <div className="space-y-2 text-[15px] font-[Inter] text-[#333]">
        <div className="flex justify-between">
          <span className="font-medium">ID:</span>
          <span className="text-right">#325345636</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>12/08/24</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Name:</span>
          <span>Hari Danang</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>csilvers@rizon.com</span>
        </div>
        
        <div className="flex justify-between">
          <span className="font-medium">Issue:</span>
          
        </div>
        <span className="text-left">I want to create an account</span>

       
        
       
        
      </div>

      <div className="mt-6">
        <h3 className="text-[16px] font-semibold font-[Inter] mb-2">Response:</h3>
        <p>Users can register using their email, phone number. Profile verification ensures authenticity and can be done via email, or phone.</p>
      </div>
    </Modal>
    );
}
