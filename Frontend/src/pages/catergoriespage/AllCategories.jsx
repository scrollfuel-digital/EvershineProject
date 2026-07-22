import { Link } from "react-router-dom";
import { categoryListData } from "../../data/categoryListData";

export default function AllCategories() {
  return (
    <main className="min-h-screen pt-[160px] pb-16 px-4 sm:px-6 lg:px-16 bg-[#FAFAF7]">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-['Sora',sans-serif] text-3xl md:text-4xl font-semibold text-[#14152B] mb-2">
          All Categories
        </h1>
        <p className="text-gray-500 mb-10">Browse our complete range of roofing and structural products.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categoryListData.map((item) => (
            <Link to={item.href} key={item.href} className="group">
              <div className="relative bg-white border border-[#E7E5DE] rounded-2xl p-4 overflow-hidden
                             transition-all duration-300 ease-out
                             group-hover:-translate-y-1.5 group-hover:scale-[1.03]
                             group-hover:border-[#0F766E]
                             group-hover:shadow-[0_16px_28px_-14px_rgba(20,21,43,0.28)]">
                <span className="pointer-events-none absolute inset-0 -translate-x-[120%] rotate-12
                                 bg-gradient-to-r from-transparent via-white/60 to-transparent
                                 group-hover:translate-x-[120%] transition-transform duration-700 ease-out" />
                <img
                  src={item.images[0]}
                  alt={item.label}
                  className="w-full h-28 object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="text-center mt-3 font-['Inter',sans-serif] text-sm font-medium text-[#14152B] group-hover:text-[#0F766E] transition-colors leading-5">
                {item.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
