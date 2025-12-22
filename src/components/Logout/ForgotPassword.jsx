import { Form, Typography, Card } from "antd";
import { useNavigate } from "react-router-dom";
import EmailInput from "../SharedComponents/EmailInput";
import LoginPageButton from "../SharedComponents/LoginPageButton";
import { toast } from "react-toastify";
import { useForgotPasswordMutation } from "@/store/features/auth/authApi";

const { Title, Text } = Typography;

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await forgotPassword(values).unwrap();
      toast.success(res?.message || "OTP sent to your email!");
      navigate("/check-email", { state: { email: values.email } });
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#EBEBFF] px-4">
      <Card className="w-full max-w-[630px] p-8 rounded-[24px] shadow-sm">
        <Title level={3} className="text-center !font-medium !text-[32px]">
          Forget Password?
        </Title>
        <Text className="block text-center mb-11 text-[#333333] text-[18px]">
          Please enter your email to get verification code
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <EmailInput label="Email address" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item className="mt-6">
            <LoginPageButton
              loading={isLoading}
              text="Continue"
              htmlType="submit"
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
