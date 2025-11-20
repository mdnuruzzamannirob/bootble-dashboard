import React, { useEffect } from 'react';
import { Modal, Form, Radio, Button } from 'antd';
import CloseIcon from '../SharedComponents/CloseIcon';
import CancelButton from '../SharedComponents/CancelButton';
import AddButton from '../SharedComponents/AddButton';
import './editModal.css';
export default function EditModal({
  open,
  onCancel,
  onUpdate,
  initialStatus = 'In Progress',
  initialPayment = 'Paid',
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        status: initialStatus,
        payment: initialPayment,
      });
    }
  }, [open, initialStatus, initialPayment, form]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      onUpdate(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      width={540}
      style={{ borderRadius: 8 ,padding: 24}}
      
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-semibold font-[Inter] mx-auto">Edit</h2>
        <CloseIcon onClick={onCancel} />
      </div>

      <Form form={form} layout="vertical">
        <Form.Item label="Order Status" name="status" >
          <Radio.Group className="flex flex-wrap gap-4 text-[#E4AF00]">
            <Radio value="In Progress">In Progress</Radio>
            <Radio value="Shipped">Shipped</Radio>
            <Radio value="Completed">Completed</Radio>
            <Radio value="Canceled">Canceled</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Payment Status" name="payment" >
          <Radio.Group className="flex gap-6 text-[#E4AF00]">
            <Radio value="Paid">Paid</Radio>
            <Radio value="Pending">Pending</Radio>
          </Radio.Group>
        </Form.Item>

         <div className="flex justify-between mt-6 ">
        
                  <CancelButton onClick={onCancel} text={'Cancel'}></CancelButton>
                  <AddButton onClick={handleSubmit} text={'Update'}></AddButton>
        
                </div>
      </Form>
    </Modal>
  );
}
