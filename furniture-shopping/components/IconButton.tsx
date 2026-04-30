import { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  children: ReactNode;
  ariaLabel?: string;
}

export default function IconButton({
  variant = "primary",
  size = "md",
  children,
  ariaLabel,
  className = "",
  disabled,
  ...props
}: IconButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-[var(--primary)] hover:bg-[var(--secondary)] text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-[var(--accent)]",
    secondary: "bg-[var(--accent)] hover:bg-[var(--secondary)] text-[var(--dark)] shadow-md hover:shadow-lg transform hover:-translate-y-1 focus:ring-[var(--primary)]",
    outline: "bg-transparent border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white focus:ring-[var(--primary)]",
    ghost: "bg-transparent text-[var(--primary)] hover:bg-[var(--light)] focus:ring-[var(--primary)]",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 focus:ring-red-500"
  };
  
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-14 h-14 text-xl"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed transform-none" : "";
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, " ");

  return (
    <button
      className={classes}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
}
