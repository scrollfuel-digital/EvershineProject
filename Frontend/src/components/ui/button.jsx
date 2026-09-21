import React from "react";
import { cn } from "../../lib/utils";

export const Button = React.forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer";

    const variants = {
      default:
        "bg-[#E3A72F] text-[#081827] hover:bg-[#F2BF51] shadow-lg shadow-[#E3A72F]/20 hover:shadow-xl hover:scale-[1.02]",
      outline:
        "border border-white/20 bg-white/5 hover:bg-white/10 text-white",
      ghost: "hover:bg-white/10 text-white",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant] || variants.default, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
