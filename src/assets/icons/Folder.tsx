import * as React from "react";

function FolderIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      fill="none"
      viewBox="0 0 18 16"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.75 13.194c0 .413-.169.809-.469 1.1s-.707.456-1.131.456H2.35c-.424 0-.831-.164-1.131-.456a1.53 1.53 0 0 1-.469-1.1V2.306c0-.413.169-.809.469-1.1S1.926.75 2.35.75h4l1.6 2.333h7.2c.424 0 .831.164 1.131.456s.469.687.469 1.1z"
      ></path>
    </svg>
  );
}

export default FolderIcon;
