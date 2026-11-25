import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Handshake,
  Leaf,
  Lightbulb,
  Eye,
  Target,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import ScrollReveal from "../../components/ui/ScrollReveal";
import AnimatedCounter from "../../components/ui/AnimatedCounter";
import heroBannerImg from "../../assets/aboutSectionImages/hero_banner.png";
import evershineTeamImg from "../../assets/aboutSectionImages/evershine_team.png";

const About = () => {
  const [openPartnerItems, setOpenPartnerItems] = useState({
    0: true,
    1: false,
    2: false,
    3: false,
  });

  const togglePartnerItem = (idx) => {
    setOpenPartnerItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO JSON-LD Structured Data for Evershine Solution
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Evershine Solution",
    description:
      "Industrial construction, steel supply, and PEB roofing solutions provider based in Nagpur, Maharashtra.",
    foundingDate: "2013",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Steel Supply",
      "Pre-Engineered Buildings (PEB)",
      "Industrial Roofing",
      "Structural Steel",
      "Building Solutions",
    ],
  };

  const whyPartnerWithUs = [
    {
      title: "Certified Mill Partnerships",
      desc: "Direct sourcing and processing of genuine coils, tubes, and structural steel from TATA, JSW, Hindalco, Apollo, and AM/NS—backed by mill test certificates (MTC) for strict project compliance.",
    },
    {
      title: "In-House Nagpur Manufacturing",
      desc: "Custom roll-forming, precision length cutting, and structural component fabrication executed directly at our Nagpur plant to match your exact site drawings and reduce off-cut wastage.",
    },
    {
      title: "Complete Under-One-Roof Supply",
      desc: "From primary PEB structures, hollow sections, and Z/C purlins to color-coated steel/aluminum roofing profiles, wall cladding, flashings, and fasteners—delivered as one coordinated package.",
    },
    {
      title: "13+ Years of Technical & BOQ Support",
      desc: "Our team reviews your structural layouts and Bills of Quantities (BOQs) to recommend the right gauge, coating, and brand specification for your budget and load requirements.",
    },
  ];

  return (
    <main
      className="bg-[#fdf8ef] text-slate-900 font-body-md antialiased overflow-x-hidden selection:bg-amber-300 selection:text-slate-950"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-[#002840] pt-[110px] md:pt-[130px] lg:pt-[140px]">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 transition-transform duration-1000 transform hover:scale-105"
            style={{
              backgroundImage: `url(${heroBannerImg})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002840] via-[#002840]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          <ScrollReveal duration={4200} distance={100}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 max-w-4xl mx-auto leading-tight font-display">
              Built on Steel. <br />
              <span className="text-[#FBBF24]">Driven by Trust.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal duration={4200} distance={100}>
            <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 text-slate-200 leading-relaxed font-medium">
              We simplify industrial steel and roofing procurement for businesses with reliable products, transparent pricing, and dependable supply.
            </p>
          </ScrollReveal>
          <ScrollReveal duration={4200} distance={100}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/products"
                className="bg-[#FBBF24] text-[#003860] px-8 py-3.5 rounded-xl font-bold hover:bg-amber-400 transition-all w-full sm:w-auto text-center shadow-md hover:shadow-lg active:scale-95"
              >
                Explore Our Products
              </Link>
              <Link
                to="/contact"
                className="border border-white/30 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-white/10 transition-all w-full sm:w-auto text-center active:scale-95"
              >
                Talk to Our Team
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Metrics Number Line */}
      <section className="py-8 sm:py-10 border-b border-slate-200/80 bg-white relative z-20 -mt-10 mx-4 sm:mx-8 lg:mx-14 rounded-2xl shadow-lg border border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-center md:divide-x md:divide-slate-200">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004060]">
                <AnimatedCounter end={13} duration={5} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 uppercase tracking-wide">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004060]">
                <AnimatedCounter end={500} duration={5} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 uppercase tracking-wide">
                Clients
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004060]">
                <AnimatedCounter end={50} duration={5} suffix="K+" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 uppercase tracking-wide">
                Tons Supplied
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004060]">
                <AnimatedCounter end={25} duration={5} suffix="+" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 uppercase tracking-wide">
                Cities
              </span>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1 border-t md:border-t-0 pt-6 md:pt-0 border-slate-200">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#004060]">
                <AnimatedCounter end={99} duration={5} suffix="%" />
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-600 mt-2 uppercase tracking-wide">
                On-Time Delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US Section */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-stretch">
          {/* Left Column: Image Container with Fade-In Left (4s duration, high depth) */}
          <ScrollReveal
            direction="left"
            duration={4000}
            distance={95}
            threshold={0.15}
            className="h-full"
          >
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-full min-h-[380px] lg:min-h-[460px] rounded-2xl overflow-hidden group shadow-xl flex">
              <img
                src={evershineTeamImg}
                alt="Evershine Solution manufacturing facility and team in Nagpur"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003860]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 border border-slate-200/50 rounded-2xl pointer-events-none" />
            </div>
          </ScrollReveal>

          {/* Right Column: Text content with Fade-In Right (4s duration, high depth) */}
          <ScrollReveal
            direction="right"
            duration={4000}
            distance={95}
            threshold={0.15}
            className="h-full"
          >
            <div className="flex flex-col justify-between h-full py-0.5 sm:py-1">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-[36px] xl:text-[38px] font-extrabold text-[#004060] leading-[1.25] mb-5 sm:mb-6 font-display">
                  Pre-Engineered Buildings &amp; High-Performance Industrial Roofing Systems
                </h2>
              </div>
              <div className="text-slate-700 space-y-4 sm:space-y-5 text-base sm:text-lg lg:text-[19px] leading-[1.75] text-justify [text-align-last:left]">
                <p className="text-justify [text-align-last:left]">
                  Operating out of Nagpur since 2013, we are a specialized manufacturing and supply partner for Pre-Engineered Buildings (PEB) and high-performance industrial roofing systems. Over the past 13 years, we have bridged the gap between tier-1 steel and aluminum mills and on-site project execution—delivering structural and cladding solutions that keep commercial, industrial, and infrastructure projects on schedule.
                </p>
                <p className="text-justify [text-align-last:left]">
                  By combining our own production facility in Nagpur with direct supply partnerships from JSW, Hindalco, and AM/NS (ArcelorMittal Nippon Steel), we give contractors, builders, and procurement teams direct access to certified materials, custom sizing, and rapid dispatch—without multi-tier dealer delays.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Vision and Values */}
      <section className="bg-slate-50/80 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-100">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <h2 className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-center text-[#004060] font-display mb-10 sm:mb-12">
            Vision and Values
          </h2>

          {/* Top Overlapping Values Banner */}
          <div className="max-w-5xl mx-auto bg-[#004060] text-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 lg:p-9 shadow-xl relative z-10 -mb-12 sm:-mb-14">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
              <div className="flex flex-col items-center">
                <Award className="w-7 h-7 sm:w-8 sm:h-8 text-[#B8D8E8] mb-2 sm:mb-2.5" />
                <span className="text-sm sm:text-base lg:text-[17px] font-bold tracking-wide">
                  Quality &amp; Durability
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Handshake className="w-7 h-7 sm:w-8 sm:h-8 text-[#B8D8E8] mb-2 sm:mb-2.5" />
                <span className="text-sm sm:text-base lg:text-[17px] font-bold tracking-wide">
                  Trust &amp; Transparency
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Leaf className="w-7 h-7 sm:w-8 sm:h-8 text-[#B8D8E8] mb-2 sm:mb-2.5" />
                <span className="text-sm sm:text-base lg:text-[17px] font-bold tracking-wide">
                  Sustainability
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Lightbulb className="w-7 h-7 sm:w-8 sm:h-8 text-[#B8D8E8] mb-2 sm:mb-2.5" />
                <span className="text-sm sm:text-base lg:text-[17px] font-bold tracking-wide">
                  Innovation
                </span>
              </div>
            </div>
          </div>

          {/* Main White Overlapping Card with Vision & Mission Split */}
          <div className="max-w-6xl mx-auto bg-white rounded-[24px] sm:rounded-[32px] pt-18 sm:pt-20 lg:pt-22 pb-10 sm:pb-14 px-6 sm:px-12 lg:px-16 shadow-lg border border-slate-200/80 relative z-0">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start relative">
              {/* Center Vertical Separator Line for Desktop */}
              <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-slate-200 -translate-x-1/2" />

              {/* Left Column: Vision */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#004060]/10 flex items-center justify-center shrink-0">
                    <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-[#004060]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#004060] font-display">
                    Vision
                  </h3>
                </div>
                <p className="text-slate-700 text-base sm:text-lg lg:text-[19px] leading-[1.75] text-justify [text-align-last:left]">
                  To become a preferred industrial solutions partner by
                  consistently delivering quality, reliability, and customer
                  satisfaction.
                </p>
              </div>

              {/* Right Column: Mission */}
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#004060]/10 flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 sm:w-7 sm:h-7 text-[#004060]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#004060] font-display">
                    Mission
                  </h3>
                </div>
                <p className="text-slate-700 text-base sm:text-lg lg:text-[19px] leading-[1.75] text-justify [text-align-last:left]">
                  To provide innovative and dependable industrial solutions that
                  help businesses achieve operational efficiency and sustainable
                  growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Commercial Buyers Partner With Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#fdf8ef] border-t border-[#004060]/15">
        <div className="max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <ScrollReveal duration={2200} distance={60}>
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#004060] font-display">
                Why Commercial Buyers Partner With Us
              </h2>
              <p className="text-slate-600 text-base sm:text-lg lg:text-[19px] mt-3 sm:mt-4 leading-relaxed">
                Direct mill access, in-house precision manufacturing, and end-to-end technical support for industrial projects.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col space-y-6 sm:space-y-8">
            {whyPartnerWithUs.map((item, index) => {
              const isOpen = !!openPartnerItems[index];
              return (
                <ScrollReveal
                  key={index}
                  duration={4000}
                  delay={index * 350}
                  distance={95}
                  threshold={0.1}
                >
                  <div className="border-b border-[#9eb4c7] pb-3 transition-colors">
                    <button
                      type="button"
                      onClick={() => togglePartnerItem(index)}
                      className="w-full flex items-center justify-between text-left py-2.5 cursor-pointer group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg sm:text-xl lg:text-[22px] font-bold text-[#004060] group-hover:text-[#002840] transition-colors leading-snug">
                        {item.title}
                      </span>
                      <span className="p-1 rounded-full text-[#004060] group-hover:bg-[#004060]/10 transition-colors ml-3 shrink-0">
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                      </span>
                    </button>
                    {isOpen && (
                      <p className="pt-1 pb-3 text-slate-700 text-base sm:text-[16.5px] lg:text-[17.5px] leading-[1.75] text-justify [text-align-last:left]">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
