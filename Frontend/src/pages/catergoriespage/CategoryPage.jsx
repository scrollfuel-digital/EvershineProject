import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { categoryListData } from "../../data/categoryListData";
import { categoryDetails } from "../../data/categoryDetails";

export default function CategoryPage() {
  const { slug } = useParams();

  const category = categoryListData.find((c) => c.href === `/${slug}`);
  const details = categoryDetails[`/${slug}`] || null;

  const [selectedImage, setSelectedImage] = useState(
    category ? category.images[0] : null
  );

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Your enquiry has been submitted.");
    setShowModal(false);
  };

  if (!category) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Category Not Found</h1>
        <p className="text-gray-500 mb-8">The category you're looking for doesn't exist.</p>
        <Link to="/categories" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition">
          Browse Categories
        </Link>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen pt-[160px] pb-16 px-4 sm:px-6 lg:px-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Left — Images */}
          <div>
            <div className="border rounded-xl shadow-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={category.label}
                className="w-full h-[500px] object-cover transition-all duration-300"
              />
            </div>

            {category.images.length > 1 && (
              <div className="flex gap-4 mt-5">
                {category.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${category.label} ${i + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${
                      selectedImage === img ? "border-blue-600" : "border-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}

            {details?.sizes && (
              <div className="mt-10">
                <h3 className="font-semibold mb-4 text-xl">Common Sizes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Size</th>
                        <th className="px-4 py-3 font-semibold">Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.sizes.map((s, i) => (
                        <tr key={i} className="border-t border-gray-200">
                          <td className="px-4 py-3 font-medium text-primary">{s.size}</td>
                          <td className="px-4 py-3 text-gray-600">{s.use}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {details?.customSizes && (
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 text-lg">Customized Sizes</h4>
                    <ul className="space-y-2 text-gray-700">
                      {details.customSizes.map((cs, i) => (
                        <li key={i}>✔ {cs}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="mt-10">
              <h3 className="font-semibold mb-4 text-xl">Applications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                {(details?.applications || [
                  "Industrial Warehouses",
                  "Factory Buildings",
                  "PEB Structures",
                  "Commercial Buildings",
                  "Residential Projects",
                  "Agricultural Sheds",
                ]).map((a, i) => (
                  <li key={i}>✔ {a}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — Details */}
          <div>
            <h1 className="text-4xl font-bold">{category.label}</h1>

            {details?.price && (
              <p className="text-3xl font-bold text-primary mt-5">{details.price}</p>
            )}

            <p className="mt-6 text-gray-600 leading-8">
              {details?.specification || details?.description || `High quality ${category.label} available at Evershine Solution. Suitable for industrial, commercial, and residential applications. Contact us for pricing and availability.`}
            </p>

            <div className="mt-8">
              <h3 className="font-semibold mb-4 text-xl">Features</h3>
              <ul className="space-y-3 text-gray-700">
                {(details?.features || [
                  "Premium Quality Material",
                  "Durable & Long Lasting",
                  "Weather Resistant",
                  "Easy Installation",
                  "Competitive Pricing",
                  "Available in Custom Sizes",
                ]).map((f, i) => (
                  <li key={i}>✔ {f}</li>
                ))}
              </ul>
            </div>

            {details?.keyFeatures && (
              <div className="mt-10">
                <h3 className="font-semibold mb-4 text-xl">Key Features</h3>
                <ul className="space-y-3 text-gray-700">
                  {details.keyFeatures.map((kf, i) => (
                    <li key={i}><span className="font-semibold text-gray-800">{kf.title}:</span> {kf.desc}</li>
                  ))}
                </ul>
              </div>
            )}

            {details?.specTable && (
              <div className="mt-10">
                <h3 className="font-semibold mb-4 text-xl">Specifications</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Property</th>
                        <th className="px-4 py-3 font-semibold">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {details.specTable.map((row, i) => (
                        <tr key={i} className="border-t border-gray-200">
                          <td className="px-4 py-3 font-medium text-gray-800">{row.property}</td>
                          <td className="px-4 py-3 text-primary font-semibold">{row.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="mt-10 bg-primary text-white px-8 py-3 rounded-lg hover:bg-secondary transition"
            >
              Enquiry Now
            </button>
          </div>
        </div>
      </main>

      {/* Enquiry Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl p-8 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-center mb-2">Product Enquiry</h2>
            <p className="text-center text-gray-500 mb-6">Fill in your details and we'll contact you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Full Name</label>
                <input type="text" placeholder="Enter your name" required className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 font-medium">WhatsApp Number</label>
                <input type="tel" placeholder="Enter WhatsApp Number" required className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Phone Number</label>
                <input type="tel" placeholder="Enter Phone Number" required className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block mb-2 font-medium">Product Requirement</label>
                <textarea
                  rows="4"
                  placeholder={`Enter your requirement for ${category.label}...`}
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold">
                Submit Enquiry
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
