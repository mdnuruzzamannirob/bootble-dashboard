import React from 'react';
import { Modal, Form, Input, Select, Checkbox, Radio, Upload, Row, Col, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CloseIcon from '../SharedComponents/CloseIcon';
import CancelButton from '../SharedComponents/CancelButton';
import AddButton from '../SharedComponents/AddButton';
import './addProductModal.css';
const { TextArea } = Input;

const sizeOptions = ['S', 'M', 'L', 'XL', '2XL'];
const colorOptions = ['Yellow', 'Green', 'Pink', 'Gold', 'Silver', 'Gray', 'Custom'];

export default function AddProductModal({
    open,
    onCancel,
    onAdd,
    isEdit = false
}) {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onAdd(values);
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
            style={{ borderRadius: 8, padding: 24 }}

        >
            <div className="flex justify-between items-center mb-4 w-full">
                <h2 className="text-[20px] font-[Inter] font-semibold mx-auto">
                    {isEdit ? 'Edit' : 'Add New'}
                </h2>
                <CloseIcon onClick={onCancel} />
            </div>

            <Form form={form} layout="vertical">
                <Form.Item label={isEdit ? 'Items Name' : 'Product Name'} name="productName" >
                    <Input placeholder="Item name here" />
                </Form.Item>

                <Form.Item label="Category" name="category" >
                    <Select placeholder="Select Category">
                        <Select.Option value="Rings">Rings</Select.Option>
                        <Select.Option value="Necklace">Necklace</Select.Option>
                        <Select.Option value="Earrings">Earrings</Select.Option>
                    </Select>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Price" name="price" >
                            <Input prefix="$86" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Discount Price (Optional)" name="discountPrice">
                            <Input prefix="$79" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item label="Sizes (if applicable)" name="sizes">
                    <div className="custom-checkbox">
                        <Checkbox.Group>
                            <Row gutter={[8, 8]}>
                                {sizeOptions.map(size => (
                                    <Col key={size}>
                                        <Checkbox value={size}>{size}</Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </div>
                </Form.Item>

                <Form.Item label="Colors (if applicable)" name="colors">
                    <div className="custom-checkbox">
                        <Checkbox.Group>
                            <Row gutter={[8, 8]}>
                                {colorOptions.map(color => (
                                    <Col key={color}>
                                        <Checkbox value={color}>
                                            <span className="color-option">
                                                <span
                                                    className="color-dot"
                                                    style={{ backgroundColor: color.toLowerCase() === 'custom' ? '#ccc' : color.toLowerCase() }}
                                                />
                                                {color}
                                            </span>
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </div>
                </Form.Item>

                <Form.Item label="Stock Status" name="stockStatus" >
                    <Radio.Group>
                        <Radio value="In Stock">In Stock</Radio>
                        <Radio value="Stock Out">Stock Out</Radio>
                        <Radio value="Up Coming">Up Coming</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Short Introduction" name="shortIntro">
                    <TextArea rows={2} placeholder="Write here" />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea rows={3} placeholder="Write here" />
                </Form.Item>

                <Form.Item label="Upload Image" name="image">
                    <Upload beforeUpload={() => false} listType="picture">
                        <Button style={{
                            width: '440px',
                            border: '2px dotted #b4b3b3',
                           
                        }} icon={<UploadOutlined />}>Add</Button>
                    </Upload>
                </Form.Item>

                <div className="flex justify-between mt-6">
                    <CancelButton onClick={onCancel} text="Cancel" />
                    <AddButton onClick={handleSubmit} text={isEdit ? 'Update' : 'Add'} />
                </div>
            </Form>
        </Modal>
    );
}
