import React, { useEffect, useMemo, useRef, useState } from "react";
import Styles from "./style/Style.module.css";

type SelectOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

type SyncSelectProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
  disabled?: boolean;
  invalid?: boolean;
  warning?: boolean;
  className?: string;
  name?: string;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
  info?: {
    message: string;
    type: "info" | "warning" | "error";
  };
};

function SyncSelect({
  label,
  placeholder = "Select an option",
  required,
  options,
  value,
  defaultValue,
  onValueChange,
  onChange,
  disabled,
  invalid,
  warning,
  className,
  name,
  leftNode,
  rightNode,
  info,
}: SyncSelectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const generatedName = useRef(
    name || `syncselect-${Math.random().toString(36).slice(2, 9)}`
  );
  const isControlled = useMemo(() => value !== undefined, [value]);
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string>(
    value ?? defaultValue ?? ""
  );

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectedValue = isControlled ? value ?? "" : internalValue;
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled || disabled) return;
    if (!isControlled) {
      setInternalValue(opt.value);
    }
    onValueChange?.(opt.value);
    onChange?.(opt.value);
    setOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    setOpen((s) => !s);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      if (!disabled) setOpen(true);
    }
    if (e.key === "Escape") setOpen(false);
  };

  const stateClass = invalid ? Styles.error : warning ? Styles.warning : "";
  const disabledClass = disabled ? Styles.disabled : "";

  return (
    <div
      className={Styles.inputWrapper + (className ? ` ${className}` : "")}
      ref={wrapperRef}
    >
      {label && (
        <label htmlFor={generatedName.current}>
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div className={`${Styles.select} ${stateClass} ${disabledClass}`.trim()}>
        {leftNode}
        <button
          type="button"
          className={Styles.selectTrigger}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-disabled={disabled}
          id={generatedName.current}
        >
          <span
            className={`${Styles.selectValue} ${
              selectedOption ? "" : Styles.placeholder
            }`.trim()}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <span className={Styles.selectRight}>
            {rightNode}
            {!rightNode && <span className={Styles.caret} aria-hidden="true" />}
          </span>
        </button>

        {open && options.length > 0 && (
          <div className={Styles.selectMenu} role="listbox">
            {options.map((opt) => (
              <div
                key={opt.value}
                role="option"
                aria-selected={opt.value === selectedValue}
                className={`${Styles.selectOption} ${
                  opt.value === selectedValue ? Styles.active : ""
                } ${opt.disabled ? Styles.disabled : ""}`.trim()}
                onClick={() => handleSelect(opt)}
              >
                <div className={Styles.optionTop}>
                  {opt.icon && (
                    <span className={Styles.optionIcon}>{opt.icon}</span>
                  )}
                  <span className={Styles.optionLabel}>{opt.label}</span>
                </div>
                {opt.description && (
                  <span className={Styles.optionDescription}>
                    {opt.description}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {info && (
        <div role={info.type === "error" ? "alert" : "status"}>
          {info.message}
        </div>
      )}

      {/* Hidden input so forms still capture the value */}
      <input type="hidden" name={generatedName.current} value={selectedValue} />
    </div>
  );
}

export default SyncSelect;
