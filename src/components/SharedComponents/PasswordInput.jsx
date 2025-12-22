import { Input } from "antd";

const { Password } = Input;

export default function PasswordInput({
  name,
  placeholder,
  value,
  onChange,
  label,
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Password
        id={name}
        className="custom-placeholder"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          borderColor: "#121030",
          padding: "10px 16px",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}
