// src/context/CartContext.jsx
// Centralized cart state management for Evershine Prefab Solutions
// Single source of truth is strictly the backend database
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  fetchCartApi,
  addToCartApi,
  updateCartItemApi,
  deleteCartItemApi,
  parseCartError,
  MAX_CART_ITEMS,
} from "../services/cartService";
import { getUserInfo } from "../services/authService";
import { useAuth } from "../hooks/useAuth";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated, user } = useAuth();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState(new Set());
  const [userName, setUserName] = useState("");

  // Track in-progress item updates and deletions to prevent duplicate requests
  const [updatingItemIds, setUpdatingItemIds] = useState(new Set());
  const [deletingItemIds, setDeletingItemIds] = useState(new Set());

  // Toast Notification State (Auto-dismisses in 2s with X button)
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((message = "Product added to cart successfully.") => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastMessage(message);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
      toastTimeoutRef.current = null;
    }, 2000);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToastMessage(null);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  // Total cart count is strictly based on the number of distinct product entries in database (max 5)
  const cartCount = cartItems.length;

  /**
   * Helper to update cartItems and reconcile selection IDs
   */
  const syncCartState = useCallback((newItems = []) => {
    const safeItems = Array.isArray(newItems) ? newItems : [];
    setCartItems(safeItems);
    setSelectedItemIds((prev) => {
      const validIds = new Set(safeItems.map((item) => item.id));
      const next = new Set();
      prev.forEach((id) => {
        if (validIds.has(id)) next.add(id);
      });
      return next;
    });
  }, []);

  /**
   * Fetch latest cart items from the backend database
   */
  const fetchCartItems = useCallback(async () => {
    if (!isAuthenticated) {
      syncCartState([]);
      return [];
    }

    setLoading(true);
    setError(null);
    try {
      const items = await fetchCartApi();
      syncCartState(items);
      return items;
    } catch (err) {
      const message = parseCartError(err, "Failed to load your cart.");
      setError(message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, syncCartState]);

  // Initial fetch and user info sync when authentication status changes
  useEffect(() => {
    let isMounted = true;

    if (isAuthenticated) {
      fetchCartApi()
        .then((items) => {
          if (isMounted) {
            syncCartState(items);
            setError(null);
          }
        })
        .catch((err) => {
          if (isMounted) {
            setError(parseCartError(err, "Failed to load your cart."));
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });

      getUserInfo()
        .then((info) => {
          if (isMounted) {
            if (info?.name) setUserName(info.name);
            else if (user?.username) setUserName(user.username);
          }
        })
        .catch(() => {
          if (isMounted && user?.username) setUserName(user.username);
        });
    } else {
      syncCartState([]);
      setUserName("");
    }

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.username, syncCartState]);

  /**
   * Add a product to the cart (POST /api/cart)
   * Enforces 5-product maximum limit
   * @param {Object} payload - { productSlug, quantity, selectedCartAttributes }
   */
  const addItemToCart = useCallback(
    async ({ productSlug, quantity = 1, selectedCartAttributes = [] }) => {
      if (!isAuthenticated) {
        const authErr = new Error("Authentication required");
        authErr.isAuthError = true;
        authErr.message = "Please sign in to add products to your cart.";
        throw authErr;
      }

      // Check current item limit (max 5 products)
      if (cartItems.length >= MAX_CART_ITEMS) {
        const limitErr = new Error(
          `Maximum cart limit reached (${MAX_CART_ITEMS} products). Please remove an existing product before adding a new one.`
        );
        limitErr.isLimitError = true;
        throw limitErr;
      }

      setLoading(true);
      setError(null);
      try {
        const addedItem = await addToCartApi({
          productSlug,
          quantity,
          selectedCartAttributes,
        });

        // If backend returned the created item object, add it directly to cart state
        if (addedItem && typeof addedItem === "object" && addedItem.id) {
          setCartItems((prev) => {
            const exists = prev.some((item) => item.id === addedItem.id);
            if (exists) {
              return prev.map((item) => (item.id === addedItem.id ? { ...item, ...addedItem } : item));
            }
            return [...prev, addedItem];
          });
        } else {
          await fetchCartItems();
        }

        // Show Section 8 required bottom notification (auto-dismiss in 2s)
        showToast("Product added to cart successfully.");

        return addedItem;
      } catch (err) {
        const friendlyMessage = parseCartError(err);
        setError(friendlyMessage);
        throw new Error(friendlyMessage);
      } finally {
        setLoading(false);
      }
    },
    [isAuthenticated, cartItems.length, fetchCartItems, showToast]
  );

  /**
   * Update quantity in database (PUT /api/cart/{cartItemId})
   * Uses cartAttributes format required by backend update API.
   * Updates ONLY that specific product directly from the PUT response without fetching all products.
   */
  const updateQuantity = useCallback(
    async (cartItemId, newQuantity) => {
      if (!cartItemId || updatingItemIds.has(cartItemId)) return;

      const targetItem = cartItems.find((item) => item.id === cartItemId);
      if (!targetItem) return;

      const validQty = Math.max(1, Number(newQuantity) || 1);
      if (validQty === targetItem.quantity) return;

      // Mark this item as updating
      setUpdatingItemIds((prev) => new Set(prev).add(cartItemId));
      setError(null);

      // Build cartAttributes array from existing selected attributes
      const cartAttributes = (targetItem.selectedAttributes || []).map((attr) => ({
        label: String(attr.label || "").trim(),
        unit: String(attr.unit || "").trim(),
        value: String(attr.value || "").trim(),
      }));

      try {
        const updatedItem = await updateCartItemApi({
          cartItemId,
          productSlug: targetItem.productSlug,
          quantity: validQty,
          cartAttributes,
        });

        // Update ONLY that item in cartItems state using the backend PUT response
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.id === cartItemId) {
              if (updatedItem && typeof updatedItem === "object" && updatedItem.id) {
                return { ...item, ...updatedItem };
              }
              return { ...item, quantity: validQty, selectedAttributes: cartAttributes };
            }
            return item;
          })
        );
      } catch (err) {
        const msg = parseCartError(err, "Failed to update quantity. Please try again.");
        setError(msg);
        throw err;
      } finally {
        setUpdatingItemIds((prev) => {
          const next = new Set(prev);
          next.delete(cartItemId);
          return next;
        });
      }
    },
    [cartItems, updatingItemIds]
  );

  /**
   * Update attribute selection in database (PUT /api/cart/{cartItemId})
   * Sends all currently selected attributes in the cartAttributes array.
   * Updates ONLY that specific product directly from the PUT response without fetching all products.
   */
  const updateAttribute = useCallback(
    async (cartItemId, attributeLabel, newValue) => {
      if (!cartItemId || !attributeLabel || updatingItemIds.has(cartItemId)) return;

      const targetItem = cartItems.find((item) => item.id === cartItemId);
      if (!targetItem) return;

      // Mark this item as updating
      setUpdatingItemIds((prev) => new Set(prev).add(cartItemId));
      setError(null);

      const currentAttributes = Array.isArray(targetItem.selectedAttributes)
        ? [...targetItem.selectedAttributes]
        : [];

      const existingIndex = currentAttributes.findIndex(
        (attr) => attr.label === attributeLabel
      );

      let updatedList;
      if (existingIndex >= 0) {
        updatedList = currentAttributes.map((attr, idx) =>
          idx === existingIndex ? { ...attr, value: String(newValue) } : attr
        );
      } else {
        const matchingExisting = (targetItem.existingAttributes || []).find(
          (attr) => attr.label === attributeLabel
        );
        updatedList = [
          ...currentAttributes,
          {
            label: attributeLabel,
            unit: matchingExisting?.unit || "",
            value: String(newValue),
          },
        ];
      }

      const cartAttributes = updatedList.map((attr) => ({
        label: String(attr.label || "").trim(),
        unit: String(attr.unit || "").trim(),
        value: String(attr.value || "").trim(),
      }));

      try {
        const updatedItem = await updateCartItemApi({
          cartItemId,
          productSlug: targetItem.productSlug,
          quantity: targetItem.quantity || 1,
          cartAttributes,
        });

        // Update ONLY that item in cartItems state using the backend PUT response
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.id === cartItemId) {
              if (updatedItem && typeof updatedItem === "object" && updatedItem.id) {
                return { ...item, ...updatedItem };
              }
              return { ...item, selectedAttributes: cartAttributes };
            }
            return item;
          })
        );
      } catch (err) {
        const msg = parseCartError(err, "Failed to update attribute. Please try again.");
        setError(msg);
        throw err;
      } finally {
        setUpdatingItemIds((prev) => {
          const next = new Set(prev);
          next.delete(cartItemId);
          return next;
        });
      }
    },
    [cartItems, updatingItemIds]
  );

  /**
   * Delete a cart item from the database (DELETE /api/cart/{cartItemId})
   * Deletes ONLY that item from local cart state without fetching all products.
   */
  const deleteItem = useCallback(
    async (cartItemId) => {
      if (!cartItemId || deletingItemIds.has(cartItemId)) return;

      setDeletingItemIds((prev) => new Set(prev).add(cartItemId));
      setError(null);

      try {
        await deleteCartItemApi(cartItemId);

        // Remove ONLY that item from cartItems and selection state
        setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
        setSelectedItemIds((prev) => {
          const next = new Set(prev);
          next.delete(cartItemId);
          return next;
        });
      } catch (err) {
        const msg = parseCartError(err, "Failed to remove product from cart.");
        setError(msg);
        throw err;
      } finally {
        setDeletingItemIds((prev) => {
          const next = new Set(prev);
          next.delete(cartItemId);
          return next;
        });
      }
    },
    [deletingItemIds]
  );

  /**
   * Toggle enquiry selection for an individual product
   */
  const toggleSelectItem = useCallback((itemId) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  }, []);

  /**
   * Select all products in the cart for enquiry
   */
  const selectAll = useCallback(() => {
    setSelectedItemIds(new Set(cartItems.map((item) => item.id)));
  }, [cartItems]);

  /**
   * Deselect all products
   */
  const deselectAll = useCallback(() => {
    setSelectedItemIds(new Set());
  }, []);

  /**
   * Open the cart flyout/drawer and refresh cart items
   */
  const openCart = useCallback(() => {
    setIsCartOpen(true);
    fetchCartItems();
  }, [fetchCartItems]);

  /**
   * Close the cart flyout/drawer
   */
  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  /**
   * Prepares and opens WhatsApp enquiry for selected products
   * Recipient: 919860118911
   * Format matching Section 11 specifications
   */
  const sendWhatsAppEnquiry = useCallback(() => {
    const selectedItems = cartItems.filter((item) => selectedItemIds.has(item.id));

    if (selectedItems.length === 0) {
      return false;
    }

    const displayName = userName.trim() || user?.username || "Customer";
    const header = `Hello, I am ${displayName}.\n\nI have an enquiry regarding these products:\n`;

    const productBlocks = selectedItems.map((item, index) => {
      const productUrl = `https://www.evershineprefab.com/products/${item.productSlug}`;
      const qtyLine = `   Quantity: ${item.quantity || 1}`;

      const attrLines = Array.isArray(item.selectedAttributes)
        ? item.selectedAttributes
            .filter((attr) => attr.label && attr.value)
            .map((attr) => `   ${attr.label}: ${attr.value}${attr.unit ? ` ${attr.unit}` : ""}`)
        : [];

      const lines = [
        `   ${productUrl}`,
        qtyLine,
        ...attrLines,
      ];

      return `${index + 1}. ${item.productName || item.productSlug}\n${lines.join("\n")}`;
    });

    const fullMessage = `${header}\n${productBlocks.join("\n\n")}\n\nPlease share further details.`;
    const whatsappUrl = `https://wa.me/919860118911?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    return true;
  }, [cartItems, selectedItemIds, userName, user?.username]);

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      loading,
      updatingItemIds,
      deletingItemIds,
      error,
      isCartOpen,
      setIsCartOpen,
      openCart,
      closeCart,
      selectedItemIds,
      fetchCartItems,
      addItemToCart,
      updateQuantity,
      updateAttribute,
      deleteItem,
      toggleSelectItem,
      selectAll,
      deselectAll,
      sendWhatsAppEnquiry,
      toastMessage,
      showToast,
      dismissToast,
      maxLimit: MAX_CART_ITEMS,
    }),
    [
      cartItems,
      cartCount,
      loading,
      updatingItemIds,
      deletingItemIds,
      error,
      isCartOpen,
      openCart,
      closeCart,
      selectedItemIds,
      fetchCartItems,
      addItemToCart,
      updateQuantity,
      updateAttribute,
      deleteItem,
      toggleSelectItem,
      selectAll,
      deselectAll,
      sendWhatsAppEnquiry,
      toastMessage,
      showToast,
      dismissToast,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
