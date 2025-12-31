import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa6";

export default function BackButton({ text }) {
  return (
    <div className="flex gap-2 items-center">
      <Link to="/">
        <FaArrowLeft />
      </Link>

      <h2 className="text-[20px] font-[Inter] font-semibold "> {text}</h2>
    </div>
  );
}
