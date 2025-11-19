// AddModal.jsx
import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import CloseIcon from '../SharedComponents/CloseIcon';
const { TextArea } = Input;
export default function AddFAQModal({
    open,
    onCancel,
    // onAdd,
    fieldLabel = 'Question',
    fieldName = 'fieldName',
    placeholder = 'Type question here',
    initialValue = '', 
    
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
                    Add FAQ
                </h2>
                <CloseIcon onClick={onCancel}></CloseIcon>
            </div>


            <Form form={form} layout="vertical">
                <Form.Item
                    label={fieldLabel}
                    name={fieldName}
                    // rules={[{ required: true, message: `Please enter ${fieldLabel.toLowerCase()}` }]}
                >
                    <Input placeholder={placeholder}
                        style={{
                            fontSize: '16px',
                            color: '#333333',
                            fontFamily: 'Inter',
                            padding: '10px 16px',
                            borderColor: '#767676',
                            borderRadius: '6px',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label='Answer'
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

                        rows={4} placeholder="Type answer here" maxLength={6} />
                </Form.Item>

                <div className=" flex justify-center  mt-6">

                    <Button
                        type="primary"
                        style={{
                            backgroundColor: '#E4AF00',
                            border: 'none',
                            color: '#FEFEFE',
                            borderRadius: 4,
                            height: '48px',
                            padding: '0 44px',
                            display: 'flex',
                            alignItems: 'center',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: 16,
                            width: '510px'
                        }}
                    >
                        Save
                    </Button>

                </div>
            </Form>
        </Modal>
    );
}
