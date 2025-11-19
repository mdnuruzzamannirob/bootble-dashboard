import React from 'react';
import { Form, Input, Checkbox, Typography, Card, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import LoginPageButton from '../SharedComponents/LoginPageButton';
import { Link } from 'react-router-dom';

import './Login.css';
import Box from '../SharedComponents/Box';

const { Title, Text } = Typography;
export default function CheckYourEmail() {
    
    const values = ['2', '8', '4', ' ', ' '];
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
                <Title level={3} style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: '32', fontWeight: '500', marginBottom: 24, }}>Check your email</Title>
                <Text type="secondary" style={{ display: 'block', textAlign: 'center', marginBottom: 60, color: '#333333', fontFamily: 'Inter', fontSize: '18' }}>
                    We sent a code to your email address @. Please check your email for the 5 digit code.
                </Text>

                {/* codes */}

                <div className='flex gap-2 mb-[64px] justify-center'>
                    {values.map((val, index) => (
                        <Box key={index} text={val}></Box>
                    ))}
                </div>


                    {/* button */}
                    <Link to="/set-password" ><LoginPageButton text="Verify"></LoginPageButton></Link>

                    {/* Page end */}
                    <div className='font-[Inter] flex justify-center mt-[84px]'>
                             <p className=''>You have not received the email? <a href=""><span className='text-[#121030] underline'>Resend</span></a></p>
                    </div>


               
            </Card>
        </div>
    )
}
