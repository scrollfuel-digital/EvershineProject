import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import heroBannerImg from "../../assets/aboutSectionImages/hero_banner.png";
import evershineTeamImg from "../../assets/aboutSectionImages/evershine_team.png";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // SEO JSON-LD Structured Data for Evershine Solution
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Evershine Solution",
    description:
      "Industrial construction, steel supply, and building solutions provider based in Nagpur, Maharashtra.",
    foundingDate: "2012",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Steel Supply",
      "Industrial Construction",
      "Building Solutions",
      "Engineering Excellence",
    ],
  };

  const capabilities = [
    {
      icon: "precision_manufacturing",
      title: "Strategic Sourcing",
      description:
        "We partner directly with premium mills to secure the highest quality steel, ensuring consistent availability and competitive pricing for our clients.",
    },
    {
      icon: "fact_check",
      title: "Quality Assurance",
      description:
        "Every batch undergoes rigorous testing and certification. We maintain strict compliance with international standards for complete peace of mind.",
    },
    {
      icon: "conveyor_belt",
      title: "Advanced Logistics",
      description:
        "Our robust supply chain network guarantees precise, on-time delivery across diverse geographies, minimizing downtime for your projects.",
    },
    {
      icon: "memory",
      title: "Technology Integration",
      description:
        "Leveraging digital platforms for real-time tracking, inventory management, and seamless communication throughout the procurement cycle.",
    },
  ];

  const whyChooseUs = [
    {
      icon: "verified",
      title: "Unmatched Quality",
      desc: "Certified, high-grade steel products that meet global standards.",
    },
    {
      icon: "payments",
      title: "Transparent Pricing",
      desc: "Competitive rates with no hidden costs or surprises.",
    },
    {
      icon: "local_shipping",
      title: "Reliable Supply",
      desc: "Consistent and timely delivery to keep your projects on schedule.",
    },
    {
      icon: "support_agent",
      title: "Streamlined Procurement",
      desc: "Dedicated support to simplify your purchasing process.",
    },
    {
      icon: "engineering",
      title: "Industry Expertise",
      desc: "Deep knowledge of industrial applications and requirements.",
    },
  ];

  const timeline = [
    {
      year: "2015",
      desc: "Founded with a vision to streamline supply.",
      colorClass: "bg-primary-container text-primary-container",
      dotClass: "bg-primary-container",
    },
    {
      year: "2018",
      desc: "Expanded operations across 10 major cities.",
      colorClass: "bg-primary-container text-primary-container",
      dotClass: "bg-primary-container",
    },
    {
      year: "2021",
      desc: "Reached milestone of 25K tons supplied annually.",
      colorClass: "bg-primary-container text-primary-container",
      dotClass: "bg-primary-container",
    },
    {
      year: "2026",
      desc: "Aiming to be India's top strategic supply partner.",
      colorClass: "bg-on-tertiary-container text-on-tertiary-container",
      dotClass: "bg-on-tertiary-container",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Managing Director",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Anita Sharma",
      role: "Head of Procurement",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Vikram Singh",
      role: "Logistics Director",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Priya Patel",
      role: "Quality Assurance Lead",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const industries = [
    {
      title: "Construction",
      image:
        "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Infrastructure",
      image:
        "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Manufacturing",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <main
      className="bg-background text-on-surface font-body-md antialiased overflow-x-hidden selection:bg-tertiary-container selection:text-on-tertiary pt-[64px] sm:pt-[72px] lg:pt-[84px]"
      itemScope
      itemType="https://schema.org/AboutPage"
    >
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative w-full min-h-[580px] sm:min-h-[680px] lg:min-h-[819px] flex items-center justify-center overflow-hidden bg-on-surface">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-40 transition-transform duration-1000 transform hover:scale-105"
            style={{
              backgroundImage: `url(${heroBannerImg})`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-surface via-on-surface/50 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center text-on-primary py-16">
          <h1 className="font-headline-xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-stack-md max-w-4xl mx-auto leading-tight">
            Built on Steel. <br />
            <span className="text-inverse-primary">Driven by Trust.</span>
          </h1>
          <p className="font-body-lg text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-stack-lg text-surface-variant leading-relaxed">
            We simplify steel procurement for businesses with reliable
            products, transparent pricing, and dependable supply.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/products"
              className="bg-primary-fixed text-on-primary-fixed font-label-md px-8 py-4 rounded hover:bg-primary-fixed-dim transition-colors w-full sm:w-auto text-center font-semibold shadow-md hover:shadow-lg"
            >
              Explore Our Products
            </Link>
            <Link
              to="/contact"
              className="border border-outline text-on-primary font-label-md px-8 py-4 rounded hover:bg-on-surface-variant/40 transition-colors w-full sm:w-auto text-center font-semibold"
            >
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-stack-xl border-b border-outline-variant bg-surface-container-lowest relative z-20 -mt-10 mx-margin-mobile md:mx-margin-desktop rounded-xl shadow-md">
        <div className="max-w-container-max mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center md:divide-x md:divide-outline-variant">
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-primary-container">
                10+
              </span>
              <span className="font-label-md text-sm sm:text-base text-on-surface-variant mt-2">
                Years Experience
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-primary-container">
                500+
              </span>
              <span className="font-label-md text-sm sm:text-base text-on-surface-variant mt-2">
                Clients
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-primary-container">
                50K+
              </span>
              <span className="font-label-md text-sm sm:text-base text-on-surface-variant mt-2">
                Tons Supplied
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-primary-container">
                25+
              </span>
              <span className="font-label-md text-sm sm:text-base text-on-surface-variant mt-2">
                Cities
              </span>
            </div>
            <div className="flex flex-col items-center col-span-2 md:col-span-1 border-t md:border-t-0 pt-6 md:pt-0 border-outline-variant">
              <span className="font-headline-lg text-3xl sm:text-4xl md:text-5xl font-bold text-primary-container">
                99%
              </span>
              <span className="font-label-md text-sm sm:text-base text-on-surface-variant mt-2">
                On-Time Delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-stack-xl px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid md:grid-cols-2 gap-stack-lg items-center">
          <div className="relative h-[360px] sm:h-[450px] md:h-[500px] rounded-xl overflow-hidden group shadow-lg">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              style={{
                backgroundImage: `url(${evershineTeamImg})`,
              }}
            />
            <div className="absolute inset-0 border border-outline-variant rounded-xl pointer-events-none" />
          </div>

          <div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold mb-stack-md text-on-surface leading-tight">
              More Than a Steel Supplier. <br />
              <span className="text-on-surface-variant">
                Your Long-Term Supply Partner.
              </span>
            </h2>
            <div className="font-body-md text-sm sm:text-base text-on-surface-variant space-y-4 leading-relaxed">
              <p>
                At Evershine, we understand that steel is the backbone of your
                operations. Since our inception, we have been dedicated to
                providing not just raw materials, but comprehensive supply chain
                solutions tailored for the heavy industrial sector.
              </p>
              <p>
                Our commitment goes beyond fulfilling orders. We partner with
                procurement officers and engineers to ensure high-grade
                materials, transparent specifications, and reliable delivery
                schedules that keep your projects on track and on budget.
              </p>
              <p>
                We combine deep industry expertise with modern logistics,
                ensuring a zero-error approach to quality control and
                distribution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Us */}
      <section className="py-stack-xl bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold mb-stack-lg text-center text-primary-container">
            Why Businesses Choose Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="bg-surface-container-lowest p-6 rounded-lg shadow-sm border border-outline-variant text-center hover:shadow-md hover:border-primary-container transition-all duration-200"
              >
                <span className="material-symbols-outlined text-4xl text-on-tertiary-container mb-4">
                  {item.icon}
                </span>
                <h3 className="font-headline-md text-lg font-bold mb-2 text-on-surface">
                  {item.title}
                </h3>
                <p className="font-body-md text-on-surface-variant text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="py-stack-xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center text-on-surface">
          From Steel Supplier to Strategic Partner
        </h2>
        <p className="text-center font-body-lg text-sm sm:text-base text-on-surface-variant mb-stack-lg max-w-2xl mx-auto">
          Our journey of growth and commitment to excellence over the years.
        </p>

        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center mt-12 gap-8 md:gap-4 before:hidden md:before:block before:absolute before:top-1/2 before:left-0 before:w-full before:h-0.5 before:bg-outline-variant before:-translate-y-1/2">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col items-center text-center bg-background px-4 w-full md:w-auto"
            >
              <div
                className={`w-4 h-4 rounded-full ${item.dotClass} mb-4 outline outline-4 outline-background`}
              />
              <h4 className={`font-headline-md text-xl font-bold ${item.colorClass}`}>
                {item.year}
              </h4>
              <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-2 max-w-[160px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Capabilities */}
      <section className="py-stack-xl bg-surface-container-highest">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold mb-stack-lg text-center text-on-surface">
            Our Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-sm border border-outline-variant hover:border-primary-container transition-all duration-300 hover:shadow-md"
              >
                <span className="material-symbols-outlined text-4xl text-on-tertiary-container mb-4 block">
                  {cap.icon}
                </span>
                <h3 className="font-headline-md text-xl sm:text-2xl font-bold mb-3 text-on-surface">
                  {cap.title}
                </h3>
                <p className="font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Coverage */}
      <section className="py-stack-xl max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold mb-stack-lg text-center text-on-surface">
          Industry Coverage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {industries.map((ind, idx) => (
            <div
              key={idx}
              className="relative h-64 rounded-xl overflow-hidden group shadow-md"
            >
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url(${ind.image})` }}
              />
              <div className="absolute inset-0 bg-secondary-container opacity-20 group-hover:opacity-10 transition-opacity z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent opacity-85 z-10"></div>
              <div className="absolute bottom-6 left-6 z-20">
                <h3 className="font-headline-md text-xl sm:text-2xl font-bold text-on-primary">
                  {ind.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-stack-xl bg-surface-container-highest border-b border-outline-variant">
        <div className="max-w-3xl mx-auto text-center px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-xl text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 text-primary-container leading-tight">
            Let's Build Something Strong Together
          </h2>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant mb-8 leading-relaxed">
            Partner with us for your next major project and experience the
            Evershine difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="bg-primary-container text-on-primary font-label-md px-8 py-4 rounded hover:opacity-90 transition-opacity w-full sm:w-auto text-center font-semibold shadow-md"
            >
              Get a Quote
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary-container text-primary-container font-label-md px-8 py-4 rounded hover:bg-primary-container hover:text-on-primary transition-colors w-full sm:w-auto text-center font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
