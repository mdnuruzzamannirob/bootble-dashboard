import { Button } from "antd";

export default function LoginPageButton({
  text,
  disabled,
  className = "disabled:opacity-50",
  ...rest
}) {
  return (
    <div>
      <Button
        type="primary"
        htmlType="submit"
        block
        disabled={disabled}
        className={className}
        style={{
          backgroundColor: "#121030",
          border: "none",
          color: "#FEFEFE",
          borderRadius: 4,
          height: "48px",
          padding: "0 44px",
          display: "flex",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
          fontSize: 16,
        }}
        {...rest}
      >
        {text}
      </Button>
    </div>
  );
}
