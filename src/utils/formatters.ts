function pluralize(value: number, unit: string) {
  return `${value} ${unit}${value !== 1 ? "s" : ""}`;
}

function relativeTime(from: Date, to = new Date()) {
  const diff = Math.round((to.getTime() - from.getTime()) / 1000); // seconds
  const abs = Math.abs(diff);
  const r = (n: number, unit: string) =>
    diff >= 0 ? `${pluralize(n, unit)} ago` : `in ${pluralize(n, unit)}`;

  if (abs < 60) return r(abs, "second");
  if (abs < 3600) return r(Math.floor(abs / 60), "minute");
  if (abs < 3600 * 24) return r(Math.floor(abs / 3600), "hour");
  if (abs < 3600 * 24 * 7) return r(Math.floor(abs / (3600 * 24)), "day");
  if (abs < 3600 * 24 * 30) return r(Math.floor(abs / (3600 * 24 * 7)), "week");
  if (abs < 3600 * 24 * 365)
    return r(Math.floor(abs / (3600 * 24 * 30)), "month");
  return r(Math.floor(abs / (3600 * 24 * 365)), "year");
}

export function formatDateTime(
  date: Date | string,
  options: FormatDateTimeOptions = {
    hideAgo: true,
    hideTime: false,
    long: false,
  }
) {
  const { hideAgo = true, hideTime = false, long = false, locale } = options;
  const parsed = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  const usedLocale = locale || undefined; // let Intl pick default if undefined

  // Weekday and date parts
  const weekday = new Intl.DateTimeFormat(usedLocale, {
    weekday: long ? "long" : "short",
  }).format(parsed);
  const datePart = new Intl.DateTimeFormat(usedLocale, {
    month: long ? "long" : "short",
    day: "numeric",
    year: long ? "numeric" : undefined,
  }).format(parsed);

  // Time part (12-hour by default)
  let timePart = "";
  if (!hideTime) {
    timePart = new Intl.DateTimeFormat(usedLocale, {
      hour: "numeric",
      minute: "2-digit",
    }).format(parsed);
  }

  // Relative part
  const rel = hideAgo ? "" : ` — ${relativeTime(parsed)}`;

  if (long) {
    // e.g. Monday, January 1, 2025 at 3:05 PM
    const longDate = new Intl.DateTimeFormat(usedLocale, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(parsed);
    return `${longDate}${!hideTime ? ` at ${timePart}` : ""}${rel}`;
  }

  // short: e.g. Mon, Jan 1 · 3:05 PM
  const short = `${weekday}, ${datePart}${
    !hideTime ? ` · ${timePart}` : ""
  }${rel}`;
  return short;
}
