import React from "react";

export const Loader: React.FC<{ size?: number }> = ({ size = 32 }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <svg
        style={{ width: size, height: size }}
        viewBox="0 0 50 50"
        className="animate-spin"
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M45 25a20 20 0 00-20-20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
};
