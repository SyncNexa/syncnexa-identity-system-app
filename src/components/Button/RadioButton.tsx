import React from "react";
import styles from "./style/style.module.css";
function RadioButton({
  checked,
  onChange,
  name,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
  name: string;
}) {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        name={name}
        // checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.ellipse} />
    </div>
  );
}

export default RadioButton;
