import React from "react";

const Button = ({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
}) => {
  if (href) {
    return (
      <a
        href={href}
        className={` z-30 text-center bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-black lg:px-4 px-3 py-2 max-sm:text-sm  transition hover:scale-105 hover:shadow-2xs shadow-cyan-400 ${className}`}>
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={`bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full text-black lg:px-4 px-3 py-2 max-sm:text-sm  transition hover:scale-105 hover:shadow-2xs shadow-cyan-400 ${className}`}>
        {children}
      </button>
    );
  }
};

export default Button;
