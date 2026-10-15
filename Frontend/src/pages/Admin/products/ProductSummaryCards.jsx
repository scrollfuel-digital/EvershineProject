// src/pages/Admin/products/ProductSummaryCards.jsx
// Overview summary cards: 1 horizontal Product card + 2x2 responsive grid for catalogue attribute cards.
import React from "react";
import { Package, Building2, Layers, Award, Hash } from "lucide-react";

export default function ProductSummaryCards({ data }) {
  // 1. Products
  const totalProducts = data?.totalProducts ?? 0;
  const availableProducts = data?.activeProducts ?? 0;
  const unavailableProducts = data?.unavailableProducts ?? 0;

  // 2. Brands
  const brands = Array.isArray(data?.brands) ? data.brands : [];
  const totalBrands = brands.length;
  const brandProductsCount = brands.reduce(
    (sum, b) => sum + (Number(b.productCount) || 0),
    0
  );

  // 3. Sub-Brands
  const subBrands = Array.isArray(data?.subBrands) ? data.subBrands : [];
  const totalSubBrands = subBrands.length;
  const subBrandProductsCount = subBrands.reduce(
    (sum, sb) => sum + (Number(sb.productCount) || 0),
    0
  );

  // 4. Grades
  const grades = Array.isArray(data?.grades) ? data.grades : [];
  const totalGrades = grades.length;
  const gradeProductsCount = grades.reduce(
    (sum, g) => sum + (Number(g.productCount) || 0),
    0
  );

  // 5. Sub-Grades
  const subGrades = Array.isArray(data?.subGrades) ? data.subGrades : [];
  const totalSubGrades = subGrades.length;
  const subGradeProductsCount = subGrades.reduce(
    (sum, sg) => sum + (Number(sg.productCount) || 0),
    0
  );

  const attributeCards = [
    {
      id: "brands",
      title: "Brands",
      icon: Building2,
      totalCount: totalBrands,
      totalLabel: "Total Brands",
      productCount: brandProductsCount,
      productLabel: "Brand-associated Products",
    },
    {
      id: "sub-brands",
      title: "Sub-Brands",
      icon: Layers,
      totalCount: totalSubBrands,
      totalLabel: "Total Sub-Brands",
      productCount: subBrandProductsCount,
      productLabel: "Sub-Brand-associated Products",
    },
    {
      id: "grades",
      title: "Grades",
      icon: Award,
      totalCount: totalGrades,
      totalLabel: "Total Grades",
      productCount: gradeProductsCount,
      productLabel: "Grade-associated Products",
    },
    {
      id: "sub-grades",
      title: "Sub-Grades",
      icon: Hash,
      totalCount: totalSubGrades,
      totalLabel: "Total Sub-Grades",
      productCount: subGradeProductsCount,
      productLabel: "Sub-Grade-associated Products",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. PRODUCT INVENTORY: Horizontal Single Box */}
      <section>
        <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Product Inventory
        </div>
        <div className="bg-[#f2f5f9] rounded-xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-1">
            <span className="text-sm font-semibold text-slate-700">Total products</span>
            <Package className="w-5 h-5 text-[#004060]" />
          </div>
          <div className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight mt-1">
            {totalProducts}
          </div>

          {/* Sub-metrics: Available & Unavailable side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
            <div className="bg-emerald-50/90 border border-emerald-200/90 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
              <span className="text-sm font-semibold text-emerald-800">Available</span>
              <span className="text-2xl sm:text-3xl font-bold text-emerald-700 mt-1">
                {availableProducts}
              </span>
            </div>
            <div className="bg-rose-50/90 border border-rose-200/90 rounded-xl p-3.5 sm:p-4 flex flex-col justify-between">
              <span className="text-sm font-semibold text-rose-800">Unavailable</span>
              <span className="text-2xl sm:text-3xl font-bold text-rose-700 mt-1">
                {unavailableProducts}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATALOGUE ATTRIBUTES: 4 boxes in a 2x2 responsive grid */}
      <section>
        <div className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Catalogue Attributes
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {attributeCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="bg-[#f2f5f9] rounded-xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between transition-colors hover:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <span className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-800 tracking-wide">
                      <IconComponent className="w-4 h-4 text-[#004060]" />
                      <span>{card.title}</span>
                    </span>
                  </div>

                  <div className="pt-3">
                    <div className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
                      {card.totalCount}
                    </div>
                    <div className="text-sm text-slate-600 mt-0.5">
                      {card.totalLabel}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-200/80 flex items-center justify-between text-sm sm:text-base">
                  <span className="text-slate-600">{card.productLabel}:</span>
                  <strong className="font-semibold text-slate-900">
                    {card.productCount}
                  </strong>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
