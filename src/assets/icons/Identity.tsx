import * as React from "react";
import DashboardIcon from "./Dashboard";

function IdentityIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
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
        strokeLinejoin="round"
        d="M9.333 2.333H6.666c-2.514 0-3.771 0-4.552.781-.78.782-.781 2.038-.781 4.552v.667c0 2.514 0 3.771.781 4.552.782.78 2.038.781 4.552.781h2.667c2.514 0 3.771 0 4.552-.781s.781-2.038.781-4.552v-.667c0-2.514 0-3.771-.781-4.552s-2.038-.781-4.552-.781Z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        d="M3.333 10.666c.69-1.72 3.264-1.833 4 0"
      ></path>
      <path
        stroke={color}
        d="M6.5 6.5a1.167 1.167 0 1 1-2.334 0 1.167 1.167 0 0 1 2.333 0Z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.333 5.666h3.333M9.333 7.999h3.333m-3.333 2.334H11"
      ></path>
    </svg>
  );
}

export default IdentityIcon;
