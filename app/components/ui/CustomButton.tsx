import { useState, ReactNode } from "react";
import Link from "next/link";

type AnimationDirection = "left-to-right" | "right-to-left" | "none";

interface CustomButtonProps {
  as?: "button" | "a" | "Link";
  href?: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  type?: "button" | "submit" | "reset";
  animation?: AnimationDirection;
  textColorOnTouch?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  as = "button",
  href,
  children,
  className = "",
  disabled = false,
  target,
  rel,
  type = "button",
  animation = "left-to-right",
  textColorOnTouch = true,
}) => {
  const [touched, setTouched] = useState(false);

  // base classes
  const baseClasses = `
    relative overflow-hidden px-7 py-3 
    font-semibold text-lg 
    flex items-center justify-center min-h-[3.5rem]
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-theme-accent/50 focus:ring-offset-2
    disabled:opacity-50
  `;

  // animation classes
  const animationClasses = {
    "left-to-right": `
      before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 
      before:h-full before:w-0 before:bg-theme/80 before:transition-all 
      before:duration-500 ${touched ? "before:w-full" : ""} hover:before:w-full active:before:w-full
    `,
    "right-to-left": `
      before:absolute before:bottom-0 before:right-0 before:top-0 before:z-0 
      before:h-full before:w-0 before:bg-theme before:transition-all 
      before:duration-500 ${touched ? "before:w-full" : ""} hover:before:w-full active:before:w-full
    `,
    none: "",
  };

  // event handlers for mobile
  const touchProps = {
    onTouchStart: () => setTouched(true),
    onTouchEnd: () => setTimeout(() => setTouched(false), 300),
  };

  //  all classes
  const combinedClasses = `${baseClasses} ${animationClasses[animation]} ${touched && textColorOnTouch ? "text-theme-third-text" : ""}  ${className}`;

  if (as === "a" && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        {...touchProps}>
        {children}
      </a>
    );
  }

  if (as === "Link" && href) {
    return (
      <Link href={href} className={combinedClasses} {...touchProps}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={combinedClasses}
      {...touchProps}>
      {children}
    </button>
  );
};

export default CustomButton;
