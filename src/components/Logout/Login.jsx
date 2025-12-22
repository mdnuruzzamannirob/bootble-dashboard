"use client";

import { useState } from "react";
import { Form, Checkbox, Typography } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import LoginPageButton from "../SharedComponents/LoginPageButton";
import EmailInput from "../SharedComponents/EmailInput";
import PasswordInput from "../SharedComponents/PasswordInput";

import { useLoginMutation } from "../../store/features/auth/authApi";
import Cookies from "js-cookie";

const { Title, Text } = Typography;

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFinish = async () => {
    try {
      const res = await login(formData).unwrap();
      Cookies.set("token", res.token, {
        expires: formData.rememberMe ? 7 : undefined,
        secure: import.meta.env.NODE_ENV === "production",
        sameSite: "None",
        path: "/",
      });
      toast.success("Login successful!");
      navigate(from || "/");
    } catch (error) {
      toast.error(
        error?.message ||
          error?.data?.message ||
          "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#EBEBFF] px-4">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-md flex flex-col">
        <Title level={3} className="text-center text-2xl font-semibold mb-2">
          Login to Account
        </Title>
        <Text type="secondary" className="text-center text-gray-600 mb-8">
          Please enter your email and password to continue
        </Text>

        <Form
          name="login"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          className="space-y-4"
        >
          {/* Email */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <EmailInput
              label="Email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Item>

          {/* Password */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <PasswordInput
              label="Password"
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Item>

          {/* Remember + Forget Password */}
          <div className="flex justify-between items-center">
            <Checkbox
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData({ ...formData, rememberMe: e.target.checked })
              }
              className="text-yellow-500"
            >
              Remember Password
            </Checkbox>
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <LoginPageButton loading={isLoading} text="Sign in" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
