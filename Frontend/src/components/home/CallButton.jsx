import React from "react";
import callIcon from "../../assets/call_icon.png";

export default function CallButton() {
  const phoneNumber = "917498147921";

  return (
    <a
      href={`tel:+${phoneNumber}`}
      className="fixed bottom-28 right-6 z-50 group transition duration-300"
      aria-label="Call Us"
    >
      <div className="w-16 h-16 rounded-full bg-white p-2.5 shadow-2xl flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform duration-300">
        <img
          src={callIcon}
          alt="Call Us"
          className="w-full h-full object-contain"
        />
      </div>
    </a>
  );
}
