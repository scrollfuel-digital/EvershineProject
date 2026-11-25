import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import footerLogo from "../../assets/evershine png.png";

const socials = [
  {
    icon: <FaInstagram />,
    label: "Instagram",
    href: "https://www.instagram.com/evershineprefabsolutions?igsh=cW8xeGQ3Nmd5b2R2",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "#",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    href: "https://wa.me/917774078785",
  },
];

export default function Footer() {
  return (
    <footer
      className="relative bg-white text-neutral-900 rounded-t-[2rem] sm:rounded-t-[3rem] lg:rounded-t-[4rem] border-t border-[#c4a574]/30 overflow-hidden mt-auto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* 3 Columns Aligned in One Line */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Logo & Info Text */}
          <div className="md:col-span-5">
            <div className="inline-flex items-center mb-4">
              <img
                src={footerLogo}
                alt="Evershine Solution"
                className="h-16 sm:h-20 lg:h-22 w-auto object-contain"
              />
            </div>
            <p className="text-[14.5px] sm:text-[15px] text-neutral-800 leading-relaxed max-w-sm mb-4 font-medium">
              Building Strong Foundations for Industrial Growth. A trusted provider of industrial building solutions across India since 2013.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-1">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-900 hover:text-[#c4a574] text-xl transition-all duration-200 hover:scale-115"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Aside: Contact Info */}
          <div className="md:col-span-3 space-y-3 text-[14.5px] sm:text-[15px] text-neutral-900">
            <h4 className="text-[#c4a574] font-bold text-lg sm:text-[19px] mb-3 tracking-wide">
              Contact
            </h4>
            <div className="flex gap-2.5 items-start">
              <FaPhoneAlt className="text-[#c4a574] shrink-0 text-base mt-1" />
              <div className="flex flex-col space-y-1">
                <a href="tel:+917774078785" className="hover:text-[#c4a574] hover:underline transition font-semibold">
                  +91 7774078785
                </a>
                <a href="tel:+919860118911" className="hover:text-[#c4a574] hover:underline transition font-semibold">
                  +91 9860118911
                </a>
                <a href="tel:+919881147000" className="hover:text-[#c4a574] hover:underline transition font-semibold">
                  +91 9881147000
                </a>
              </div>
            </div>
            <div className="flex gap-2.5 items-center">
              <FaEnvelope className="text-[#c4a574] shrink-0 text-base" />
              <a href="mailto:evershinengp@gmail.com" className="hover:text-[#c4a574] hover:underline transition break-all font-semibold">
                evershinengp@gmail.com
              </a>
            </div>
          </div>

          {/* Aside: Address & Meet Time Only */}
          <div className="md:col-span-4 space-y-3 text-[14.5px] sm:text-[15px] text-neutral-900">
            <h4 className="text-[#c4a574] font-bold text-lg sm:text-[19px] mb-3 tracking-wide">
              Office &amp; Timings
            </h4>
            <a
              href="https://www.google.com/maps/place/Snehal+Malpani+-+Your+Partner+in+the+journey+called+TRANSFORMATION/@21.0968237,79.0651397,17z/data=!4m14!1m7!3m6!1s0x3bd4c07c1fef4f17:0xbc05bedbdaf9183c!2zRXZlcnNoaW5lIFByZWZhYiBTb2x1dGlvbnMg4KSP4KS14KWN4KS54KSw4KS24KS-4KSI4KSoIOCkquCljeCksOClgOCkq-CliOCkrCDgpLjgpYvgpLLgpY3gpK_gpYHgpLbgpKjgpY3gpLg!8m2!3d21.0968237!4d79.0651397!16s%2Fg%2F1q6cvvl5t!3m5!1s0x3bd4bfcc8b70cf6d:0x418bd9f1e482b5f4!8m2!3d21.0953378!4d79.0640245!16s%2Fg%2F11l5v7r5rw!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2.5 items-start hover:text-[#c4a574] transition leading-snug group font-medium"
            >
              <FaMapMarkerAlt className="text-[#c4a574] mt-1 shrink-0 text-base group-hover:scale-110 transition-transform" />
              <span>133, Bante Layout, Wardha Road, Nagpur, Maharashtra – 440025</span>
            </a>
            <div className="flex gap-2.5 items-center leading-snug font-medium">
              <FaClock className="text-[#c4a574] shrink-0 text-base" />
              <span>Mon – Sat: 09:00 AM – 06:00 PM | Sun: Closed</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Terms & Policies link on right side */}
        <div className="mt-8 pt-4 border-t border-[#c4a574]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-neutral-800 font-medium">
          <div>
            © {new Date().getFullYear()} Evershine Solution. All Rights Reserved.
          </div>
          <Link
            to="/policy/terms-and-conditions"
            className="text-neutral-900 hover:text-[#c4a574] font-semibold transition-colors hover:underline"
          >
            Terms &amp; Policies
          </Link>
        </div>
      </div>
    </footer>
  );
}
