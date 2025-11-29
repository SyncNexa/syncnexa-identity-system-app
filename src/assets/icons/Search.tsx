import * as React from "react";

function SearchIcon({ color = "#BBB" }: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18.75 18.75 14.4 14.4m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0"
      ></path>
    </svg>
  );
}
export default SearchIcon;
