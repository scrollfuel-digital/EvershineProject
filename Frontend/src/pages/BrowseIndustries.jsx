import {
  FaTractor,
  FaTruck,
  FaBuilding,
  FaWarehouse,
  FaHome,
  FaIndustry,
  FaCogs,
  FaBridge,
  FaSolarPanel,
  FaRoad,
  FaFaucet,
  FaBoxOpen,
} from "react-icons/fa";

import { MdStorage } from "react-icons/md";
import { GiPipe } from "react-icons/gi";
import { Link } from "react-router-dom";

const industries = [
  {
    title: "Agriculture",
    icon: <FaTractor />,
    link: "/agriculture",
  },
  {
    title: "Automotive",
    icon: <FaTruck />,
    link: "/automotive",
  },
  {
    title: "Commercial Buildings",
    icon: <FaBuilding />,
    link: "/commercial-buildings",
  },
  {
    title: "Buildings - Components & Extensions",
    icon: <MdStorage />,
    link: "/building-components",
  },
  {
    title: "Buildings - HVAC",
    icon: <FaWarehouse />,
    link: "/hvac",
  },
  {
    title: "Industrial Buildings",
    icon: <FaIndustry />,
    link: "/industrial-buildings",
  },
  {
    title: "Residential Buildings",
    icon: <FaHome />,
    link: "/residential-buildings",
  },
  {
    title: "Consumer Goods & Appliances",
    icon: <MdStorage />,
    link: "/consumer-goods",
  },
  {
    title: "Industrial & Machinery",
    icon: <FaCogs />,
    link: "/industrial-machinery",
  },
  {
    title: "Public Infrastructure",
    icon: <FaBridge />,
    link: "/public-infrastructure",
  },
  {
    title: "Energy Infrastructure",
    icon: <FaSolarPanel />,
    link: "/energy-infrastructure",
  },
  {
    title: "Transportation Infrastructure",
    icon: <FaRoad />,
    link: "/transportation",
  },
  {
    title: "Water Infrastructure",
    icon: <FaFaucet />,
    link: "/water-infrastructure",
  },
  {
    title: "Pipes & Tubes",
    icon: <GiPipe />,
    link: "/pipes-tubes",
  },
  {
    title: "Packaging",
    icon: <FaBoxOpen />,
    link: "/packaging",
  },
];

export default function BrowseIndustries() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5">

        <h2 className="text-4xl font-bold text-[#0A2C5E] mb-10">
          Browse by Industries
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">

          {industries.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-52 flex flex-col justify-center items-center text-center p-6"
            >
              <div className="text-6xl text-blue-600 mb-6 group-hover:scale-110 transition">
                {item.icon}
              </div>

              <h3 className="font-semibold text-gray-800 text-lg leading-7">
                {item.title}
              </h3>
            </Link>
          ))}

        </div>
      </div>
    </section>
  );
}