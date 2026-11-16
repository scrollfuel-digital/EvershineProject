import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import footerLogo from "../../assets/evershine_footer_logo.png";
// 
const socials = [
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/evershineprefabsolutions?igsh=cW8xeGQ3Nmd5b2R2",
    color: "hover:text-pink-500",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "#",
    color: "hover:text-blue-400",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    href: "https://wa.me/919860118911",
    color: "hover:text-green-400",
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        {/* 3 Columns Aligned in One Line */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Left: Logo & Info Text */}
          <div className="md:col-span-5">
            <img
              src={footerLogo}
              alt="Evershine Solution"
              className="h-14 sm:h-16 w-auto object-contain mb-3"
            />
            <p className="text-[15px] sm:text-base text-gray-600 leading-relaxed max-w-sm">
              Building Strong Foundations for Industrial Growth. A trusted provider of industrial building solutions across India since 2012.
            </p>
          </div>

          {/* Aside: Contact Info & Social Icons */}
          <div className="md:col-span-3 space-y-2.5 text-[15px] sm:text-base text-gray-600">
            <h4 className="text-gray-800 font-semibold text-lg sm:text-[19px] mb-3">
              Contact
            </h4>
            <div className="flex gap-2.5 items-center">
              <FaPhoneAlt className="text-primary shrink-0 text-base" />
              <a href="tel:+919860118911" className="hover:text-primary transition font-medium">
                +91 9860118911
              </a>
            </div>
            <div className="flex gap-2.5 items-center">
              <FaEnvelope className="text-primary shrink-0 text-base" />
              <a href="mailto:evershinengp@gmail.com" className="hover:text-primary transition break-all font-medium">
                evershinengp@gmail.com
              </a>
            </div>

            {/* Social Media Icons below Contact */}
            <div className="flex items-center gap-4 pt-1">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 text-xl transition-all duration-200 hover:scale-110 ${s.color}`}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Aside: Address & Meet Time Only */}
          <div className="md:col-span-4 space-y-2.5 text-[15px] sm:text-base text-gray-600">
            <h4 className="text-gray-800 font-semibold text-lg sm:text-[19px] mb-3">
              Office & Timings
            </h4>
            <a
              href="https://www.google.com/maps/place/Snehal+Malpani+-+Your+Partner+in+the+journey+called+TRANSFORMATION/@21.0968237,79.0651397,17z/data=!4m14!1m7!3m6!1s0x3bd4c07c1fef4f17:0xbc05bedbdaf9183c!2zRXZlcnNoaW5lIFByZWZhYiBTb2x1dGlvbnMg4KSP4KS14KWN4KS54KSw4KS24KS-4KSI4KSoIOCkquCljeCksOClgOCkq-CliOCkrCDgpLjgpYvgpLLgpY3gpK_gpYHgpLbgpKjgpY3gpLg!8m2!3d21.0968237!4d79.0651397!16s%2Fg%2F1q6cvvl5t!3m5!1s0x3bd4bfcc8b70cf6d:0x418bd9f1e482b5f4!8m2!3d21.0953378!4d79.0640245!16s%2Fg%2F11l5v7r5rw!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2.5 items-start hover:text-primary transition leading-snug group"
            >
              <FaMapMarkerAlt className="text-primary mt-1 shrink-0 text-base group-hover:scale-110 transition-transform" />
              <span>133, Bante Layout, Wardha Road, Nagpur, Maharashtra – 440025</span>
            </a>
            <div className="flex gap-2.5 items-center leading-snug">
              <FaClock className="text-primary shrink-0 text-base" />
              <span>Mon – Sat: 09:00 AM – 06:00 PM | Sun: Closed</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-5 pt-3 border-t border-gray-100 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Evershine Solution. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
