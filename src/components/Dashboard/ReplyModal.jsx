// AddModal.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CloseIcon from '../SharedComponents/CloseIcon';
import CancelButton from '../SharedComponents/CancelButton';
import AddButton from '../SharedComponents/AddButton';
const { TextArea } = Input;
export default function ReplyModal({
    open,
    onCancel,
    fieldName = 'fieldName',
    initialValue = '', // ✅ 
    
}) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (open) {
            form.setFieldsValue({ [fieldName]: initialValue || '' });
        }
    }, [open, fieldName, initialValue, form]);

    // const handleSubmit = () => {
    //     form.validateFields().then(values => {
    //         onAdd(values[fieldName]);
    //         form.resetFields();
    //     });
    // };

    return (
        <Modal
            open={open}
            footer={null}
            closable={false}
            centered
            width={540}
            style={{ borderRadius: 8, padding: 24}}
            
        >
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-[20px] font-[Inter] font-semibold mx-auto">
                    Reply
                </h2>
                <CloseIcon onClick={onCancel}></CloseIcon>
            </div>


            <Form form={form} layout="vertical">
                

                <Form.Item
                    label='Write a Reply'
                    name={fieldName}
                    // rules={[{ required: true, message: `Please enter ${fieldLabel.toLowerCase()}` }]}
                >
                    <TextArea
                        style={{
                            fontSize: '16px',
                            color: '#333333',
                            fontFamily: 'Inter',
                            padding: '10px 16px',
                            borderColor: '#767676',
                            borderRadius: '6px',
                        }}

                        rows={4} placeholder="Write here..." maxLength={6} />
                </Form.Item>

                <div className=" flex justify-between  mt-6">

                   

                    <CancelButton text={'Cancel'}></CancelButton>
                    <AddButton text={'Reply'}></AddButton>

                </div>
            </Form>
        </Modal>
    );
}
