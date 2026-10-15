// src/pages/Admin/products/updatedelete/ProductUpdateDeleteView.jsx
// Dedicated clean view for updating and deleting existing products in the catalogue.
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, Trash2, AlertCircle, Info, FileEdit, Package } from "lucide-react";
import { getProductById } from "../../../../services/productService";
import ProductCatalogueGrid from "../ProductCatalogueGrid";
import ProductForm from "../addproduct";

export default function ProductUpdateDeleteView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const editQueryId = searchParams.get("edit");

  const [editingProduct, setEditingProduct] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, product: null, message: null });

  const activeFetchIdRef = useRef(null);

  useEffect(() => {
    if (!editQueryId) {
      activeFetchIdRef.current = null;
      setEditingProduct(null);
      setLoadingProductId(null);
      return;
    }
    if (editingProduct?.id === editQueryId) return;

    activeFetchIdRef.current = editQueryId;
    setLoadingProductId(editQueryId);
    setFetchError(null);

    let isCurrent = true;
    getProductById(editQueryId)
      .then((data) => {
        if (isCurrent && activeFetchIdRef.current === editQueryId) {
          setEditingProduct(data);
        }
      })
      .catch((err) => {
        if (isCurrent && activeFetchIdRef.current === editQueryId) {
          setFetchError(err.response?.data?.message || err.message || "Failed to load product details.");
        }
      })
      .finally(() => {
        if (isCurrent && activeFetchIdRef.current === editQueryId) {
          setLoadingProductId(null);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [editQueryId, editingProduct?.id]);

  const handleExitEditor = () => {
    activeFetchIdRef.current = null;
    setEditingProduct(null);
    setLoadingProductId(null);
    setSearchParams({}, { replace: true });
  };

  return (
    <div className="space-y-4">
      {/* Global Error Banner */}
      {fetchError && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{fetchError}</span>
          </div>
          <button type="button" onClick={() => setFetchError(null)} className="font-bold cursor-pointer">✕</button>
        </div>
      )}

      {/* VIEW MODE 1: Editing Active Product with ProductForm */}
      {editingProduct ? (
        <div className="space-y-4">
          {/* Unboxed clean back navigation */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExitEditor}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Products</span>
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <FileEdit className="w-4 h-4 text-[#004060] shrink-0" />
              <span className="text-xs font-medium text-slate-500">Editing:</span>
              <h2 className="text-sm font-bold text-slate-900 truncate">
                {editingProduct.title || "Product"}
              </h2>
            </div>
          </div>

          {/* ProductForm directly rendered without outer card wrapping */}
          <ProductForm
            initialData={editingProduct}
            isEditMode={true}
            onCancel={handleExitEditor}
            onSuccess={() => {
              setRefreshKey((k) => k + 1);
              setTimeout(handleExitEditor, 800);
            }}
          />
        </div>
      ) : (
        /* VIEW MODE 2: Product Catalogue with Update & Delete Buttons */
        <ProductCatalogueGrid
          key={refreshKey}
          title="Update & Delete Products"
          showAdminActions={true}
          loadingId={loadingProductId}
          onUpdateProduct={(id) => {
            activeFetchIdRef.current = id;
            setSearchParams({ edit: id }, { replace: true });
          }}
          onDeleteProduct={(id, summary) => {
            setDeleteModal({ open: true, product: summary, message: null });
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-rose-600">
                <Trash2 className="w-4 h-4" />
                <h3 className="text-sm font-bold text-slate-900 font-display">Delete Product</h3>
              </div>
              <button
                type="button"
                onClick={() => setDeleteModal({ open: false, product: null, message: null })}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              {deleteModal.product?.imageUrl ? (
                <img
                  src={deleteModal.product?.imageUrl}
                  alt=""
                  className="w-10 h-10 object-contain rounded-lg bg-white border border-slate-200 p-0.5"
                />
              ) : (
                <div className="w-10 h-10 rounded-lg bg-slate-200 flex items-center justify-center text-slate-400">
                  <Package className="w-5 h-5" />
                </div>
              )}
              <h4 className="text-xs font-bold text-slate-900 truncate flex-1">
                {deleteModal.product?.title || "Product"}
              </h4>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800">
                Soft delete will archive this product and remove it from active catalogue listings once confirmed.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeleteModal({ open: false, product: null, message: null })}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() =>
                  setDeleteModal((p) => ({
                    ...p,
                    message: "Product soft delete will be activated with backend API.",
                  }))
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm Delete</span>
              </button>
            </div>

            {deleteModal.message && (
              <p className="text-[11px] text-center text-slate-500 italic">{deleteModal.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
