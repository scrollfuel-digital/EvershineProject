import { FaPhone } from "react-icons/fa";

export default function CallButton() {
  const phoneNumber = "917498147921";

  return (
    <a
      href={`tel:+${phoneNumber}`}
      className="fixed bottom-28 right-6 z-50"
    >
      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition duration-300">
        <FaPhone className="text-white text-2xl" />
      </div>
    </a>
  );
}
