import * as React from "react";

function UserIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="20"
      fill="none"
      viewBox="0 0 18 20"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.75 18.75v-2a4 4 0 0 0-4-4h-8a4 4 0 0 0-4 4v2m12-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0"
      ></path>
    </svg>
  );
}

export default UserIcon;
