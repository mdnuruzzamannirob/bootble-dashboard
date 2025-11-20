import React from 'react'

import BackButton from '../SharedComponents/BackButton';
import { Form, Input, Select, Button, Space, Upload } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import PrimaryButton from '../SharedComponents/PrimaryButton';
import PrimaryDangerBtn from '../SharedComponents/PrimaryDangerBtn';

import './Meditation.css'

export default function Meditation() {




    const [form] = Form.useForm()

    const handleSubmit = (values) => {
        console.log('Form Values:', values)
    }

    const handleAudioUpload = (file) => {
        console.log('Audio file:', file)
        return false
    }



    return (
        <div className="bg-white min-h-[80vh] p-6 rounded-[8px] shadow-lg">
            <div className="mb-6 flex justify-between items-center">
                <BackButton text="Add Meditation">

                </BackButton>

            </div>

            {/* form */}

            <div>
                <Form
                    form={form}
                    layout="vertical"
                    className="meditation-form"
                    onFinish={handleSubmit}
                    requiredMark={false}
                    style={{maxWidth: 1000, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}
                >
                    {/* Left Column */}
                    <div>
                        {/* Main Title Field */}
                        <Form.Item
                            label="Main Title"
                            name="mainTitle"
                            rules={[{ required: true, message: 'Please enter a title' }]}
                        >
                            <Input
                                placeholder="Type here"
                                size='large'
                            />
                        </Form.Item>

                        {/* Audio Upload Section */}
                        <Upload
                            beforeUpload={handleAudioUpload}
                            maxCount={1}

                            style={{ marginTop: '20px' }}
                        >
                            <div
                                style={{
                                    border: '2px dashed #9F9F9F',
                                    borderRadius: '4px',
                                    padding: '40px 20px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#fafafa',
                                    transition: 'all 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = '#9F9F9F'
                                    e.currentTarget.style.backgroundColor = '#f0f5ff'
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#9F9F9F'
                                    e.currentTarget.style.backgroundColor = '#fafafa'
                                }}
                            >
                                <AudioOutlined style={{ fontSize: '24px', color: '', marginRight: '8px' }} />
                                <span style={{ color: '', fontWeight: '500' }}>Add Audio</span>
                            </div>
                        </Upload>
                    </div>

                    {/* Right Column */}
                    <div>
                        {/* Categories Dropdown */}
                        <Form.Item
                            label="Categories"
                            name="categories"
                            rules={[{ required: true, message: 'Please select a category' }]}
                        >
                            <Select
                                size='large'
                                placeholder="Select Categories"
                                style={{ borderRadius: '4px' }}
                                options={[
                                    { label: 'Technology', value: 'tech' },
                                    { label: 'Business', value: 'business' },
                                    { label: 'Health', value: 'health' },
                                    { label: 'Entertainment', value: 'entertainment' },
                                ]}
                            />
                        </Form.Item>

                        {/* Tags Dropdown */}
                        <Form.Item
                            label="Tags"
                            name="tags"
                            rules={[{ required: true, message: 'Please select tags' }]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select Tags"
                                size='large'
                                style={{ borderRadius: '4px' }}
                                options={[
                                    { label: 'Important', value: 'important' },
                                    { label: 'Urgent', value: 'urgent' },
                                    { label: 'Review', value: 'review' },
                                    { label: 'Follow-up', value: 'followup' },
                                ]}
                            />
                        </Form.Item>
                    </div>

                   
                </Form>

                 {/* buttons */}
                    <div className='flex gap-4 justify-center pt-40'>
                        <PrimaryButton text="Create"/>
                        <PrimaryDangerBtn text="Cancel"/>
                    </div>
            </div>

        </div>
    )
}