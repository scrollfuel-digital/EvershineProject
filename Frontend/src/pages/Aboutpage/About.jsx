import React from 'react';
import { ShieldCheck, Users, Clock, Award, Sparkles, Eye, Target, Handshake, Leaf, Lightbulb } from 'lucide-react';
import evershineTeamImg from '../../assets/aboutSectionImages/evershine_team.png';
import heroBannerImg from '../../assets/aboutSectionImages/hero_banner.png';
import WhyChooseUs from '../../components/ui/WhyChooseUs';

const About = () => {
  // SEO JSON-LD Structured Data for Evershine Solution
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Evershine Solution",
    "description": "Industrial construction and building solutions provider based in Nagpur, Maharashtra.",
    "foundingDate": "2012",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nagpur",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "knowsAbout": ["Industrial Construction", "Building Solutions", "Engineering Excellence"]
  };

  const uniqueFactors = [
    {
      title: "Quality You Can Trust",
      icon: ShieldCheck,
      isActive: false
    },
    {
      title: "Expert Engineering Team",
      icon: Users,
      isActive: false
    },
    {
      title: "On-Time Project Delivery",
      icon: Clock,
      isActive: false
    },
    {
      title: "Transparent & Competitive Pricing",
      icon: Award,
      isActive: true
    }
  ];

  return (
    <main className="w-full font-sans text-slate-800 bg-white" itemScope itemType="https://schema.org/AboutPage">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 1. HERO BANNER SECTION */}
      <section className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] overflow-hidden bg-slate-900">
        <img
          src={heroBannerImg}
          alt="Evershine Solution Industrial Facility"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </section>

      {/* 2. ABOUT COMPANY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Description */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#004060] tracking-tight font-display">
              About Company
            </h2>

            <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                Evershine Solution was established in 2012 with a vision to provide reliable industrial construction and building solutions that meet the evolving needs of modern businesses. Over the years, we have earned the trust of clients through our commitment to quality, transparency, and customer satisfaction.
              </p>
              <p>
                Based in Nagpur, Maharashtra, we serve clients across multiple industries by delivering innovative and durable solutions tailored to their specific requirements. Every project we undertake reflects our dedication to engineering excellence and long-term value.
              </p>
            </div>

            {/* Red Pill/Bullet Accent */}
            <div className="pt-2">
              <div className="w-3.5 h-7 bg-red-500 rounded-full" />
            </div>
          </div>

          {/* Right Column: Image with Blue Arch Shapes */}
          <div className="lg:col-span-6 flex justify-center py-6 sm:py-8">
            <div className="relative w-full max-w-lg">
              
              {/* Top-Left Blue Arch Shape */}
              <div className="absolute -top-6 -left-6 w-28 h-28 sm:w-36 sm:h-36 bg-[#004060] rounded-t-full z-0 pointer-events-none" />

              {/* Bottom-Right Blue Arch Shape */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 sm:w-36 sm:h-36 bg-[#004060] rounded-b-full z-0 pointer-events-none" />

              {/* Main Photo Card */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src={evershineTeamImg}
                  alt="Evershine Solution Team and Quality Inspection Facility"
                  className="w-full h-[280px] sm:h-[360px] object-cover"
                  loading="eager"
                />
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. VISION AND VALUES / MISSION SECTION (Matching Provided Reference Image Design) */}
      <section className="bg-slate-50/80 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#004060] font-display mb-10">
            Vision and Values
          </h2>

          {/* Top Overlapping Values Banner */}
          <div className="max-w-4xl mx-auto bg-[#004060] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 shadow-xl relative z-10 -mb-12 sm:-mb-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Award className="w-6 h-6 text-[#B8D8E8] mb-2" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">Quality & Durability</span>
              </div>
              <div className="flex flex-col items-center">
                <Handshake className="w-6 h-6 text-[#B8D8E8] mb-2" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">Trust & Transparency</span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="w-6 h-6 text-[#B8D8E8] mb-2" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">Sustainability</span>
              </div>
              <div className="flex flex-col items-center">
                <Lightbulb className="w-6 h-6 text-[#B8D8E8] mb-2" />
                <span className="text-xs sm:text-sm font-bold tracking-wide">Innovation</span>
              </div>
            </div>
          </div>

          {/* Main White Overlapping Card with Vision & Mission Split */}
          <div className="max-w-5xl mx-auto bg-white rounded-[24px] sm:rounded-[32px] pt-18 sm:pt-20 pb-10 sm:pb-12 px-6 sm:px-12 shadow-lg border border-slate-200/80 relative z-0">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start relative">
              
              {/* Center Vertical Separator Line for Desktop */}
              <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-slate-200 -translate-x-1/2" />

              {/* Left Column: Vision */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004060]/10 flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 text-[#004060]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    Vision
                  </h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium pt-1">
                  To become a preferred industrial solutions partner by consistently delivering quality, reliability, and customer satisfaction.
                </p>
              </div>

              {/* Right Column: Mission */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#004060]/10 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-[#004060]" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    Mission
                  </h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium pt-1">
                  To provide innovative and dependable industrial solutions that help businesses achieve operational efficiency and sustainable growth.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. COMPANY UNIQUE FACTOR SECTION */}
      <section className="bg-slate-50/80 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-[#004060] font-display mb-12 sm:mb-16">
            Company Unique Factor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {uniqueFactors.map((factor, idx) => {
              const IconComp = factor.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:-translate-y-1.5 ${
                    factor.isActive
                      ? 'bg-[#004060] text-white shadow-xl shadow-[#004060]/20'
                      : 'bg-white text-slate-800 border border-slate-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  {/* Icon Circle Badge */}
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm ${
                      factor.isActive
                        ? 'bg-white text-[#004060]'
                        : 'bg-slate-50 border border-slate-100 text-[#004060]'
                    }`}
                  >
                    <IconComp className="w-7 h-7" />
                  </div>

                  {/* Factor Title */}
                  <h3
                    className={`text-base font-bold tracking-tight ${
                      factor.isActive ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {factor.title}
                  </h3>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE US SECTION */}
      <WhyChooseUs />

    </main>
  );
};

export default About;
