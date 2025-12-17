import * as React from "react";
import DashboardIcon from "./Dashboard";

function DocumentIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
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
        d="M13 6.914V13a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 13V3a1.5 1.5 0 0 1 1.5-1.5h3.086a1 1 0 0 1 .707.293l4.414 4.414a1 1 0 0 1 .293.707Z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 1.75V5.5a1 1 0 0 0 1 1h3.75"
      ></path>
    </svg>
  );
}

export default DocumentIcon;
