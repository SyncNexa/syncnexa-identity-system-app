import * as React from "react";

function SettingsIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M8.75 10.932a2.182 2.182 0 1 0 0-4.364 2.182 2.182 0 0 0 0 4.364"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M14.132 10.932a1.2 1.2 0 0 0 .24 1.323l.043.044a1.455 1.455 0 1 1-2.058 2.058l-.043-.043a1.2 1.2 0 0 0-1.324-.24 1.2 1.2 0 0 0-.727 1.098v.123a1.455 1.455 0 1 1-2.91 0v-.065a1.2 1.2 0 0 0-.785-1.098 1.2 1.2 0 0 0-1.323.24l-.044.043a1.455 1.455 0 1 1-2.058-2.058l.043-.043a1.2 1.2 0 0 0 .24-1.324 1.2 1.2 0 0 0-1.098-.727h-.123a1.454 1.454 0 1 1 0-2.91h.065a1.2 1.2 0 0 0 1.098-.785 1.2 1.2 0 0 0-.24-1.323L3.085 5.2a1.455 1.455 0 1 1 2.058-2.058l.043.043a1.2 1.2 0 0 0 1.324.24h.058a1.2 1.2 0 0 0 .727-1.098v-.123a1.455 1.455 0 0 1 2.91 0v.065a1.2 1.2 0 0 0 .727 1.098 1.2 1.2 0 0 0 1.323-.24l.044-.043a1.455 1.455 0 1 1 2.058 2.058l-.043.043a1.2 1.2 0 0 0-.24 1.324v.058a1.2 1.2 0 0 0 1.098.727h.123a1.455 1.455 0 0 1 0 2.91h-.065a1.2 1.2 0 0 0-1.098.727"
      ></path>
    </svg>
  );
}

export default SettingsIcon;
