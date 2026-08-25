import { guestStatusLabel } from "../guestOptions";
import { Guest } from "../types";

const escapeCsv = (value: string): string => {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const slugifyFilename = (value: string) =>
  value
    .toLowerCase()
    .replaceAll(/[^a-z0-9čćžšđ]+/gi, "-")
    .replaceAll(/^-|-$/g, "")
    .slice(0, 60) || "gosti";

const guestDisplayName = (guest: Guest) =>
  guest.name_pending || !guest.name.trim() ? "Ime nije uneto" : guest.name;

const guestRows = (guests: Guest[]) =>
  guests.map((guest) => ({
    name: guestDisplayName(guest),
    category: guest.is_child ? "Dete" : "Odrasla osoba",
    age: guest.age != null ? String(guest.age) : "—",
    status: guestStatusLabel(guest.rsvp_status),
    email: guest.email?.trim() || "—",
    table: guest.tables?.name?.trim() || "—",
    message: guest.parent_guest_id ? "—" : guest.message?.trim() || "—",
    notes: guest.notes?.trim() || "—",
    date: new Date(guest.updated_at || guest.created_at).toLocaleDateString(
      "sr-RS",
    ),
  }));

export const downloadGuestsCsv = (
  guests: Guest[],
  projectTitle = "Gosti",
): void => {
  const header = [
    "Ime",
    "Kategorija",
    "Godine",
    "Status",
    "Email",
    "Sto",
    "Poruka",
    "Napomene",
    "Datum",
  ];

  const rows = guestRows(guests).map((row) => [
    row.name,
    row.category,
    row.age === "—" ? "" : row.age,
    row.status,
    row.email === "—" ? "" : row.email,
    row.table === "—" ? "" : row.table,
    row.message === "—" ? "" : row.message,
    row.notes === "—" ? "" : row.notes,
    row.date,
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map((cell) => escapeCsv(String(cell))).join(","))
    .join("\n");

  const blob = new Blob([`\uFEFF${csv}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${slugifyFilename(projectTitle)}-gosti.csv`;
  link.click();
  URL.revokeObjectURL(url);
};

const buildGuestsPdfHtml = (guests: Guest[], projectTitle: string) => {
  const generatedAt = new Date().toLocaleString("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const rows = guestRows(guests)
    .map(
      (row) => `
      <tr>
        <td>${escapeHtml(row.name)}</td>
        <td>${escapeHtml(row.category)}</td>
        <td>${escapeHtml(row.age)}</td>
        <td>${escapeHtml(row.status)}</td>
        <td>${escapeHtml(row.table)}</td>
        <td>${escapeHtml(row.email)}</td>
        <td>${escapeHtml(row.message)}</td>
        <td>${escapeHtml(row.notes)}</td>
      </tr>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="utf-8" />
  <title>Gosti — ${escapeHtml(projectTitle)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: Georgia, "Times New Roman", serif;
      color: #1a1a1a;
      margin: 0;
      padding: 28px;
      background: #fff;
      line-height: 1.4;
    }
    h1 { font-size: 22px; margin: 0 0 4px; }
    .meta {
      color: #666;
      font-size: 12px;
      margin-bottom: 20px;
      font-family: system-ui, sans-serif;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
      font-family: system-ui, sans-serif;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 6px 8px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #f3f4f6;
      font-weight: 600;
    }
    tr { break-inside: avoid; page-break-inside: avoid; }
  </style>
</head>
<body>
  <h1>Spisak gostiju</h1>
  <p class="meta">${escapeHtml(projectTitle)} · ${guests.length} ${
    guests.length === 1 ? "gost" : "gostiju"
  } · generisano ${escapeHtml(generatedAt)}</p>
  <table>
    <thead>
      <tr>
        <th>Ime</th>
        <th>Kategorija</th>
        <th>God.</th>
        <th>Status</th>
        <th>Sto</th>
        <th>Email</th>
        <th>Poruka</th>
        <th>Napomene</th>
      </tr>
    </thead>
    <tbody>
      ${rows || `<tr><td colspan="8">Nema gostiju.</td></tr>`}
    </tbody>
  </table>
</body>
</html>`;
};

/** Generiše i skida PDF spisak gostiju (podržava dijakritike). */
export const downloadGuestsPdf = async (
  guests: Guest[],
  projectTitle = "Gosti",
): Promise<void> => {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const html = buildGuestsPdfHtml(guests, projectTitle);
  const projectSlug = slugifyFilename(projectTitle);

  const frame = document.createElement("iframe");
  frame.setAttribute("title", "PDF export gostiju");
  frame.style.cssText =
    "position:fixed;left:-10000px;top:0;width:794px;height:1123px;border:0;opacity:0;pointer-events:none;";
  document.body.appendChild(frame);

  const frameDoc = frame.contentDocument ?? frame.contentWindow?.document;
  if (!frameDoc) {
    frame.remove();
    throw new Error("PDF nije mogao da se generiše.");
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
    orientation: "landscape",
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

  pdf.save(`${projectSlug}-gosti.pdf`);
};
