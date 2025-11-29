import * as React from "react";

function HelpIcon({
  color = "#04D69D",
  width = 20,
  height = 20,
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M.75 15.75v-6a9 9 0 1 1 18 0v6m0 1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zm-18 0a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-3z"
      ></path>
    </svg>
  );
}

export default HelpIcon;
