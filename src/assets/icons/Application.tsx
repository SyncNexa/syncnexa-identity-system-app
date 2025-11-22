import * as React from "react";

function ApplicationIcon({ color = "#707070" }: React.SVGProps<SVGElement>) {
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
        d="m.99 5.195 7.76 4.527 7.76-4.527M8.75 18.75V9.713m8 3.586V6.127a1.8 1.8 0 0 0-.889-1.55L9.64.99a1.77 1.77 0 0 0-1.778 0L1.64 4.576A1.805 1.805 0 0 0 .75 6.127V13.3a1.8 1.8 0 0 0 .889 1.551l6.222 3.586a1.77 1.77 0 0 0 1.778 0l6.222-3.586c.27-.157.494-.383.65-.655.156-.273.239-.581.239-.896"
      ></path>
    </svg>
  );
}

export default ApplicationIcon;
