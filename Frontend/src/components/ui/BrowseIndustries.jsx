const benefits = [
  { title: "Faster Project Completion", desc: "Efficient processes help reduce project timelines and accelerate operational readiness.", icon: "⚡" },
  { title: "Cost Efficiency", desc: "Optimized designs help minimize costs while maintaining quality and performance.", icon: "💰" },
  { title: "Durability & Strength", desc: "Solutions engineered to withstand demanding industrial environments.", icon: "🏗️" },
  { title: "Energy Efficiency", desc: "Advanced materials help improve insulation and reduce energy consumption.", icon: "🌱" },
  { title: "Low Maintenance", desc: "Designed for long-term performance and reduced maintenance costs.", icon: "🔧" },
  { title: "Future-Ready Infrastructure", desc: "Built to adapt and scale with your evolving business needs.", icon: "🚀" },
];

const industries = [
  { name: "Manufacturing", icon: "🏭", desc: "Infrastructure solutions designed to support productivity and operational efficiency." },
  { name: "Warehousing & Logistics", icon: "📦", desc: "Modern facilities built to optimize storage, handling, and distribution operations." },
  { name: "Automotive", icon: "🚗", desc: "Customized industrial infrastructure supporting manufacturing and service operations." },
  { name: "Agriculture & Food Processing", icon: "🌾", desc: "Reliable facilities for storage, processing, and operational requirements." },
  { name: "Retail & Commercial", icon: "🏢", desc: "Functional and attractive spaces that support business growth." },
  { name: "Healthcare & Public Infrastructure", icon: "🏥", desc: "Dependable solutions for hospitals, institutions, and infrastructure developments." },
];

const whyChoose = [
  { title: "Quality You Can Trust", desc: "We use premium-grade materials and follow strict quality standards to ensure exceptional durability and performance.", icon: "✅" },
  { title: "Expert Team", desc: "Our experienced professionals bring deep industry knowledge to every project we undertake.", icon: "👷" },
  { title: "Timely Delivery", desc: "We are committed to on-time delivery without compromising on quality or safety.", icon: "🚚" },
  { title: "Competitive Pricing", desc: "Get the best value for your investment with our transparent and competitive pricing.", icon: "💰" },
];

export default function BrowseIndustries() {
  return (
    <>
      {/* Benefits of Choosing Our Solutions */}
      <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Benefits of Choosing Our Solutions
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Engineered for performance, built for the long run.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-primary transition"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-16 px-4 sm:px-6 lg:px-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Industries We Serve
          </h2>
          <p className="text-center text-gray-500 mb-10">
            We provide specialized solutions for a wide range of industries.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-primary transition"
              >
                <span className="text-4xl mb-4 block">{industry.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{industry.name}</h3>
                <p className="text-sm text-gray-500 leading-6">{industry.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Evershine Solution */}
      <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Why Choose Evershine Solution?
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Trusted by businesses across industries for quality, reliability, and value.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl border border-gray-100 p-6 hover:shadow-md hover:border-primary transition"
              >
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-6">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
