import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Headphones,
  MessageSquare,
  PhoneCall,
  AtSign,
  ArrowRight
} from 'lucide-react';

export default function Contact() {
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
      <section className="relative overflow-hidden bg-gradient-to-b from-[#B8D8E8]/30 via-slate-50/60 to-slate-50 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Subtle background brand glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#B8D8E8]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#285870]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 items-center relative z-10">

          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004060] to-[#285870]">Contact</span> Us
            </h1>

            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Let's Build Something Great Together
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
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
              {/* Node 1 - Bottom Left (Headset) */}
              <div className="absolute left-2 bottom-6 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#004060] transition-transform hover:scale-110">
                <Headphones className="w-5 h-5" />
              </div>

              {/* Node 2 - Top Left (Message) */}
              <div className="absolute left-14 top-8 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#285870] transition-transform hover:scale-110">
                <MessageSquare className="w-5 h-5" />
              </div>

              {/* Node 3 - Top Center (Mail) */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#004060] transition-transform hover:scale-110">
                <Mail className="w-5 h-5" />
              </div>

              {/* Node 4 - Top Right (PhoneCall) */}
              <div className="absolute right-14 top-8 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#285870] transition-transform hover:scale-110">
                <PhoneCall className="w-5 h-5" />
              </div>

              {/* Node 5 - Bottom Right (AtSign) */}
              <div className="absolute right-2 bottom-6 w-11 h-11 rounded-full bg-white shadow-md border border-[#B8D8E8] flex items-center justify-center text-[#004060] transition-transform hover:scale-110">
                <AtSign className="w-5 h-5" />
              </div>

              {/* Center Phone Illustration Card */}
              <div className="relative z-10 w-44 h-48 bg-gradient-to-br from-[#004060] via-[#003860] to-[#002540] rounded-3xl p-4 shadow-2xl shadow-[#002540]/40 border border-[#B8D8E8]/30 flex flex-col justify-between transform transition hover:scale-105">
                <div className="flex items-center justify-between">
                  <div className="w-8 h-2 bg-white/20 rounded-full" />
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
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


      {/* 2. Middle Dark Form Card Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-[32px] bg-[#285870] p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/20 overflow-hidden">

          {/* Background Lighting Accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#004060]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Top Badge & Header */}
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 relative z-10">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest text-[#B8D8E8] uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B8D8E8]" />
              CONTACT US
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Get in Touch
            </h2>
          </div>

          {/* Success Notification */}
          {submitted ? (
            <div className="py-16 text-center text-white space-y-4 relative z-10">
              <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold">Thank You!</h3>
              <p className="text-[#B8D8E8] text-sm max-w-md mx-auto">
                Your message has been sent successfully. Our team will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

              {/* Form Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-[#B8D8E8] mb-2">
                    Full Name <span className="text-teal-300">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-1 focus:ring-[#B8D8E8] transition"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-[#B8D8E8] mb-2">
                    Email Address <span className="text-teal-300">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-1 focus:ring-[#B8D8E8] transition"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-medium text-[#B8D8E8] mb-2">
                    Phone Number <span className="text-teal-300">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-1 focus:ring-[#B8D8E8] transition"
                  />
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="block text-xs font-medium text-[#B8D8E8] mb-2">
                    Enquiry Type <span className="text-teal-300">*</span>
                  </label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1d4357] border border-white/15 text-white text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-1 focus:ring-[#B8D8E8] transition cursor-pointer"
                  >
                    <option value="General Enquiry" className="bg-[#1d4357]">General Enquiry</option>
                    <option value="Roofing Sheets Inquiry" className="bg-[#1d4357]">Roofing Sheets Inquiry</option>
                    <option value="Purlins & Structure" className="bg-[#1d4357]">Purlins & Structural Profile</option>
                    <option value="Custom Project Quote" className="bg-[#1d4357]">Custom Project Quote</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-medium text-[#B8D8E8] mb-2">
                  Message <span className="text-teal-300">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-1 focus:ring-[#B8D8E8] transition resize-none"
                />
              </div>

              {/* Agreement Checkbox */}
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="checkbox"
                  id="agreeCheck"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#004060] focus:ring-[#B8D8E8] focus:ring-offset-0 cursor-pointer"
                />
                <label htmlFor="agreeCheck" className="text-xs text-[#B8D8E8]/90 cursor-pointer">
                  I agree to talk about my project with Evershine Roofing Solutions.
                </label>
              </div>

              {/* Submit Button Centered */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full text-white text-sm font-semibold border border-[#B8D8E8]/40 bg-[#004060] hover:bg-[#285870] hover:border-[#B8D8E8] transition-all duration-300 inline-flex items-center justify-center gap-2 group shadow-lg shadow-[#001f38]/60 backdrop-blur-sm"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </form>
          )}
        </div>
      </section>


      {/* 3. Bottom Contact Details Section (3 Columns) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 text-center gap-8 md:gap-0">

          {/* Column 1: Call Us */}
          <div className="px-4 py-2 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#B8D8E8]/40 text-[#004060] flex items-center justify-center mb-4 shadow-sm border border-[#B8D8E8]/50">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Call Us</h3>
            <p className="text-xs text-slate-500 mb-2">Mon-Sat from 9am to 6pm</p>
            <a href="tel:+917498147921" className="text-slate-900 font-bold text-sm hover:text-[#004060] transition">
              +91 9860118911
            </a>
          </div>

          {/* Column 2: Our Office */}
          <div className="px-4 py-2 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#B8D8E8]/40 text-[#004060] flex items-center justify-center mb-4 shadow-sm border border-[#B8D8E8]/50">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Our Office</h3>
            <p className="text-xs text-slate-500 mb-2">Come say hello at our office locations.</p>
            <p className="text-slate-900 font-bold text-sm max-w-xs leading-snug">
              133, Bante Layout, Wardha Road, Nagpur, Maharashtra – 440025
            </p>
          </div>

          {/* Column 3: Email Us */}
          <div className="px-4 py-2 flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#B8D8E8]/40 text-[#004060] flex items-center justify-center mb-4 shadow-sm border border-[#B8D8E8]/50">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1">Email Us</h3>
            <p className="text-xs text-slate-500 mb-2">Drop us an email anytime</p>
            <a href="mailto:info@evershineroofing.com" className="text-slate-900 font-bold text-sm hover:text-[#004060] transition">
              evershinengp@gmail.com
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
