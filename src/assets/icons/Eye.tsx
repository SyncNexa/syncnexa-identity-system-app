import * as React from "react";

function EyeIcon({
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
      width={`${width}`}
      height={`${height}`}
      fill="none"
      viewBox="0 0 24 24"
      ref={iconRef}
      onClick={onClick}
    >
      <path
        stroke={`${color}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M17.69 17.69a10.07 10.07 0 0 1-5.94 2.06c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94m3.84-1.82a9 9 0 0 1 2.1-.24c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a2.998 2.998 0 0 1-5.194-2.098A3 3 0 0 1 9.63 9.63M.75.75l22 22"
      ></path>
    </svg>
  );
}

export default EyeIcon;
