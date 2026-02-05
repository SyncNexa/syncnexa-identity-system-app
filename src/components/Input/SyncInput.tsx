"use client";
import React, { useEffect, useRef, useState } from "react";
import Styles from "./style/Style.module.css";
import EyeIcon from "../../assets/icons/Eye";
import EyeClosedIcon from "../../assets/icons/EyeClosed";
import { parsePhoneNumberFromString } from "libphonenumber-js";

function SyncInput({
  label,
  placeholder = "Placeholder here...",
  onValueChange,
  inputType = "text",
  type, // accept native `type` but don't spread it to avoid overriding computed type
  value: propValue,
  rightNode,
  leftNode,
  otpLength = 6,
  onOtpComplete,
  onResendOtp,
  resendDelay = 30,
  required = false,
  info,
  invalid,
  warning,
  onChange,
  id,
  className,
  name,
  otpStyles,
  ...rest
}: SyncInput) {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useRef(
    id || `syncinput-${Math.random().toString(36).slice(2, 9)}`,
  );
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(otpLength).fill(""),
  );
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(resendDelay);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dateValue, setDateValue] = useState<string>("");

  // Helper function to convert various date formats to YYYY-MM-DD
  const convertToDateInputFormat = (value: any): string => {
    if (!value) return "";

    // If it's already in YYYY-MM-DD format, return as is
    if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return value;
    }

    try {
      // Try to parse various date formats
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        // Format as YYYY-MM-DD
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    } catch (e) {
      // ignore parsing errors
    }

    return "";
  };

  // Initialize date value from prop
  useEffect(() => {
    if (inputType === "date" && propValue) {
      setDateValue(convertToDateInputFormat(propValue));
    }
  }, [propValue, inputType]);

  useEffect(() => {
    if (inputType !== "otp") return;
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setResendEnabled(true);
    }
  }, [timer, inputType]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange?.(e.target.value);
    onChange?.(e);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onValueChange?.(e.target.value);
    onChange?.(e as any);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateValue(value);
    // Pass the YYYY-MM-DD format to parent
    onValueChange?.(value);
    onChange?.(e);
  };

  const handleOtpChange = (index: number, value: string) => {
    // If the value is empty (deletion), just clear the field
    if (value === "") {
      const newValues = [...otpValues];
      newValues[index] = "";
      setOtpValues(newValues);
      onValueChange?.(newValues.join(""));
      return;
    }

    // Handle multi-character input (paste)
    if (value.length > 1) {
      const digits = value.replace(/\D/g, "");
      if (digits.length === 0) return;

      const newValues = [...otpValues];

      // If pasting a full OTP code, start from beginning
      if (digits.length >= otpLength) {
        for (let i = 0; i < otpLength; i++) {
          newValues[i] = digits[i];
        }
      } else {
        // Otherwise fill from current index
        for (let i = 0; i < digits.length && index + i < otpLength; i++) {
          newValues[index + i] = digits[i];
        }
      }

      setOtpValues(newValues);
      onValueChange?.(newValues.join(""));

      if (newValues.every((v) => v !== "") && newValues.length === otpLength) {
        onOtpComplete?.(newValues.join(""));
        otpRefs.current[otpLength - 1]?.focus();
      } else {
        const lastFilledIndex = Math.min(
          digits.length >= otpLength
            ? otpLength - 1
            : index + digits.length - 1,
          otpLength - 1,
        );
        otpRefs.current[lastFilledIndex]?.focus();
      }
      return;
    }

    // Handle single character input (typing)
    if (!/^[0-9]$/.test(value)) return; // only single digit

    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    const joined = newValues.join("");
    onValueChange?.(joined);

    // Auto-focus next field
    if (index < otpLength - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newValues.every((v) => v !== "") && newValues.length === otpLength) {
      onOtpComplete?.(newValues.join(""));
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < otpLength - 1) {
      e.preventDefault();
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpPaste = (
    index: number,
    e: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    const digits = pastedText.replace(/\D/g, "");

    if (digits.length === 0) return;

    const newValues = [...otpValues];

    // If pasting a full OTP code, start from beginning
    if (digits.length >= otpLength) {
      for (let i = 0; i < otpLength; i++) {
        newValues[i] = digits[i];
      }
    } else {
      // Otherwise fill from current index
      for (let i = 0; i < digits.length && index + i < otpLength; i++) {
        newValues[index + i] = digits[i];
      }
    }

    setOtpValues(newValues);
    onValueChange?.(newValues.join(""));

    // If all fields are filled, trigger completion
    if (newValues.every((v) => v !== "") && newValues.length === otpLength) {
      onOtpComplete?.(newValues.join(""));
      otpRefs.current[otpLength - 1]?.focus();
    } else {
      // Focus the last filled field
      const lastFilledIndex = Math.min(
        digits.length >= otpLength ? otpLength - 1 : index + digits.length - 1,
        otpLength - 1,
      );
      otpRefs.current[lastFilledIndex]?.focus();
    }
  };

  const handleResend = () => {
    if (!resendEnabled) return;
    setTimer(resendDelay);
    setResendEnabled(false);
    onResendOtp?.();
  };

  const toggleShowPassword = () => setShowPassword((s) => !s);

  // Phone specific state and helpers
  type Country = {
    name: string;
    cca2: string;
    callingCode: string; // like +234
    flag?: string; // svg url
  };

  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneDigits, setPhoneDigits] = useState<string>("");
  const [phoneDisplay, setPhoneDisplay] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countryQuery, setCountryQuery] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags",
        );
        const data = await res.json();
        const mapped: Country[] = (data || [])
          .map((c: any) => {
            const root: string | undefined = c?.idd?.root;
            const suffixes: string[] | undefined = c?.idd?.suffixes;
            let calling = "";
            if (root) {
              if (suffixes && suffixes.length > 0) {
                calling = `${root}${suffixes[0]}`;
              } else {
                calling = root;
              }
            }
            return {
              name: c?.name?.common || c?.name || "",
              cca2: c?.cca2 || "",
              callingCode: calling || "",
              flag: c?.flags?.svg || c?.flags?.png || "",
            };
          })
          .filter((c: Country) => c.callingCode);

        mapped.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        if (!mounted) return;
        setCountries(mapped);
        // pick a sensible default: prefer NG (+234) then first
        const preferred =
          mapped.find((m) => m.callingCode.includes("+234")) ||
          mapped[0] ||
          null;
        setSelectedCountry(preferred);
      } catch (err) {
        // fail quietly
      }
    };
    fetchCountries();
    return () => {
      mounted = false;
    };
  }, []);

  // If parent supplies a controlled `value` (e.g. E.164) keep the display formatted
  useEffect(() => {
    if (inputType !== "phone") return;
    if (!propValue) return;
    if (countries.length === 0) return; // Wait for countries to load

    try {
      const parsed = parsePhoneNumberFromString(String(propValue));
      if (parsed && parsed.isValid()) {
        setPhoneDigits(parsed.nationalNumber.toString());
        setPhoneDisplay(parsed.formatNational());
        // Always try to match and set the country from the parsed number
        if (parsed.country) {
          const match = countries.find((c) => c.cca2 === parsed.country);
          if (match) {
            setSelectedCountry(match);
          }
        }
      } else {
        // Try to extract country code by matching starting digits
        const rawValue = String(propValue).replace(/\D/g, "");
        let matched = false;

        // Sort by code length descending to match longer codes first
        const sortedCountries = [...countries].sort(
          (a, b) =>
            b.callingCode.replace(/\D/g, "").length -
            a.callingCode.replace(/\D/g, "").length,
        );

        for (const country of sortedCountries) {
          const code = country.callingCode.replace(/\D/g, "");
          if (rawValue.startsWith(code)) {
            const remainingDigits = rawValue.slice(code.length);
            // Try parsing with this country
            const testNumber = `${country.callingCode}${remainingDigits}`;
            const testParsed = parsePhoneNumberFromString(testNumber);
            if (testParsed && testParsed.isValid()) {
              setSelectedCountry(country);
              setPhoneDigits(remainingDigits);
              setPhoneDisplay(testParsed.formatNational());
              matched = true;
              break;
            }
          }
        }

        if (!matched) {
          // Fallback: display as-is
          const digits = rawValue;
          setPhoneDigits(digits);
          setPhoneDisplay(formatPhoneDisplay(digits));
        }
      }
    } catch (err) {
      // ignore parsing errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue, countries.length, inputType]);

  const formatPhoneDisplay = (digits: string) => {
    const parts: string[] = [];
    if (!digits) return "";
    const first = digits.slice(0, 4);
    if (first) parts.push(first);
    const second = digits.slice(4, 8);
    if (second) parts.push(second);
    const rest = digits.slice(8);
    if (rest) parts.push(rest);
    return parts.join(" ");
  };

  const handleSelectCountry = (c: Country) => {
    setSelectedCountry(c);
    setDropdownOpen(false);
    if (phoneDigits) {
      const full = `${c.callingCode}${phoneDigits}`.replace(/[^0-9+]/g, "");
      const parsed = parsePhoneNumberFromString(full);
      if (parsed && parsed.isValid()) {
        const national = parsed.nationalNumber.toString();
        setPhoneDigits(national);
        onValueChange?.(parsed.number);
        setPhoneDisplay(parsed.formatNational());
      }
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    if (!selectedCountry) {
      setPhoneDigits(digits);
      const display = formatPhoneDisplay(digits);
      setPhoneDisplay(display);
      onValueChange?.(digits);

      onChange?.({
        ...e,
        target: { ...e.target, value: display, name },
      } as any);
      return;
    }

    const calling = selectedCountry.callingCode.replace(/\+/g, "");
    const full = `+${calling}${digits}`;
    const parsed = parsePhoneNumberFromString(full);
    if (parsed) {
      const maxLen = parsed.nationalNumber ? parsed.nationalNumber.length : 15;
      const limited = digits.slice(0, maxLen);
      setPhoneDigits(limited);
      const display = parsed.formatNational();
      setPhoneDisplay(display);
      onValueChange?.(parsed.number);
      onChange?.({
        ...e,
        target: { ...e.target, value: display, name },
      } as any);
    } else {
      const limited = digits.slice(0, 15);
      setPhoneDigits(limited);
      const display = formatPhoneDisplay(limited);
      setPhoneDisplay(display);
      onValueChange?.(limited);
      onChange?.({
        ...e,
        target: { ...e.target, value: display, name },
      } as any);
    }
  };

  if (inputType === "phone") {
    const phonePlaceholder = placeholder || "e.g 1234 5678 90";
    return (
      <div className={Styles.inputWrapper + (className ? ` ${className}` : "")}>
        {label && (
          <label htmlFor={generatedId.current}>
            {label}
            {required && <span>*</span>}
          </label>
        )}
        <div
          className={`${Styles.input} ${
            invalid ? Styles.error : warning ? Styles.warning : ""
          }`}
        >
          {/* left node: country picker */}
          {leftNode ? (
            leftNode
          ) : (
            <div className={Styles.countryPicker}>
              <button
                type="button"
                className={Styles.phoneCode}
                onClick={() => setDropdownOpen((s) => !s)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                {selectedCountry ? (
                  <div className={Styles.phoneCodeWrapper}>
                    {selectedCountry.flag ? (
                      <img
                        src={selectedCountry.flag}
                        alt={selectedCountry.cca2}
                        style={{ width: 18, height: 12 }}
                      />
                    ) : null}
                    <span className={Styles.callingCode}>
                      {selectedCountry.callingCode}
                    </span>
                  </div>
                ) : (
                  <span className={Styles.callingCode}>+?</span>
                )}
              </button>
              {dropdownOpen && (
                <div className={Styles.countryList} role="listbox">
                  <div className={Styles.countrySearchWrap}>
                    <input
                      className={Styles.countrySearch}
                      placeholder="Search country or code"
                      value={countryQuery}
                      onChange={(e) => setCountryQuery(e.target.value)}
                      aria-label="Search countries"
                    />
                  </div>
                  {countries
                    .filter((c) => {
                      if (!countryQuery) return true;
                      const q = countryQuery.toLowerCase();
                      return (
                        c.name.toLowerCase().includes(q) ||
                        c.callingCode.toLowerCase().includes(q) ||
                        c.cca2.toLowerCase() === q
                      );
                    })
                    .map((c) => (
                      <div
                        key={c.cca2}
                        role="option"
                        className={Styles.countryItem}
                        onClick={() => {
                          handleSelectCountry(c);
                          setCountryQuery("");
                        }}
                      >
                        {c.flag ? (
                          <img
                            className={Styles.flagImg}
                            src={c.flag}
                            alt={c.cca2}
                          />
                        ) : null}
                        <div className={Styles.countryInfo}>
                          <div className={Styles.countryName}>{c.name}</div>
                          <div className={Styles.countryCode}>
                            {c.callingCode}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
          <input
            id={generatedId.current}
            ref={inputRef}
            placeholder={phonePlaceholder}
            onChange={handlePhoneChange}
            onInput={(e) => handlePhoneChange(e as any)}
            autoComplete="tel"
            type="tel"
            inputMode="tel"
            value={phoneDisplay}
            aria-invalid={invalid ? true : undefined}
            // aria-label={label || "Phone number"}
            name={name}
            {...rest}
          />
          {rightNode}
        </div>
        {info && (
          <div
            className={`${Styles.validationMessage} ${Styles[info.type]}`}
            role={info.type === "error" ? "alert" : "status"}
          >
            {info.message}
          </div>
        )}
      </div>
    );
  }

  if (inputType !== "otp") {
    if (inputType === "textarea") {
      return (
        <div className={Styles.inputWrapper}>
          {label && (
            <label htmlFor={generatedId.current}>
              {label}
              {required && <span>*</span>}
            </label>
          )}
          <textarea
            id={generatedId.current}
            className={Styles.textarea}
            placeholder={placeholder}
            onChange={handleTextAreaChange}
            value={propValue ?? ""}
            name={name}
            aria-invalid={invalid ? true : undefined}
          />
        </div>
      );
    }

    if (inputType === "date") {
      return (
        <div
          className={Styles.inputWrapper + (className ? ` ${className}` : "")}
        >
          {label && (
            <label htmlFor={generatedId.current}>
              {label}
              {required && <span>*</span>}
            </label>
          )}
          <div
            className={`${Styles.input} ${
              invalid ? Styles.error : warning ? Styles.warning : ""
            }`}
          >
            {leftNode}
            <input
              id={generatedId.current}
              ref={inputRef}
              placeholder={placeholder}
              onChange={handleDateChange}
              type="date"
              aria-invalid={invalid ? true : undefined}
              name={name}
              value={dateValue}
              {...rest}
            />
            {rightNode}
          </div>
          {info && (
            <div
              className={`${Styles.validationMessage} ${Styles[info.type]}`}
              role={info.type === "error" ? "alert" : "status"}
            >
              {info.message}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className={Styles.inputWrapper + (className ? ` ${className}` : "")}>
        {label && (
          <label htmlFor={generatedId.current}>
            {label}
            {required && <span>*</span>}
          </label>
        )}
        <div
          className={`${Styles.input} ${
            invalid ? Styles.error : warning ? Styles.warning : ""
          }`}
        >
          {leftNode}
          <input
            id={generatedId.current}
            ref={inputRef}
            placeholder={placeholder}
            onChange={handleChange}
            type={
              inputType === "password" && showPassword
                ? "text"
                : (inputType as string)
            }
            aria-invalid={invalid ? true : undefined}
            name={name}
            value={propValue ?? ""}
            {...rest}
          />
          {inputType === "password" ? (
            showPassword ? (
              <EyeClosedIcon onClick={toggleShowPassword} />
            ) : (
              <EyeIcon onClick={toggleShowPassword} />
            )
          ) : (
            rightNode
          )}
        </div>
        {info && (
          <div
            className={`${Styles.validationMessage} ${Styles[info.type]}`}
            role={info.type === "error" ? "alert" : "status"}
          >
            {info.message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={Styles.otpInputWrapper} style={otpStyles?.containerStyles}>
      {label && <label>{label}</label>}
      <div className={Styles.otpInput} style={otpStyles?.wrapperStyles}>
        {Array.from({ length: otpLength }).map((_, i) => (
          <input
            style={otpStyles?.inputStyles}
            key={i}
            ref={(el) => {
              otpRefs.current[i] = el;
            }}
            value={otpValues[i]}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(i, e)}
            onPaste={(e) => handleOtpPaste(i, e)}
            maxLength={1}
            inputMode="numeric"
            type="text"
            pattern="[0-9]*"
            aria-label={`OTP digit ${i + 1}`}
            name={name ? `${name}-${i}` : undefined}
            aria-invalid={invalid ? true : undefined}
            className={otpValues[i] ? Styles.filled : ""}
          />
        ))}
      </div>

      <div className={Styles.downWrapper}>
        {resendEnabled ? (
          <button
            type="button"
            onClick={handleResend}
            aria-disabled={!resendEnabled}
            style={{ color: "var(--color-primary)", cursor: "pointer" }}
          >
            Resend OTP
          </button>
        ) : (
          <p>
            Wait to resend in <span>{timer}</span>s
          </p>
        )}
      </div>
    </div>
  );
}

export default SyncInput;
