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

const locale = "sr-Latn-RS";

export function parseDate(dateStr: string): Date | null {
  if (!dateStr) return null;

  if (dateStr.includes(".")) {
    const parts = dateStr.split(".");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }
  }

  if (dateStr.includes("/")) {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [dayOrYear, month, yearOrDay] = parts;
      // pokušaj da odrediš koji je format
      if (dayOrYear.length === 4) {
        // yyyy/MM/dd
        return new Date(`${dayOrYear}-${month}-${yearOrDay}`);
      } else {
        // dd/MM/yyyy
        return new Date(`${yearOrDay}-${month}-${dayOrYear}`);
      }
    }
  }

  if (dateStr.includes("-")) {
    return new Date(dateStr); // već u ISO formatu
  }

  return null;
}

/**
 * Formatira datum za prikaz u lokalnom formatu
 */
export const formatDate = (dateStr: string, format: DateFormat) => {
  const d = parseDate(dateStr);
  if (!d || isNaN(d.getTime())) return "";

  switch (format) {
    case "DD_MM_YYYY":
      return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(d);

    case "D_M_YYYY":
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }).format(d);

    case "DD_MM_YY":
      return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      }).format(d);

    case "D_M_YY":
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "numeric",
        year: "2-digit",
      }).format(d);

    case "DD_MMMM_YYYY":
      return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(d);

    case "D_MMMM_YYYY":
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);

    case "MMMM_D_YYYY":
      return new Intl.DateTimeFormat(locale, {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(d);

    case "D_MMM_YYYY":
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(d);

    case "DD_MMM_YYYY":
      return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(d);

    case "YYYY_MM_DD":
    case "YYYY_M_D":
      return d.toISOString().split("T")[0];

    case "DD_SLASH_MM_YYYY":
    case "DD/MM/YYYY": {
      const [y, m, day] = d.toISOString().split("T")[0].split("-");
      return `${day}/${m}/${y}`;
    }

    case "D_SLASH_M_YYYY":
    case "D/M/YYYY": {
      const [y, m, day] = d.toISOString().split("T")[0].split("-");
      return `${parseInt(day)}/${parseInt(m)}/${y}`;
    }

    case "DD_DOT_MM_DOT_YYYY":
    case "D_DOT_M_DOT_YYYY":
    case "DD.MM.YYYY":
    case "D.M.YYYY": {
      const [y, m, day] = d.toISOString().split("T")[0].split("-");
      return `${day}.${m}.${y}`;
    }

    case "YYYY.MM.DD":
    case "YYYY/MM/DD":
      return d
        .toISOString()
        .split("T")[0]
        .replace(/-/g, format.includes(".") ? "." : "/");

    case "DAY_D_MMMM_YYYY":
    case "DAY_D_MMM_YYYY":
    case "DAY_DD_MM_YYYY":
      return new Intl.DateTimeFormat(locale, {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(d);

    case "MMM_D_YYYY":
    case "MMM_D_YY":
    case "DD-MMM-YYYY":
    case "D-MMM-YYYY":
      return new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(d);
    case "MMMM":
      return new Intl.DateTimeFormat(locale, {
        month: "long",
      }).format(d);
    case "MMM":
      return new Intl.DateTimeFormat(locale, {
        month: "short",
      }).format(d);
    default:
      return dateStr;
  }
};
export function toInputDateFormat(dateStr: string) {
  const d = parseDate(dateStr);
  if (!d || isNaN(d.getTime())) return "";
  return d.toISOString().split("T")[0];
}
