import React from "react";
function EyeClosed({
  color = "#B2B2B2",
  width = 20,
  height = 20,
  onClick,
}: {
  color?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}) {
  const iconRef = React.useRef<SVGSVGElement>(null);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 18"
      ref={iconRef}
      onClick={onClick}
    >
      <path
        stroke={`${color}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M.75 8.75s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8"
      ></path>
      <path
        stroke={`${color}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.75 11.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      ></path>
    </svg>
  );
}

export default EyeClosed;
