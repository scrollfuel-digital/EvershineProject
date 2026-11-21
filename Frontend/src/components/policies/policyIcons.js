import {
  Scale,
  ShieldCheck,
  Truck,
  Ban,
  RotateCcw,
  AlertTriangle,
  ClipboardList,
  KeyRound,
  MessageSquareQuote,
  Headphones,
} from "lucide-react";

/**
 * Mapping of policy slugs to their representative Lucide icons
 */
export const policyIconsMap = {
  "terms-and-conditions": Scale,
  "privacy-policy": ShieldCheck,
  "shipping-and-delivery-policy": Truck,
  "cancellation-policy": Ban,
  "return-refund-replacement-cancellation-policy": RotateCcw,
  "product-disclaimer": AlertTriangle,
  "enquiry-and-order-policy": ClipboardList,
  "account-and-password-policy": KeyRound,
  "whatsapp-and-customer-communication-policy": MessageSquareQuote,
  "customer-support-and-grievance-contact": Headphones,
};
