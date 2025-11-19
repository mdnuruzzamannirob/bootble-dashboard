import React, { useState } from 'react';
import { Form, Input, Checkbox, Typography, Card } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import LoginPageButton from '../SharedComponents/LoginPageButton';
import EmailInput from '../SharedComponents/EmailInput';
import PasswordInput from '../SharedComponents/PasswordInput'; // Adjust the path
import { Link } from 'react-router-dom';

import './Login.css';

const { Title, Text } = Typography;
export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#EBEBFF',
        }}>
            <Card
                style={{
                    width: 630,
                    height: 735,
                    padding: '30px 20px',
                    borderRadius: 24,
                    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'stretch',

                }}
            >
                <Title level={3} style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '32', fontWeight: '500' }}>Login to Account</Title>
                <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 32, color: '#333333', fontFamily: 'Inter', fontSize: '18' }}>
                    Please enter your email and password to continue
                </Text>

                <Form
                    name="login"
                    layout="vertical"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}

                >
                    <EmailInput
                        label="Email address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <PasswordInput
                        label="Password"
                        name="password"
                        placeholder="**********"
                        value={formData.password}
                        onChange={handleChange}
                    />


                    <Form.Item style={{ marginBottom: 10 }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontFamily: 'Inter',
                            marginBottom: 32,
                        }}>
                            <Checkbox defaultChecked className="custom-yellow-checkbox">Remember Password</Checkbox>
                            <Link to="/forget-password" className="forget-password-link">Forget Password?</Link>
                        </div>
                    </Form.Item>

                    <Form.Item style={{ marginTop: 24 }}>
                        <Link to="/" ><LoginPageButton text="Sign in"></LoginPageButton></Link>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
