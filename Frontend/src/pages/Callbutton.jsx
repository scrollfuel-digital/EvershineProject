import { FaPhoneAlt } from "react-icons/fa";

export default function CallButton() {
  const phoneNumber = "+919876543210"; // Replace with your number

  return (
    <a
      href={`tel:${phoneNumber}`}
      className="fixed bottom-28 right-6 z-50"
      aria-label="Call Us"
    >
      <div className="relative w-16 h-16 rounded-full bg-[#007BFF] flex items-center justify-center shadow-2xl hover:scale-110 transition duration-300">
        <span className="absolute inset-0 rounded-full bg-[#007BFF] animate-ping opacity-30"></span>

        <FaPhoneAlt className="relative text-white text-2xl" />
      </div>
    </a>
  );
}