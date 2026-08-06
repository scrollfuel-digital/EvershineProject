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
  Sparkles
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
        <div 
          className="absolute inset-0 bg-contain bg-bottom bg-no-repeat opacity-25 pointer-events-none mix-blend-multiply"
          style={{ backgroundImage: `url(${citySkylineBg})` }}
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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative rounded-[32px] bg-[#285870] p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/20 overflow-hidden">

          {/* Background Lighting Accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#004060]/40 rounded-full blur-3xl pointer-events-none" />

          {/* Success Notification */}
          {submitted ? (
            <div className="py-16 text-center text-white space-y-4 relative z-10 animate-fade-in">
              <CheckCircle2 className="w-16 h-16 text-teal-300 mx-auto animate-bounce" />
              <h3 className="text-2xl font-bold font-display">Thank You!</h3>
              <p className="text-[#B8D8E8] text-sm max-w-md mx-auto">
                Your message has been sent successfully. Our technical team will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

              {/* Form Grid */}
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#B8D8E8] mb-2">
                    Full Name <span className="text-teal-300">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300/60 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-2 focus:ring-[#B8D8E8]/30 transition-all duration-200"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#B8D8E8] mb-2">
                    Email Address <span className="text-teal-300">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300/60 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-2 focus:ring-[#B8D8E8]/30 transition-all duration-200"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#B8D8E8] mb-2">
                    Phone Number <span className="text-teal-300">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98601 18911"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300/60 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-2 focus:ring-[#B8D8E8]/30 transition-all duration-200"
                  />
                </div>

                {/* Enquiry Type */}
                <div>
                  <label className="block text-xs font-semibold text-[#B8D8E8] mb-2">
                    Enquiry Type <span className="text-teal-300">*</span>
                  </label>
                  <select
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#1d4357] border border-white/20 text-white text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-2 focus:ring-[#B8D8E8]/30 transition-all duration-200 cursor-pointer"
                  >
                    <option value="General Enquiry" className="bg-[#285870]">General Enquiry</option>
                    <option value="Roofing Sheets Inquiry" className="bg-[#285870]">Roofing Sheets Inquiry</option>
                    <option value="Purlins & Structure" className="bg-[#285870]">Purlins & Structural Profile</option>
                    <option value="Custom Project Quote" className="bg-[#285870]">Custom Project Quote</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-[#B8D8E8] mb-2">
                  Message <span className="text-teal-300">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-300/60 text-sm focus:outline-none focus:border-[#B8D8E8] focus:ring-2 focus:ring-[#B8D8E8]/30 transition-all duration-200 resize-none"
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
                <label htmlFor="agreeCheck" className="text-xs text-[#B8D8E8]/90 cursor-pointer select-none">
                  I agree to talk about my project with Evershine Roofing Solutions.
                </label>
              </div>

              {/* Submit Button Centered */}
              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full text-white text-sm font-bold border border-[#B8D8E8]/40 bg-[#004060] hover:bg-[#003350] hover:border-[#B8D8E8] transition-all duration-300 inline-flex items-center justify-center gap-2 group shadow-xl shadow-[#001f38]/50 backdrop-blur-sm cursor-pointer hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </form>
          )}
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
