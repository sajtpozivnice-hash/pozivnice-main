export type DateFormat =
  | "DD_MM_YYYY"
  | "D_M_YYYY"
  | "DD_MM_YY"
  | "D_M_YY"
  | "DD_MMMM_YYYY"
  | "D_MMMM_YYYY"
  | "MMMM_D_YYYY"
  | "D_MMM_YYYY"
  | "YYYY_MM_DD"
  | "YYYY_M_D"
  | "DD_SLASH_MM_YYYY"
  | "D_SLASH_M_YYYY"
  | "DD_DOT_MM_DOT_YYYY"
  | "D_DOT_M_DOT_YYYY"
  | "DAY_D_MMMM_YYYY"
  | "DAY_D_MMM_YYYY"
  | "DD_MMM_YYYY"
  | "D_MMM_YY"
  | "MMM_D_YYYY"
  | "MMM_D_YY"
  | "DD-MMM-YYYY"
  | "D-MMM-YYYY"
  | "DD/MM/YYYY"
  | "D/M/YYYY"
  | "DD.MM.YYYY"
  | "D.M.YYYY"
  | "YYYY.MM.DD"
  | "YYYY/MM/DD"
  | "YYYY-M-D"
  | "DAY_DD_MM_YYYY"
  | "MMMM"
  | "MMM";

type DateParts = {
  year: number;
  month: number;
  day: number;
};

const MONTHS_LONG = [
  "januar",
  "februar",
  "mart",
  "april",
  "maj",
  "jun",
  "jul",
  "avgust",
  "septembar",
  "oktobar",
  "novembar",
  "decembar",
] as const;

const MONTHS_SHORT = [
  "jan",
  "feb",
  "mar",
  "apr",
  "maj",
  "jun",
  "jul",
  "avg",
  "sep",
  "okt",
  "nov",
  "dec",
] as const;

const WEEKDAYS_LONG = [
  "nedelja",
  "ponedeljak",
  "utorak",
  "sreda",
  "četvrtak",
  "petak",
  "subota",
] as const;

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function isValidParts(parts: DateParts): boolean {
  const { year, month, day } = parts;
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return false;
  const utc = new Date(Date.UTC(year, month - 1, day));
  return (
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  );
}

/** Parse invitation dates as calendar Y-M-D (no timezone shift). */
export function getDateParts(dateStr: string): DateParts | null {
  if (!dateStr?.trim()) return null;
  const raw = dateStr.trim();

  if (raw.includes(".")) {
    const parts = raw.split(".");
    if (parts.length === 3) {
      const [day, month, year] = parts.map((p) => Number(p));
      const parsed = { year, month, day };
      return isValidParts(parsed) ? parsed : null;
    }
  }

  if (raw.includes("/")) {
    const parts = raw.split("/");
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        const [year, month, day] = parts.map((p) => Number(p));
        const parsed = { year, month, day };
        return isValidParts(parsed) ? parsed : null;
      }
      const [day, month, year] = parts.map((p) => Number(p));
      const parsed = { year, month, day };
      return isValidParts(parsed) ? parsed : null;
    }
  }

  if (raw.includes("-")) {
    const parts = raw.split("-");
    if (parts.length >= 3) {
      const [year, month, day] = parts
        .slice(0, 3)
        .map((p) => Number(p.replace(/T.*/, "")));
      const parsed = { year, month, day };
      return isValidParts(parsed) ? parsed : null;
    }
  }

  return null;
}

/**
 * Returns a Date at UTC noon for the calendar day — safe for getUTC* and display math.
 * Prefer getDateParts() for formatting to avoid SSR/client timezone mismatches.
 */
export function parseDate(dateStr: string): Date | null {
  const parts = getDateParts(dateStr);
  if (!parts) return null;
  return new Date(Date.UTC(parts.year, parts.month - 1, parts.day, 12, 0, 0));
}

/**
 * Deterministic Serbian (Latin) formatting — no Intl/ICU, no local timezone.
 * Prevents React hydration mismatches between Node and the browser.
 */
export const formatDate = (dateStr: string, format: DateFormat) => {
  const parts = getDateParts(dateStr);
  if (!parts) return "";

  const { year, month, day } = parts;
  const yy = String(year).slice(-2);
  const monthLong = MONTHS_LONG[month - 1];
  const monthShort = MONTHS_SHORT[month - 1];
  const weekday =
    WEEKDAYS_LONG[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];

  switch (format) {
    case "DD_MM_YYYY":
      return `${pad2(day)}_${pad2(month)}_${year}`;
    case "D_M_YYYY":
      return `${day}_${month}_${year}`;
    case "DD_MM_YY":
      return `${pad2(day)}_${pad2(month)}_${yy}`;
    case "D_M_YY":
      return `${day}_${month}_${yy}`;
    case "DD_MMMM_YYYY":
      return `${pad2(day)}. ${monthLong} ${year}`;
    case "D_MMMM_YYYY":
      return `${day}. ${monthLong} ${year}`;
    case "MMMM_D_YYYY":
      return `${monthLong} ${day}, ${year}`;
    case "D_MMM_YYYY":
      return `${day}. ${monthShort} ${year}`;
    case "DD_MMM_YYYY":
      return `${pad2(day)}. ${monthShort} ${year}`;
    case "YYYY_MM_DD":
    case "YYYY_M_D":
      return `${year}-${pad2(month)}-${pad2(day)}`;
    case "DD_SLASH_MM_YYYY":
    case "DD/MM/YYYY":
      return `${pad2(day)}/${pad2(month)}/${year}`;
    case "D_SLASH_M_YYYY":
    case "D/M/YYYY":
      return `${day}/${month}/${year}`;
    case "DD_DOT_MM_DOT_YYYY":
    case "DD.MM.YYYY":
      return `${pad2(day)}.${pad2(month)}.${year}`;
    case "D_DOT_M_DOT_YYYY":
    case "D.M.YYYY":
      return `${day}.${month}.${year}`;
    case "YYYY.MM.DD":
      return `${year}.${pad2(month)}.${pad2(day)}`;
    case "YYYY/MM/DD":
      return `${year}/${pad2(month)}/${pad2(day)}`;
    case "DAY_D_MMMM_YYYY":
      return `${weekday}, ${day}. ${monthLong} ${year}`;
    case "DAY_D_MMM_YYYY":
      return `${weekday}, ${day}. ${monthShort} ${year}`;
    case "DAY_DD_MM_YYYY":
      return `${weekday}, ${pad2(day)}.${pad2(month)}.${year}`;
    case "MMM_D_YYYY":
    case "D-MMM-YYYY":
      return `${day}. ${monthShort} ${year}`;
    case "MMM_D_YY":
      return `${day}. ${monthShort} ${yy}`;
    case "DD-MMM-YYYY":
      return `${pad2(day)}-${monthShort}-${year}`;
    case "MMMM":
      return monthLong;
    case "MMM":
      return monthShort;
    default:
      return dateStr;
  }
};

export function toInputDateFormat(dateStr: string) {
  const parts = getDateParts(dateStr);
  if (!parts) return "";
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;
}
