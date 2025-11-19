import React from 'react';
import { Modal, Typography, Space, Row, Col, Tag } from 'antd';
import CloseIcon from '../SharedComponents/CloseIcon';
const { Title, Text, Paragraph } = Typography;

const productImages = [
  '/images/shirts/shirt1.jpg',
  '/images/shirts/shirt2.jpg',
  '/images/shirts/shirt3.jpg',
  '/images/shirts/shirt4.jpg',
  '/images/shirts/shirt5.jpg',
  
];

const colors = [
  { name: 'Green', colorCode: '#2ab930' },
  { name: 'Pink', colorCode: '#ea03f0' },
  { name: 'Silver', colorCode: '#d6d6d6' },
];

export default function ProductDetailsModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      width={650}
      centered
      style={{ padding: '24px 32px' }}
      
    >
       <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-semibold font-[Inter] mx-auto">Details</h2>
              <CloseIcon onClick={onClose} />
            </div>

      {/* Images */}
      <Space size="middle" style={{ justifyContent: 'center', display: 'flex', marginBottom: 24 }}>
        {productImages.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`product-${idx + 1}`}
            style={{ width: 90, height: 90, borderRadius: 6, objectFit: 'cover', border: '1px solid #ddd' }}
          />
        ))}
      </Space>

      {/* Details */}
      <Row gutter={[24, 16]}>
        <Col span={8}><Text strong>Items Name:</Text></Col>
        <Col span={16}><Text>Men’s Retro-Style Basketball Jersey</Text></Col>

        <Col span={8}><Text strong>Category:</Text></Col>
        <Col span={16}><Text>Basketball</Text></Col>

        <Col span={8}><Text strong>Price:</Text></Col>
        <Col span={16}><Text>$86</Text></Col>

        <Col span={8}><Text strong>Discount Price:</Text></Col>
        <Col span={16}><Text>$79</Text></Col>

        <Col span={8}><Text strong>Sizes:</Text></Col>
        <Col span={16}><Text>S, M, L, XL</Text></Col>

        <Col span={8}><Text strong>Colors:</Text></Col>
        <Col span={16}>
          <Space size="large">
            {colors.map(({ name, colorCode }) => (
              <Space key={name} align="center">
                <div
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    backgroundColor: colorCode,
                    border: '1px solid #ccc',
                  }}
                />
                <Text>{name}</Text>
              </Space>
            ))}
          </Space>
        </Col>

        <Col span={8}><Text strong>Status:</Text></Col>
        <Col span={16}><Text>In Stock</Text></Col>
      </Row>

      <div style={{ marginTop: 24 }}>
        <Text strong>Short Introduction:</Text>
        <Paragraph style={{ marginTop: 6, marginBottom: 24 }}>
          Show your team pride in style with this premium basketball T-shirt jersey — perfect for game day, casual wear.
        </Paragraph>

        <Text strong>Descriptions:</Text>
        <Paragraph style={{ marginTop: 6 }}>
          Rep your team and favorite player with pride in this officially styled basketball T-shirt jersey. Crafted from lightweight, breathable mesh fabric, this jersey delivers comfort, durability, and a street-ready look that makes it perfect both on and off the court. This is not just a piece of fanwear — it's a tribute to the game you love.
        </Paragraph>
      </div>
    </Modal>
  );
}
