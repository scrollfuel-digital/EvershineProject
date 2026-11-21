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
    color: "hover:text-pink-400",
  },
  {
    icon: <FaLinkedin />,
    label: "LinkedIn",
    href: "#",
    color: "hover:text-blue-300",
  },
  {
    icon: <FaWhatsapp />,
    label: "WhatsApp",
    href: "https://wa.me/917774078785",
    color: "hover:text-emerald-400",
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#003860] via-[#004060] to-[#002840] text-white rounded-t-[2rem] sm:rounded-t-[3rem] lg:rounded-t-[4rem] border-t border-white/10 shadow-2xl overflow-hidden mt-auto">
      {/* Top Golden Accent Gradient Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#FBBF24] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* 3 Columns Aligned in One Line */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Logo & Info Text */}
          <div className="md:col-span-5">
            <div className="inline-flex items-center px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl shadow-sm mb-4">
              <img
                src={footerLogo}
                alt="Evershine Solution"
                className="h-16 sm:h-20 lg:h-22 w-auto object-contain"
              />
            </div>
            <p className="text-[14.5px] sm:text-[15px] text-slate-200/90 leading-relaxed max-w-sm mb-4">
              Building Strong Foundations for Industrial Growth. A trusted provider of industrial building solutions across India since 2012.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-1">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-slate-300 text-xl transition-all duration-200 hover:scale-115 ${s.color}`}
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Aside: Contact Info */}
          <div className="md:col-span-3 space-y-3 text-[14.5px] sm:text-[15px] text-slate-200">
            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] via-amber-300 to-[#F59E0B] font-bold text-lg sm:text-[19px] mb-3 tracking-wide">
              Contact
            </h4>
            <div className="flex gap-2.5 items-start">
              <FaPhoneAlt className="text-[#FBBF24] shrink-0 text-base mt-1" />
              <div className="flex flex-col space-y-1">
                <a href="tel:+917774078785" className="hover:text-[#FBBF24] transition font-medium">
                  +91 7774078785
                </a>
                <a href="tel:+919860118911" className="hover:text-[#FBBF24] transition font-medium">
                  +91 9860118911
                </a>
                <a href="tel:+919881147000" className="hover:text-[#FBBF24] transition font-medium">
                  +91 9881147000
                </a>
              </div>
            </div>
            <div className="flex gap-2.5 items-center">
              <FaEnvelope className="text-[#FBBF24] shrink-0 text-base" />
              <a href="mailto:evershinengp@gmail.com" className="hover:text-[#FBBF24] transition break-all font-medium">
                evershinengp@gmail.com
              </a>
            </div>
          </div>

          {/* Aside: Address & Meet Time Only */}
          <div className="md:col-span-4 space-y-3 text-[14.5px] sm:text-[15px] text-slate-200">
            <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-[#FBBF24] via-amber-300 to-[#F59E0B] font-bold text-lg sm:text-[19px] mb-3 tracking-wide">
              Office & Timings
            </h4>
            <a
              href="https://www.google.com/maps/place/Snehal+Malpani+-+Your+Partner+in+the+journey+called+TRANSFORMATION/@21.0968237,79.0651397,17z/data=!4m14!1m7!3m6!1s0x3bd4c07c1fef4f17:0xbc05bedbdaf9183c!2zRXZlcnNoaW5lIFByZWZhYiBTb2x1dGlvbnMg4KSP4KS14KWN4KS54KSw4KS24KS-4KSI4KSoIOCkquCljeCksOClgOCkq-CliOCkrCDgpLjgpYvgpLLgpY3gpK_gpYHgpLbgpKjgpY3gpLg!8m2!3d21.0968237!4d79.0651397!16s%2Fg%2F1q6cvvl5t!3m5!1s0x3bd4bfcc8b70cf6d:0x418bd9f1e482b5f4!8m2!3d21.0953378!4d79.0640245!16s%2Fg%2F11l5v7r5rw!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDkwOS4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2.5 items-start hover:text-[#FBBF24] transition leading-snug group"
            >
              <FaMapMarkerAlt className="text-[#FBBF24] mt-1 shrink-0 text-base group-hover:scale-110 transition-transform" />
              <span>133, Bante Layout, Wardha Road, Nagpur, Maharashtra – 440025</span>
            </a>
            <div className="flex gap-2.5 items-center leading-snug">
              <FaClock className="text-[#FBBF24] shrink-0 text-base" />
              <span>Mon – Sat: 09:00 AM – 06:00 PM | Sun: Closed</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Terms & Policies link on right side */}
        <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-300/80">
          <div>
            © {new Date().getFullYear()} Evershine Solution. All Rights Reserved.
          </div>
          <Link
            to="/policy/terms-and-conditions"
            className="text-slate-300 hover:text-[#FBBF24] font-medium transition-colors hover:underline"
          >
            Terms &amp; Policies
          </Link>
        </div>
      </div>
    </footer>
  );
}
