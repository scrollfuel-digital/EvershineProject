import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Headphones,
  MessageSquare,
  PhoneCall,
  AtSign,
  ArrowRight,
  Send,
  Sparkles,
  Clock
} from 'lucide-react';

import citySkylineBg from '../../assets/contact_header_skyline.png';

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enquiryType: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', enquiryType: 'General Enquiry', message: '' });
      setAgreed(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-[80px]">

      {/* 1. Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#B8D8E8]/35 via-slate-50/70 to-slate-50 pt-14 pb-16 px-4 sm:px-6 lg:px-8">
        {/* City Skyline Background Banner Overlay */}
        <img 
          src={citySkylineBg}
          alt="City Skyline Banner Background"
          className="absolute inset-0 w-full h-full object-cover object-bottom opacity-30 pointer-events-none mix-blend-multiply"
        />

        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B8D8E8]/40 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#285870]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 items-center relative z-10">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-[#004060]/10 border border-[#004060]/20 px-3.5 py-1 rounded-full text-xs font-semibold text-[#004060]">
              <Sparkles className="w-3.5 h-3.5 text-[#285870]" />
              <span>We'd Love to Hear From You</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004060] via-[#285870] to-[#003860]">Contact</span> Us
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-display">
              Let's Build Something Great Together
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans">
              Have a project in mind, a question about our services, or need expert guidance? We're here to help. Reach out to us and let's discuss how we can turn your ideas into powerful solutions.
            </p>
          </div>

          {/* Hero Right Graphic Illustration */}
          <div className="lg:col-span-5 flex justify-center items-center py-6 lg:py-0 relative">
            <div className="relative w-full max-w-sm h-64 flex items-center justify-center">

              {/* Arc Path Vector */}
              <svg className="absolute w-full h-full text-[#285870]/40 pointer-events-none overflow-visible" viewBox="0 0 300 200" fill="none">
                <path
                  d="M 20 160 A 130 110 0 0 1 280 160"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
              </svg>

              {/* Floating Arc Icon Nodes */}
              <div className="absolute left-2 bottom-6 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#004060] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Headphones className="w-5 h-5" />
              </div>

              <div className="absolute left-14 top-8 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#285870] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <MessageSquare className="w-5 h-5" />
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#004060] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Mail className="w-5 h-5" />
              </div>

              <div className="absolute right-14 top-8 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#285870] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <PhoneCall className="w-5 h-5" />
              </div>

              <div className="absolute right-2 bottom-6 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#004060] transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <AtSign className="w-5 h-5" />
              </div>

              {/* Center Phone Illustration Card */}
              <div className="relative z-10 w-44 h-48 bg-gradient-to-br from-[#004060] via-[#003860] to-[#002540] rounded-3xl p-4 shadow-2xl shadow-[#002540]/40 border border-[#B8D8E8]/30 flex flex-col justify-between transform transition duration-300 hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-2 bg-white/20 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-teal-400 rounded-full animate-pulse" />
                </div>

                <div className="flex gap-3 items-center my-auto">
                  {/* Phone Handset Graphic */}
                  <div className="w-12 h-28 bg-gradient-to-b from-[#285870] to-[#003860] rounded-2xl flex flex-col justify-between p-2 shadow-inner border border-white/30">
                    <div className="w-full h-4 bg-white/40 rounded-lg" />
                    <div className="w-full h-4 bg-white/40 rounded-lg" />
                  </div>

                  {/* Dialpad Graphic */}
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-3 gap-1.5">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="h-4 bg-white/20 rounded-md" />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 pt-1">
                      <div className="h-4 bg-white/30 rounded-md" />
                      <div className="h-4 bg-teal-400/80 rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="w-12 h-1 bg-white/30 rounded-full mx-auto" />
              </div>

            </div>
          </div>

        </div>
      </section>


      {/* 2. Middle Form Card Section */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 overflow-hidden">
        
        {/* Outer Canvas Background Shapes (matching design image) */}
        {/* Top Right Light Golden/Beige Circle */}
        <div className="absolute -top-10 -right-10 sm:-top-16 sm:-right-16 w-72 h-72 sm:w-96 sm:h-96 bg-[#fde8bb] rounded-full pointer-events-none z-0" />

        {/* Top Left Hollow Golden Ring Outline */}
        <div className="absolute top-12 left-0 sm:left-4 w-32 h-32 sm:w-40 sm:h-40 border-[7px] sm:border-[9px] border-[#e69d00] rounded-full pointer-events-none z-0" />

        {/* Bottom Right Dark Slate Ring Outline */}
        <div className="absolute -bottom-20 -right-16 sm:-right-10 w-72 h-72 sm:w-96 sm:h-96 border-[24px] sm:border-[32px] border-[#29292c] rounded-full pointer-events-none z-0" />

        {/* Main Center White Card */}
        <div className="relative z-10 bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden max-w-5xl mx-auto border border-slate-100">
          
          {/* Bottom-Left Beige/Yellow Accent Fill inside White Card */}
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#fde8bb]/80 rounded-tr-[70px] pointer-events-none" />

          {/* Form and Info Layout Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch relative z-10">
            
            {/* Left Side: Form Area */}
            <div className="lg:col-span-7 flex flex-col justify-between pr-0 lg:pr-6 py-2">
              <div>
                {/* Logo Icon Top-Left (Crescent C icon matching image) */}
                <div className="mb-6 flex items-center">
                  <div className="w-7 h-7 rounded-full border-[3.5px] border-[#29292c] border-t-transparent border-r-transparent -rotate-45 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#29292c]" />
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
                  Contact us
                </h2>

                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md mb-8">
                  Please don't hesitate to reach out to us whenever you need assistance. We'll make sure to respond to you promptly.
                </p>

                {submitted ? (
                  <div className="py-10 text-center space-y-3 animate-fade-in bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                    <h3 className="text-xl font-bold text-slate-900">Thank You!</h3>
                    <p className="text-slate-600 text-xs max-w-xs mx-auto">
                      Your message has been sent successfully. Our team will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pb-2.5 pt-1 bg-transparent border-b border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>

                    {/* Email Input */}
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pb-2.5 pt-1 bg-transparent border-b border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors"
                      />
                    </div>

                    {/* Message Input */}
                    <div>
                      <textarea
                        rows={2}
                        required
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full pb-2.5 pt-1 bg-transparent border-b border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:border-slate-900 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full py-3.5 px-6 bg-black hover:bg-slate-800 text-white font-semibold text-xs tracking-wide rounded-full transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                      >
                        Message
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Side: Overlapping Info Panel */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
              
              {/* Golden Yellow Background Accent Block */}
              <div className="absolute inset-0 bg-[#e69d00] rounded-[28px] transform translate-x-2 translate-y-2 lg:translate-x-4 lg:translate-y-0" />

              {/* Dark Overlapping Info Card */}
              <div className="relative z-10 w-full bg-[#29292c] text-white rounded-[24px] p-6 sm:p-8 shadow-xl my-4 -ml-0 lg:-ml-6">
                
                {/* Solid Golden Circle Dot near Bottom Left edge */}
                <div className="absolute -left-3 bottom-10 w-6 h-6 rounded-full bg-[#e69d00] border-4 border-white shadow-sm" />

                <h3 className="text-xl sm:text-2xl font-bold text-[#e69d00] mb-8 font-display">
                  Info
                </h3>

                <div className="space-y-6 text-xs sm:text-sm font-medium">
                  {/* Email */}
                  <a href="mailto:evershinengp@gmail.com" className="flex items-center gap-4 text-[#f3e4cb] hover:text-white transition-colors">
                    <Mail className="w-5 h-5 text-[#e69d00] shrink-0 stroke-[1.5]" />
                    <span className="truncate">evershinengp@gmail.com</span>
                  </a>

                  {/* Phone */}
                  <a href="tel:+919860118911" className="flex items-center gap-4 text-[#f3e4cb] hover:text-white transition-colors">
                    <Phone className="w-5 h-5 text-[#e69d00] shrink-0 stroke-[1.5]" />
                    <span>+91 9860118911</span>
                  </a>

                  {/* Address */}
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=133,+Bante+Layout,+Wardha+Road,+Nagpur,+Maharashtra+440025" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 text-[#f3e4cb] hover:text-white transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-[#e69d00] shrink-0 stroke-[1.5] mt-0.5" />
                    <span className="leading-snug">133, Bante Layout, Wardha Road, Nagpur</span>
                  </a>

                  {/* Working Hours */}
                  <div className="flex items-center gap-4 text-[#f3e4cb]">
                    <Clock className="w-5 h-5 text-[#e69d00] shrink-0 stroke-[1.5]" />
                    <span>09:00 - 18:00</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* 3. Bottom Contact Details Section (3 Cards) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 text-center gap-8 md:gap-0">

          {/* Column 1: Call Us -> Phone Dialer */}
          <a
            href="tel:+919860118911"
            className="px-6 py-4 flex flex-col items-center group transition-all duration-300 cursor-pointer rounded-2xl hover:bg-slate-100/80"
          >
            <div className="w-14 h-14 rounded-full bg-[#B8D8E8]/40 text-[#004060] flex items-center justify-center mb-4 shadow-sm border border-[#B8D8E8]/60 group-hover:scale-110 group-hover:bg-[#004060] group-hover:text-white transition-all duration-300">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 font-display group-hover:text-[#004060] transition">Call Us</h3>
            <p className="text-xs text-slate-500 mb-2">Mon-Sat from 9am to 6pm</p>
            <span className="text-slate-900 text-sm group-hover:text-[#004060] font-medium transition">
              +91 9860118911
            </span>
          </a>

          {/* Column 2: Our Office -> Google Maps */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=133,+Bante+Layout,+Wardha+Road,+Nagpur,+Maharashtra+440025"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 flex flex-col items-center group transition-all duration-300 cursor-pointer rounded-2xl hover:bg-slate-100/80"
          >
            <div className="w-14 h-14 rounded-full bg-[#B8D8E8]/40 text-[#004060] flex items-center justify-center mb-4 shadow-sm border border-[#B8D8E8]/60 group-hover:scale-110 group-hover:bg-[#004060] group-hover:text-white transition-all duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 font-display group-hover:text-[#004060] transition">Our Office</h3>
            <p className="text-xs text-slate-500 mb-2">Come say hello at our office location.</p>
            <span className="text-slate-900 text-sm max-w-xs leading-snug group-hover:text-[#004060] font-medium transition">
              133, Bante Layout, Wardha Road, Nagpur, Maharashtra – 440025
            </span>
          </a>

          {/* Column 3: Email Us -> Gmail */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=evershinengp@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-4 flex flex-col items-center group transition-all duration-300 cursor-pointer rounded-2xl hover:bg-slate-100/80"
          >
            <div className="w-14 h-14 rounded-full bg-[#B8D8E8]/40 text-[#004060] flex items-center justify-center mb-4 shadow-sm border border-[#B8D8E8]/60 group-hover:scale-110 group-hover:bg-[#004060] group-hover:text-white transition-all duration-300">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 font-display group-hover:text-[#004060] transition">Email Us</h3>
            <p className="text-xs text-slate-500 mb-2">Drop us an email anytime</p>
            <span className="text-slate-900 text-sm group-hover:text-[#004060] font-medium transition">
              evershinengp@gmail.com
            </span>
          </a>

        </div>
      </section>

    </div>
  );
}
