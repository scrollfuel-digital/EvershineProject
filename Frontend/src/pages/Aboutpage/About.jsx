import React from 'react';
import evershineTeamImg from '../../assets/aboutSectionImages/evershine_team.png';
import heroBannerImg from '../../assets/aboutSectionImages/hero_banner.png';

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

  return (
    <main className="w-full font-sans text-slate-800 bg-white" itemScope itemType="https://schema.org/AboutPage">
      {/* SEO Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* 1. Hero Banner Section */}
      <section className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] overflow-hidden bg-slate-900">
        <img
          src={heroBannerImg}
          alt="Evershine Solution Industrial Facility"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </section>

      {/* 2. Top Content Section ("What We Do" style card) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10 mb-16 sm:mb-20">
        <article className="bg-[#f4f5f7] rounded-lg p-8 sm:p-12 md:p-16 shadow-sm border border-slate-200/60">
          <header className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              About Evershine Solution
            </h2>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mt-2">
              Trusted Excellence Since 2012
            </h3>
          </header>

          <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
            <p className="font-semibold text-slate-800 text-base sm:text-lg leading-snug">
              Evershine Solution was established with a vision to provide reliable industrial construction and building solutions that meet the evolving needs of modern businesses. Over the years, we have earned the trust of clients through our commitment to quality, transparency, and customer satisfaction.
            </p>
            <p>
              Based in Nagpur, Maharashtra, we serve clients across multiple industries by delivering innovative and durable solutions tailored to their specific requirements. Every project we undertake reflects our dedication to engineering excellence and long-term value.
            </p>
          </div>
        </article>
      </section>

      {/* 3. Bottom Two-Column Section (Mission & Vision) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
          
          {/* Left Column: Evershine Team Inspection Image */}
          <div className="lg:col-span-6">
            <figure className="relative rounded-lg overflow-hidden shadow-lg border border-slate-200">
              <img
                src={evershineTeamImg}
                alt="Evershine Solution Quality Inspection Engineers in Blue Hardhats"
                className="w-full h-[340px] sm:h-[420px] object-cover"
                loading="lazy"
              />
            </figure>
          </div>

          {/* Right Column: Mission & Vision Content */}
          <div className="lg:col-span-6 space-y-6">
            <article className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 inline-block mr-2">
                Our Mission
              </h3>
              <p className="text-slate-600 inline">
                To provide innovative and dependable industrial solutions that help businesses achieve operational efficiency and sustainable growth.
              </p>
            </article>

            <article className="space-y-1.5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 inline-block mr-2">
                Our Vision
              </h3>
              <p className="text-slate-600 inline">
                To become a preferred industrial solutions partner by consistently delivering quality, reliability, and customer satisfaction.
              </p>
            </article>
          </div>

        </div>
      </section>
    </main>
  );
};

export default About;
 
 
 
 
 
 
 
 
 // Old code, commented due to overlay
 
 
 
 // import React from 'react';
  // import evershineTeamImg from '../../assets/aboutSectionImages/evershine_team.png';
  // import heroBannerImg from '../../assets/aboutSectionImages/hero_banner.png';

  // const About = () => {
  //   // SEO JSON-LD Structured Data for Evershine Solution
  //   const schemaData = {
  //     "@context": "https://schema.org",
  //     "@type": "Organization",
  //     "name": "Evershine Solution",
  //     "description": "Industrial construction and building solutions provider based in Nagpur, Maharashtra.",
  //     "foundingDate": "2012",
  //     "address": {
  //       "@type": "PostalAddress",
  //       "addressLocality": "Nagpur",
  //       "addressRegion": "Maharashtra",
  //       "addressCountry": "IN"
  //     },
  //     "knowsAbout": ["Industrial Construction", "Building Solutions", "Engineering Excellence"]
  //   };

  //   return (
  //     <main className="w-full font-sans text-slate-800 bg-white" itemScope itemType="https://schema.org/AboutPage">
  //       {/* SEO Schema Injection */}
  //       <script
  //         type="application/ld+json"
  //         dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
  //       />

  //       {/* 1. Hero Banner Section */}
  //       <section className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] overflow-hidden bg-slate-900">
  //         <img
  //           src={heroBannerImg}
  //           alt="Evershine Solution Industrial Coils and Structural Steel Facility"
  //           className="w-full h-full object-cover opacity-80"
  //           loading="eager"
  //         />
  //         <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent flex items-center">
  //           <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 w-full">
  //             <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-2xl drop-shadow-md">
  //               Bringing efficiency to your business
  //             </h1>
  //             <p className="text-slate-200 text-sm sm:text-base mt-3 font-medium tracking-wide max-w-xl">
  //               Trusted Industrial Construction &amp; Building Solutions Since 2012
  //             </p>
  //           </div>
  //         </div>
  //       </section>

  //       {/* 2. Top Content Section ("What We Do" style card) */}
  //       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10 mb-16 sm:mb-20">
  //         <article className="bg-[#f4f5f7] rounded-lg p-8 sm:p-12 md:p-16 shadow-sm border border-slate-200/60">
  //           <header className="mb-6">
  //             <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
  //               About Evershine Solution
  //             </h2>
  //             <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mt-2">
  //               Trusted Excellence Since 2012
  //             </h3>
  //           </header>

  //           <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-4xl">
  //             <p className="font-semibold text-slate-800 text-base sm:text-lg leading-snug">
  //               Evershine Solution was established with a vision to provide reliable industrial construction and building solutions that meet the evolving needs of modern businesses. Over the years, we have earned the trust of clients through our commitment to quality, transparency, and customer satisfaction.
  //             </p>
  //             <p>
  //               Based in Nagpur, Maharashtra, we serve clients across multiple industries by delivering innovative and durable solutions tailored to their specific requirements. Every project we undertake reflects our dedication to engineering excellence and long-term value.
  //             </p>
  //           </div>
  //         </article>
  //       </section>

  //       {/* 3. Bottom Two-Column Section ("Why We Do It" style layout) */}
  //       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
  //         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            
  //           {/* Left Column: Evershine Team Inspection Image */}
  //           <div className="lg:col-span-6">
  //             <figure className="relative rounded-lg overflow-hidden shadow-lg border border-slate-200">
  //               <img
  //                 src={evershineTeamImg}
  //                 alt="Evershine Solution Quality Inspection Engineers in Blue Hardhats"
  //                 className="w-full h-[340px] sm:h-[420px] object-cover"
  //                 loading="lazy"
  //               />
  //             </figure>
  //           </div>

  //           {/* Right Column: Mission & Vision */}
  //           <div className="lg:col-span-6 space-y-8">
  //             <header>
  //               <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
  //                 Why we do it
  //               </h2>
  //             </header>

  //             <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed">
  //               <article className="space-y-1.5">
  //                 <h3 className="text-base sm:text-lg font-bold text-slate-900 inline-block mr-2">
  //                   Our Mission
  //                 </h3>
  //                 <p className="text-slate-600 inline">
  //                   To provide innovative and dependable industrial solutions that help businesses achieve operational efficiency and sustainable growth.
  //                 </p>
  //               </article>

  //               <article className="space-y-1.5">
  //                 <h3 className="text-base sm:text-lg font-bold text-slate-900 inline-block mr-2">
  //                   Our Vision
  //                 </h3>
  //                 <p className="text-slate-600 inline">
  //                   To become a preferred industrial solutions partner by consistently delivering quality, reliability, and customer satisfaction.
  //                 </p>
  //               </article>
  //             </div>
  //           </div>

  //         </div>
  //       </section>
  //     </main>
  //   );
  // };

  // export default About;
