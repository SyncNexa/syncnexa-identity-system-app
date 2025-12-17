import * as React from "react";

function DashboardIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#clip0_243_559)"
      >
        <path d="M2.667 2.667h4V8h-4zM2.667 10.667h4v2.667h-4zM9.333 8h4v5.333h-4zM9.333 2.667h4v2.667h-4z"></path>
      </g>
      <defs>
        <clipPath id="clip0_243_559">
          <path fill="#fff" d="M0 0h16v16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
}

export default DashboardIcon;
