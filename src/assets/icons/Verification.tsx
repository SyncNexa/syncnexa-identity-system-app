import * as React from "react";

function VerificationIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
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
        d="M11.708 4.617a.83.83 0 0 1 .892.369l.828 1.323a.8.8 0 0 0 .264.263l1.322.828a.83.83 0 0 1 .37.894l-.35 1.52a.8.8 0 0 0 0 .373l.35 1.52a.83.83 0 0 1-.37.892l-1.322.83a.8.8 0 0 0-.264.263l-.828 1.322a.83.83 0 0 1-.893.37l-1.52-.35a.8.8 0 0 0-.373 0l-1.52.35a.83.83 0 0 1-.893-.37l-.828-1.322a.8.8 0 0 0-.265-.264L4.987 12.6a.83.83 0 0 1-.37-.892l.349-1.521a.8.8 0 0 0 0-.373l-.35-1.52a.83.83 0 0 1 .37-.894l1.322-.828a.8.8 0 0 0 .265-.263L7.4 4.986a.83.83 0 0 1 .892-.37l1.521.35c.123.028.25.028.373 0z"
      ></path>
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m7.929 10.447 1.696 1.624L12.07 7.93"
      ></path>
    </svg>
  );
}

export default VerificationIcon;
