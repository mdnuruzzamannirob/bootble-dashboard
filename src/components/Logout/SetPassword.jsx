import { Form, Typography, Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../SharedComponents/PasswordInput";
import LoginPageButton from "../SharedComponents/LoginPageButton";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "@/store/features/auth/authApi";

const { Title, Text } = Typography;

export default function SetPassword() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const onFinish = async (values) => {
    try {
      await resetPassword({
        email,
        otp,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      }).unwrap();

      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error?.message || error?.data?.message || "Failed to reset password"
      );
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#EBEBFF] px-4">
      <Card className="w-full max-w-[630px] p-8 rounded-[24px] shadow-sm">
        <Title level={3} className="text-center !font-medium !text-[32px]">
          Set a new password
        </Title>
        <Text className="block text-center mb-8 text-[#333333] text-[18px]">
          Create a new password. Ensure it differs from previous ones for
          security.
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter new password" },
              { min: 6, message: "Min 6 characters" },
            ]}
          >
            <PasswordInput placeholder="**********" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <PasswordInput placeholder="**********" />
          </Form.Item>

          <Form.Item className="mt-10">
            <LoginPageButton
              loading={isLoading}
              text="Reset Password"
              htmlType="submit"
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
