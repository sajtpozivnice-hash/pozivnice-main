import { guestStatusLabel } from "../guestOptions";
import { Guest, Table } from "../types";

export type SeatingExportType =
  | "by-tables"
  | "guests-alpha"
  | "unassigned"
  | "occupancy"
  | "full";

type ExportMeta = {
  projectTitle?: string;
  generatedAt?: Date;
};

const compareName = (a: string, b: string) =>
  a.localeCompare(b, "sr", { sensitivity: "base", numeric: true });

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const formatDate = (date: Date) =>
  date.toLocaleString("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

/** "Sto 1" / "1" → "sto broj 1"; inače naziv stola */
export const formatStoLabel = (tableName: string | null | undefined) => {
  if (!tableName) return "bez stola";
  const numberMatch = tableName.match(/\d+/);
  if (numberMatch) return `sto broj ${numberMatch[0]}`;
  return tableName;
};

const getTableName = (tables: Table[], tableId: string | null | undefined) => {
  if (!tableId) return null;
  return tables.find((table) => table.id === tableId)?.name ?? null;
};

const formatGuestWithTable = (
  guestName: string,
  tableName: string | null | undefined,
) => `${guestName} - ${formatStoLabel(tableName)}`;

const getGuestsForTable = (guests: Guest[], tableId: string) =>
  guests
    .filter((guest) => guest.table_id === tableId)
    .sort((a, b) => compareName(a.name, b.name));

const buildDocument = (title: string, bodyHtml: string, meta: ExportMeta) => {
  const projectTitle = meta.projectTitle?.trim() || "Raspored sedenja";
  const generatedAt = formatDate(meta.generatedAt ?? new Date());

  return `<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(title)} — ${escapeHtml(projectTitle)}</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      font-family: Georgia, "Times New Roman", serif;
      color: #1a1a1a;
      margin: 0;
      padding: 32px;
      line-height: 1.5;
      background: #fff;
    }
    h1 {
      font-size: 22px;
      margin: 0 0 4px;
      font-weight: 700;
    }
    .meta {
      color: #666;
      font-size: 12px;
      margin-bottom: 28px;
      font-family: system-ui, sans-serif;
    }
    h2 {
      font-size: 16px;
      margin: 28px 0 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #ddd;
    }
    .table-block {
      break-inside: avoid;
      page-break-inside: avoid;
      margin-bottom: 24px;
    }
    .table-block h3 {
      margin: 0 0 8px;
      font-size: 16px;
      font-weight: 700;
    }
    .guest-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .guest-list li {
      padding: 4px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
    }
    .guest-list li:last-child { border-bottom: none; }
    .empty {
      color: #888;
      font-style: italic;
      font-size: 13px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      font-family: system-ui, sans-serif;
    }
    th, td {
      text-align: left;
      padding: 8px 10px;
      border-bottom: 1px solid #ececec;
      vertical-align: top;
    }
    th {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: #666;
      font-weight: 600;
    }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 10px;
      margin-bottom: 24px;
      font-family: system-ui, sans-serif;
    }
    .summary-item {
      border: 1px solid #eee;
      border-radius: 8px;
      padding: 10px 12px;
    }
    .summary-item strong {
      display: block;
      font-size: 18px;
      margin-top: 2px;
    }
    .summary-item span {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    @media print {
      body { padding: 12mm; }
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <div class="meta">${escapeHtml(projectTitle)} · generisano ${escapeHtml(generatedAt)}</div>
  ${bodyHtml}
</body>
</html>`;
};

const buildByTablesHtml = (tables: Table[], guests: Guest[]) => {
  const sortedTables = [...tables].sort((a, b) => compareName(a.name, b.name));

  if (sortedTables.length === 0) {
    return `<p class="empty">Nema definisanih stolova.</p>`;
  }

  return sortedTables
    .map((table) => {
      const tableGuests = getGuestsForTable(guests, table.id);
      const guestList =
        tableGuests.length > 0
          ? `<ul class="guest-list">${tableGuests
              .map((guest) => `<li>${escapeHtml(guest.name)}</li>`)
              .join("")}</ul>`
          : `<p class="empty">Nema raspoređenih gostiju</p>`;

      return `<section class="table-block">
        <h3>${escapeHtml(table.name)}</h3>
        ${guestList}
      </section>`;
    })
    .join("");
};

const buildGuestsAlphaHtml = (tables: Table[], guests: Guest[]) => {
  const sorted = [...guests].sort((a, b) => compareName(a.name, b.name));

  if (sorted.length === 0) {
    return `<p class="empty">Nema gostiju.</p>`;
  }

  return `<ul class="guest-list">${sorted
    .map((guest) => {
      const line = formatGuestWithTable(
        guest.name,
        getTableName(tables, guest.table_id),
      );
      return `<li>${escapeHtml(line)}</li>`;
    })
    .join("")}</ul>`;
};

const buildUnassignedHtml = (guests: Guest[]) => {
  const unassigned = guests
    .filter((guest) => !guest.table_id)
    .sort((a, b) => compareName(a.name, b.name));

  if (unassigned.length === 0) {
    return `<p class="empty">Svi gosti su raspoređeni za stolove.</p>`;
  }

  return `<ul class="guest-list">${unassigned
    .map((guest) => `<li>${escapeHtml(guest.name)}</li>`)
    .join("")}</ul>`;
};

const buildOccupancyHtml = (tables: Table[], guests: Guest[]) => {
  const sortedTables = [...tables].sort((a, b) => compareName(a.name, b.name));
  const totalCapacity = sortedTables.reduce(
    (sum, table) => sum + table.number_of_guests,
    0,
  );
  const totalAssigned = guests.filter((guest) => guest.table_id).length;
  const totalFree = Math.max(totalCapacity - totalAssigned, 0);
  const unassigned = guests.filter((guest) => !guest.table_id).length;

  const summary = `<div class="summary">
    <div class="summary-item"><span>Stolovi</span><strong>${sortedTables.length}</strong></div>
    <div class="summary-item"><span>Kapacitet</span><strong>${totalCapacity}</strong></div>
    <div class="summary-item"><span>Raspoređeno</span><strong>${totalAssigned}</strong></div>
    <div class="summary-item"><span>Slobodno</span><strong>${totalFree}</strong></div>
    <div class="summary-item"><span>Bez stola</span><strong>${unassigned}</strong></div>
  </div>`;

  if (sortedTables.length === 0) {
    return `${summary}<p class="empty">Nema definisanih stolova.</p>`;
  }

  const rows = sortedTables
    .map((table) => {
      const occupied = getGuestsForTable(guests, table.id).length;
      const free = Math.max(table.number_of_guests - occupied, 0);
      const fill =
        table.number_of_guests > 0
          ? Math.round((occupied / table.number_of_guests) * 100)
          : 0;

      return `<tr>
        <td>${escapeHtml(table.name)}</td>
        <td>${table.number_of_guests}</td>
        <td>${occupied}</td>
        <td>${free}</td>
        <td>${fill}%</td>
      </tr>`;
    })
    .join("");

  return `${summary}<table>
    <thead>
      <tr>
        <th>Sto</th>
        <th>Kapacitet</th>
        <th>Zauzeto</th>
        <th>Slobodno</th>
        <th>Popunjenost</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
};

const buildFullHtml = (tables: Table[], guests: Guest[]) => {
  return `
    <h2>Pregled popunjenosti</h2>
    ${buildOccupancyHtml(tables, guests)}
    <h2>Raspored po stolovima</h2>
    ${buildByTablesHtml(tables, guests)}
    <h2>Svi gosti (abecedno)</h2>
    ${buildGuestsAlphaHtml(tables, guests)}
    <h2>Gosti bez stola</h2>
    ${buildUnassignedHtml(guests)}
  `;
};

const titles: Record<SeatingExportType, string> = {
  "by-tables": "Raspored sedenja po stolovima",
  "guests-alpha": "Spisak gostiju (abecedno) sa stolovima",
  unassigned: "Gosti bez dodeljenog stola",
  occupancy: "Pregled popunjenosti stolova",
  full: "Kompletan raspored sedenja",
};

const buildExportHtml = (
  type: SeatingExportType,
  tables: Table[],
  guests: Guest[],
  meta: ExportMeta,
) => {
  const bodyBuilders: Record<SeatingExportType, () => string> = {
    "by-tables": () => buildByTablesHtml(tables, guests),
    "guests-alpha": () => buildGuestsAlphaHtml(tables, guests),
    unassigned: () => buildUnassignedHtml(guests),
    occupancy: () => buildOccupancyHtml(tables, guests),
    full: () => buildFullHtml(tables, guests),
  };

  return buildDocument(titles[type], bodyBuilders[type](), meta);
};

/** Generiše i skida PDF fajl (bez dijaloga za štampu). */
export const downloadSeatingExportPdf = async (
  type: SeatingExportType,
  tables: Table[],
  guests: Guest[],
  meta: ExportMeta = {},
) => {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const html = buildExportHtml(type, tables, guests, meta);
  const projectSlug = slugifyFilename(meta.projectTitle || "raspored");

  const frame = document.createElement("iframe");
  frame.setAttribute("title", "PDF export");
  frame.style.cssText =
    "position:fixed;left:-10000px;top:0;width:794px;height:1123px;border:0;opacity:0;pointer-events:none;";
  document.body.appendChild(frame);

  const frameDoc = frame.contentDocument ?? frame.contentWindow?.document;
  if (!frameDoc) {
    frame.remove();
    throw new Error("PDF_FAILED");
  }

  frameDoc.open();
  frameDoc.write(html);
  frameDoc.close();

  await new Promise<void>((resolve) => {
    if (frameDoc.readyState === "complete") {
      resolve();
      return;
    }
    frame.onload = () => resolve();
  });

  await new Promise((resolve) => setTimeout(resolve, 150));

  const source = frameDoc.body;
  const contentHeight = Math.max(source.scrollHeight, source.offsetHeight, 1123);
  frame.style.height = `${contentHeight}px`;

  const canvas = await html2canvas(source, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    windowWidth: 794,
    height: contentHeight,
  });

  frame.remove();

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;
  const imgData = canvas.toDataURL("image/png");

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${projectSlug}-${type}.pdf`);
};

const toCsvValue = (value: string | number) => {
  const text = String(value);
  if (/[",\n;]/.test(text)) {
    return `"${text.replaceAll('"', '""')}"`;
  }
  return text;
};

const downloadTextFile = (filename: string, content: string, mime: string) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};

const slugifyFilename = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(/[^a-z0-9čćžšđ]+/gi, "-")
    .replaceAll(/^-|-$/g, "")
    .slice(0, 60) || "raspored";

export const downloadSeatingExportCsv = (
  type: SeatingExportType,
  tables: Table[],
  guests: Guest[],
  meta: ExportMeta = {},
) => {
  const projectSlug = slugifyFilename(meta.projectTitle || "raspored");
  let headers: string[] = [];
  let rows: Array<Array<string | number>> = [];

  if (type === "by-tables") {
    headers = ["Sto", "Gost"];
    const sortedTables = [...tables].sort((a, b) => compareName(a.name, b.name));
    for (const table of sortedTables) {
      const tableGuests = getGuestsForTable(guests, table.id);
      if (tableGuests.length === 0) {
        rows.push([table.name, ""]);
        continue;
      }
      for (const guest of tableGuests) {
        rows.push([table.name, guest.name]);
      }
    }
  } else if (type === "guests-alpha") {
    headers = ["Gost"];
    rows = [...guests]
      .sort((a, b) => compareName(a.name, b.name))
      .map((guest) => [
        formatGuestWithTable(guest.name, getTableName(tables, guest.table_id)),
      ]);
  } else if (type === "unassigned") {
    headers = ["Ime i prezime", "Status", "Napomena"];
    rows = guests
      .filter((guest) => !guest.table_id)
      .sort((a, b) => compareName(a.name, b.name))
      .map((guest) => [
        guest.name,
        guestStatusLabel(guest.rsvp_status),
        guest.notes ?? "",
      ]);
  } else if (type === "occupancy") {
    headers = ["Sto", "Kapacitet", "Zauzeto", "Slobodno", "Popunjenost %"];
    rows = [...tables]
      .sort((a, b) => compareName(a.name, b.name))
      .map((table) => {
        const occupied = getGuestsForTable(guests, table.id).length;
        const free = Math.max(table.number_of_guests - occupied, 0);
        const fill =
          table.number_of_guests > 0
            ? Math.round((occupied / table.number_of_guests) * 100)
            : 0;
        return [table.name, table.number_of_guests, occupied, free, fill];
      });
  } else {
    headers = ["Sekcija", "Sadržaj"];
    const sortedTables = [...tables].sort((a, b) => compareName(a.name, b.name));
    for (const table of sortedTables) {
      rows.push(["Sto", table.name]);
      const tableGuests = getGuestsForTable(guests, table.id);
      for (const guest of tableGuests) {
        rows.push(["Gost", guest.name]);
      }
    }
    for (const guest of [...guests].sort((a, b) => compareName(a.name, b.name))) {
      rows.push([
        "Abecedno",
        formatGuestWithTable(guest.name, getTableName(tables, guest.table_id)),
      ]);
    }
  }

  const csv = [
    headers.map(toCsvValue).join(","),
    ...rows.map((row) => row.map(toCsvValue).join(",")),
  ].join("\n");

  downloadTextFile(
    `${projectSlug}-${type}.csv`,
    `\uFEFF${csv}`,
    "text/csv;charset=utf-8;",
  );
};

export const seatingExportOptions: Array<{
  type: SeatingExportType;
  label: string;
  description: string;
}> = [
  {
    type: "by-tables",
    label: "Po stolovima",
    description: "Ime stola, ispod spisak gostiju",
  },
  {
    type: "guests-alpha",
    label: "Gosti abecedno + sto",
    description: "npr. Petar Petrović - sto broj 1",
  },
  {
    type: "unassigned",
    label: "Gosti bez stola",
    description: "Ko još nije raspoređen",
  },
  {
    type: "occupancy",
    label: "Popunjenost stolova",
    description: "Kapacitet, zauzeto i slobodna mesta",
  },
  {
    type: "full",
    label: "Kompletan raspored",
    description: "Sve sekcije u jednom dokumentu",
  },
];
