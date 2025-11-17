import { parsePhoneNumberFromString } from "libphonenumber-js";

export function createSignupPayload(form: Signup): SignupPayload {
  const firstName = (form.firstName || "").trim();
  const lastName = (form.lastName || "").trim();
  const email = (form.email || "").trim().toLowerCase();
  const password = form.password || "";

  let phone: string | undefined = undefined;
  if (form.phone) {
    const raw = String(form.phone).trim();
    const parsed = parsePhoneNumberFromString(raw);
    if (parsed && parsed.isValid()) {
      phone = parsed.number; // E.164
    } else {
      const digits = raw.replace(/[^+0-9]/g, "");
      phone = digits || undefined;
    }
  }

  const payload: SignupPayload = {
    firstName,
    lastName,
    email,
    password,
  };

  if (phone) payload.phone = phone;
  if (form.state) payload.state = form.state.trim();
  if (form.address) payload.address = form.address.trim();

  return payload;
}
