import { useState } from "react";
import { Typography, Card, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import LoginPageButton from "../SharedComponents/LoginPageButton";
import { toast } from "react-toastify";
import { useVerifyOtpMutation } from "@/store/features/auth/authApi";

const { Title, Text } = Typography;

export default function CheckYourEmail() {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async () => {
    if (otp.length < 6) {
      return toast.warning("Please enter 6 digit OTP");
    }
    try {
      await verifyOtp({ email, otp, purpose: "forgot-password" }).unwrap();
      toast.success("OTP Verified!");
      navigate("/set-password", { state: { email, otp } });
    } catch (error) {
      toast.error(error?.message || error?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#EBEBFF] px-4">
      <Card className="w-full max-w-[630px] p-8 rounded-[24px] shadow-sm">
        <Title level={3} className="text-center !font-medium !text-[32px] mb-6">
          Check your email
        </Title>
        <Text className="block text-center mb-10 text-[#333333] text-[18px]">
          We sent a code to your email{" "}
          <span className="font-bold">{email}</span>. Please check for the 5
          digit code.
        </Text>

        <div className="flex justify-center mb-10">
          <Input.OTP length={6} onChange={(v) => setOtp(v)} size="large" />
        </div>

        <LoginPageButton
          loading={isLoading}
          onClick={handleVerify}
          text="Verify"
        />

        <div className="flex justify-center mt-20 font-inter">
          <p>
            You have not received the email?
            <button className="text-[#121030] underline ml-1 font-semibold">
              Resend
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
