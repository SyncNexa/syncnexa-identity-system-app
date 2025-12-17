import * as React from "react";
import DashboardIcon from "./Dashboard";

function SecurityIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.333"
        d="M8 1.333 2 3.666V8c0 2.333 2.333 6 5.333 6.666 3-.666 5.334-4.333 5.334-6.666V3.666L7.333 1.333z"
      ></path>
    </svg>
  );
}

export default SecurityIcon;
