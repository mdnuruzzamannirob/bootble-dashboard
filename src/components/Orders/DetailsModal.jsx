import React from 'react';
import { Modal } from 'antd';
import CloseIcon from '../SharedComponents/CloseIcon';

export default function DetailsModal({ open, onCancel, order }) {
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
          <span className="font-medium">Order ID:</span>
          <span className="text-right">#7745634657</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Customer Name:</span>
          <span>{order.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Email:</span>
          <span>csilvers@rizon.com</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Phone Number:</span>
          <span>4364856856</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Shipping Address:</span>
          <span className="text-right">{order.address}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Order Date:</span>
          <span>{order.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Total Price:</span>
          <span>$67</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Payment Status:</span>
          <span>{order.payment}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Order Status:</span>
          <span>{order.status}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-[16px] font-semibold font-[Inter] mb-2">Ordered Items:</h3>
        <div className="">
          <div className="flex justify-between font-[Inter] font-medium">
            <div>Product Name</div>
            <div className='pl-12'>Quantity</div>
            <div>Price</div>
          </div>
          {orderedItems.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <div>{item.name}</div>
              <div>{item.quantity}</div>
              <div>${item.price}</div>
            </div>
          ))}
          <div className="flex justify-between text-[14px] py-2 font-semibold">
            <div>Total</div>
            <div></div>
            <div>${totalItemPrice}</div>
          </div>
        </div>
      </div>
    </Modal>
    );
}
