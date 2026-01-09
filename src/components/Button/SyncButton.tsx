import React from "react";
import Styles from "./style/style.module.css";

const SyncButton = React.forwardRef<HTMLButtonElement, SyncButton>(
  (props, ref) => {
    const {
      label = "Click me",
      children,
      color = "green",
      variant = "primary",
      disabled = false,
      loading = false,
      buttonStyles,
      type = "button",
      className,
      ...rest
    } = props;
    const classNames = [
      Styles.button,
      loading ? Styles.loading : "",
      disabled ? Styles.disabled : "",
      className || "",
      Styles[color],
      Styles[variant],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        disabled={disabled || loading}
        style={buttonStyles}
        aria-busy={loading || undefined}
        {...rest}
      >
        {loading ? (
          <span className={Styles.loader} aria-hidden="true" />
        ) : (
          children ?? <span>{label}</span>
        )}
        {/* {loading && <span className={Styles.srOnly}>Loading</span>} */}
      </button>
    );
  }
);

SyncButton.displayName = "SyncButton";

export default SyncButton;
