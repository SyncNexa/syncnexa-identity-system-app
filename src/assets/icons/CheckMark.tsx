import * as React from "react";
import DashboardIcon from "./Dashboard";

function CheckMark({ color = "#B5B5B5" }: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.787"
        d="M19.958 9.554v.877a9.532 9.532 0 1 1-5.653-8.712m5.653 1.086-9.532 9.542-2.86-2.86"
      ></path>
    </svg>
  );
}

export default CheckMark;
