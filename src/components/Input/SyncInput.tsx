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
  ...rest
}: SyncInput) {
  const inputRef = useRef<HTMLInputElement>(null);
  const generatedId = useRef(
    id || `syncinput-${Math.random().toString(36).slice(2, 9)}`
  );
  const [otpValues, setOtpValues] = useState<string[]>(
    Array(otpLength).fill("")
  );
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(resendDelay);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const newValues = [...otpValues];
    newValues[index] = value;
    setOtpValues(newValues);

    if (value && index < otpLength - 1) {
      otpRefs.current[index + 1]?.focus();
    }

    const joined = newValues.join("");
    onValueChange?.(joined);

    if (newValues.every((v) => v !== "") && newValues.length === otpLength) {
      onOtpComplete?.(newValues.join(""));
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
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
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags"
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
    try {
      const parsed = parsePhoneNumberFromString(String(propValue));
      if (parsed && parsed.isValid()) {
        setPhoneDigits(parsed.nationalNumber.toString());
        setPhoneDisplay(parsed.formatNational());
        // try to select a matching country if possible
        if (!selectedCountry && parsed.country && countries.length > 0) {
          const match = countries.find((c) => c.cca2 === parsed.country);
          if (match) setSelectedCountry(match);
        }
      } else {
        const digits = String(propValue).replace(/\D/g, "");
        setPhoneDigits(digits);
        setPhoneDisplay(formatPhoneDisplay(digits));
      }
    } catch (err) {
      // ignore parsing errors
    }
    // only run when propValue changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propValue]);

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
          <div role={info.type === "error" ? "alert" : "status"}>
            {info.message}
          </div>
        )}
      </div>
    );
  }

  if (inputType !== "otp") {
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
          <div role={info.type === "error" ? "alert" : "status"}>
            {info.message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={Styles.otpInputWrapper}>
      {label && <label>{label}</label>}
      <div className={Styles.otpInput}>
        {Array.from({ length: otpLength }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              otpRefs.current[i] = el;
            }}
            value={otpValues[i]}
            onChange={(e) => handleOtpChange(i, e.target.value)}
            onKeyDown={(e) => handleOtpKeyDown(i, e)}
            maxLength={1}
            inputMode="numeric"
            aria-label={`OTP digit ${i + 1}`}
          />
        ))}
      </div>

      <div className={Styles.downWrapper}>
        {resendEnabled ? (
          <button
            type="button"
            onClick={handleResend}
            aria-disabled={!resendEnabled}
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
