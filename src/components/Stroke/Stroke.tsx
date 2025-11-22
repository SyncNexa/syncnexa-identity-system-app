import React from "react";

function Stroke({
  direction = "horizontal",
  size = 1,
  color = "var(--color-border)",
}: {
  direction: "vertical" | "horizontal";
  size: number;
  color: string;
}) {
  return (
    <div
      style={
        direction === "horizontal"
          ? {
              width: "100%",
              height: `${size}px`,
              background: color,
              flexShrink: 0,
            }
          : {
              height: "100%",
              width: `${size}px`,
              background: color,
              flexShrink: 0,
            }
      }
    ></div>
  );
}

export default Stroke;
