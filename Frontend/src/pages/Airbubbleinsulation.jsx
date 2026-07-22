import { useState } from "react";
import bubbleInsulationImg from "../assets/Untitleddesign/18.png";
import bubbleSheetImg from "../assets/BUBBLE.jpeg";

export default function Airbubbleinsulation() {
  const [selectedImage, setSelectedImage] = useState(bubbleInsulationImg);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your enquiry has been submitted.");

    setShowModal(false);
  };

  return (
    <>
      <main className="min-h-screen pt-[160px] pb-16 px-4 sm:px-6 lg:px-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">

          {/* Left Side */}
          <div>
            {/* Main Image */}
            <div className="border rounded-xl shadow-lg overflow-hidden">
              <img
                src={selectedImage}
                alt="Air Bubble Insulation"
                className="w-full h-[500px] object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 mt-5">
              <img
                src={bubbleInsulationImg}
                alt="Air Bubble Insulation Roll"
                onClick={() => setSelectedImage(bubbleInsulationImg)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === bubbleInsulationImg ? "border-blue-600" : "border-gray-300"}`}
              />
              <img
                src={bubbleSheetImg}
                alt="Air Bubble Insulation Sheet"
                onClick={() => setSelectedImage(bubbleSheetImg)}
                className={`w-24 h-24 object-cover rounded-lg cursor-pointer border-2 transition ${selectedImage === bubbleSheetImg ? "border-blue-600" : "border-gray-300"}`}
              />
            </div>

            {/* Common Sizes */}
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
                    <tr className="border-t border-gray-200"><td className="px-4 py-3 font-medium text-primary">25x25x1.5mm</td><td className="px-4 py-3 text-gray-600">Often used in small-scale construction and DIY projects.</td></tr>
                    <tr className="border-t border-gray-200"><td className="px-4 py-3 font-medium text-primary">40x40x3mm</td><td className="px-4 py-3 text-gray-600">Popular in medium-sized structural applications.</td></tr>
                    <tr className="border-t border-gray-200"><td className="px-4 py-3 font-medium text-primary">50x50x5mm</td><td className="px-4 py-3 text-gray-600">Frequently used in heavy-duty construction work.</td></tr>
                    <tr className="border-t border-gray-200"><td className="px-4 py-3 font-medium text-primary">120x80x1.8mm</td><td className="px-4 py-3 text-gray-600">Ideal for large industrial PEB structures.</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h1 className="text-4xl font-bold">
              Air Bubble Insulation
            </h1>

            <p className="text-3xl font-bold text-primary mt-5">
              ₹60 / Sq.m
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              PE Double Bubble Insulation with both-side high-resistance
              aluminium foil. Designed to reduce heat transfer and improve
              energy efficiency in warehouses, factories, commercial buildings,
              industrial sheds, and residential roofing applications.
            </p>

            {/* Features */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4 text-xl">Features</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✔ Heat Resistant</li>
                <li>✔ Reflective Aluminium Foil</li>
                <li>✔ Waterproof</li>
                <li>✔ Lightweight</li>
                <li>✔ Energy Saving</li>
                <li>✔ Easy Installation</li>
              </ul>
            </div>

            {/* Customized Sizes */}
            <div className="mt-10">
              <h3 className="font-semibold mb-4 text-xl">Customized Sizes</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✔ Unequal leg angles (e.g., 50x25x3mm)</li>
                <li>✔ Extra-large angles for specialized industrial applications</li>
                <li>✔ Micro-angles for precision engineering projects</li>
              </ul>
            </div>

            {/* Applications */}
            <div className="mt-10">
              <h3 className="font-semibold mb-4 text-xl">Applications</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✔ Industrial sheds and warehouses</li>
                <li>✔ Residential and commercial buildings</li>
                <li>✔ Roofing support structures</li>
                <li>✔ Solar panel mounting systems</li>
                <li>✔ Fencing and gate fabrication</li>
              </ul>
            </div>

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

            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-red-500"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-center mb-2">
              Product Enquiry
            </h2>

            <p className="text-center text-gray-500 mb-6">
              Fill in your details and we'll contact you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  WhatsApp Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter WhatsApp Number"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Phone Number
                </label>

                <input
                  type="tel"
                  placeholder="Enter Phone Number"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Product Requirement
                </label>

                <textarea
                  rows="4"
                  placeholder="Enter your product requirement (e.g. Air Bubble Insulation, Quantity, Size, Location, etc.)"
                  required
                  className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold"
              >
                Submit Enquiry
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}