import React, { useState } from 'react';
import { Tabs, Input, Avatar } from 'antd';
import BackButton from '../SharedComponents/BackButton';

import './profile.css';
import PrimaryButton from '../SharedComponents/PrimaryButton';
import adminImg from '/images/admin.png'

import viewSign from '/images/view.png'
import notViewSign from '/images/notView.png'
import { IoCameraOutline } from "react-icons/io5";

const { TabPane } = Tabs;
const { Password } = Input;

const passwordFields = [
  {
    label: 'Current Password',
    name: 'currentPassword',
    type: 'password',
    placeholder: '**********',
  },
  {
    label: 'New Password',
    name: 'newPassword',
    type: 'password',
    placeholder: '**********',
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    placeholder: '**********',
  },
];

export default function Profile() {
  const [formData, setFormData] = useState({
    name: 'Robert Smith',
    email: 'robert@gmail.com',
    contact: '+99007007007',
    address: '79/A Joker Vila, Gotham City',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSave = () => {
  //   console.log('Saved Data:', formData);
  // };

  return (
    <>
      
        <div className="rounded-[8px] bg-white shadow-lg p-12  ">
          {/* Back link */}

          <BackButton text="Profile" />

          {/* Avatar and name */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Avatar size={96} src={adminImg} />
              <div className="absolute bottom-0 right-0 bg-black rounded-full p-1 text-white text-xl cursor-pointer">
                {/* <img src={cameraSign} alt="camera" /> */}
                <IoCameraOutline />
              </div>
            </div>
            <h2 className="mt-2 text-[30px] font-[Inter] font-medium">Mr. Admin</h2>
          </div>

          {/* Tabs */}
          <Tabs
            defaultActiveKey="1"
            centered
            className="mt-4 custom-tabs"
            tabBarStyle={{ borderBottom: 'none' }}
          >
            {/* Edit Profile Section */}
            <TabPane tab="Edit Profile" key="1">
              <h3 className="text-center text-[24px] font-[Inter] font-medium mb-6">
                Edit Your Profile
              </h3>
              <div className="space-y-4 max-w-xl mx-auto font-[Inter] font-normal text-[#333333]">
                <div>
                  <label>User Name</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="custom-placeholder"
                    style={{ borderColor: '#777474', padding: '10px 16px', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="custom-placeholder"
                    style={{ borderColor: '#777474', padding: '10px 16px', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label>Contact no</label>
                  <Input
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    className="custom-placeholder"
                    style={{ borderColor: '#777474', padding: '10px 16px', borderRadius: '6px' }}
                  />
                </div>
                <div>
                  <label>Address</label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="custom-placeholder"
                    style={{ borderColor: '#777474', padding: '10px 16px', borderRadius: '6px' }}
                  />
                </div>
                <div className="flex justify-center text-center pt-4">
                  <PrimaryButton text="Save Change"></PrimaryButton>
                </div>
              </div>
            </TabPane>

            {/* Change Password Section */}
            <TabPane tab="Change Password" key="2">
              <h3 className="text-center text-[24px] font-[Inter] font-medium mb-6">
                Change Password
              </h3>
              <div className="space-y-4 max-w-xl mx-auto font-[Inter] font-normal text-[#333333]">
                {passwordFields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label>{field.label}</label>
                    <Password
                      className="custom-placeholder"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      
                      style={{
                        borderColor: '#777474',
                        padding: '10px 16px',
                        borderRadius: '6px',
                      }}
                    />
                  </div>
                ))}
                <div className="flex justify-center text-center pt-16">
                  <PrimaryButton text="Save Change"></PrimaryButton>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </div>
      
    </>
  );
}
