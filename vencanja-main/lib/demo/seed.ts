import { vencanjeTerraDefaultConfig } from "@/templates/vencanje-terra/config";
import type {
  BudgetCategory,
  BudgetItem,
  Guest,
  GuestPhoto,
  PlannerCategory,
  PlannerTask,
  Project,
  RSVPStatus,
  Table,
} from "@/components/dashboard/types";
import {
  DEFAULT_PLANNER_CATEGORIES,
  DEFAULT_PLANNER_TASKS,
} from "@/components/dashboard/PlanerZadataka/defaultTasks";
import type { DemoSnapshot } from "./types";

const PROJECT_ID = "demo-project-ana-marko";
const CLIENT_ID = "demo-client-ana-marko";
const NOW = "2026-06-15T10:00:00.000Z";

const id = (suffix: string) => `demo-${suffix}`;

function buildConfig() {
  const config = structuredClone(vencanjeTerraDefaultConfig);
  config.eventType = "wedding";
  config.meta = {
    title: "Ana & Marko",
    description: "Demo pozivnica – isprobajte backoffice",
  };
  config.event = {
    date: "2026-09-12",
    rsvpDate: "2026-08-15",
    names: "Ana & Marko",
    location: {
      name: "Sala Belvedere",
      address: "Beograd",
    },
  };

  for (const section of config.sections) {
    if (section.type === "hero") {
      section.data.title = "Ana & Marko";
      section.data.subtitle = "Pozivamo vas na naše venčanje";
    }
  }

  return config;
}

export function createDemoSnapshot(): DemoSnapshot {
  const config = buildConfig();

  const project: Project = {
    id: PROJECT_ID,
    client_id: CLIENT_ID,
    title: "Ana & Marko",
    subdomain: "ana-marko-demo",
    published: true,
    paid: true,
    config_json: config,
    created_at: "2026-03-01T12:00:00.000Z",
    updated_at: NOW,
  };

  const tables: Table[] = [
    {
      id: id("table-1"),
      project_id: PROJECT_ID,
      name: "Sto 1 – Porodica",
      number_of_guests: 12,
    },
    {
      id: id("table-2"),
      project_id: PROJECT_ID,
      name: "Sto 2 – Prijatelji",
      number_of_guests: 10,
    },
    {
      id: id("table-3"),
      project_id: PROJECT_ID,
      name: "Sto 3 – Kolege",
      number_of_guests: 10,
    },
    {
      id: id("table-4"),
      project_id: PROJECT_ID,
      name: "Sto 4 – Kumovi",
      number_of_guests: 12,
    },
    {
      id: id("table-5"),
      project_id: PROJECT_ID,
      name: "Sto 5 – Rodaci",
      number_of_guests: 10,
    },
    {
      id: id("table-6"),
      project_id: PROJECT_ID,
      name: "Sto 6 – Gosti iz inostranstva",
      number_of_guests: 8,
    },
  ];

  const featuredGuests: Array<{
    name: string;
    email?: string;
    rsvp: RSVPStatus;
    table?: string;
    message?: string;
  }> = [
    {
      name: "Jelena Petrović",
      email: "jelena@example.com",
      rsvp: "accepted",
      table: id("table-1"),
      message: "Jedva čekamo!",
    },
    {
      name: "Nikola Petrović",
      email: "nikola@example.com",
      rsvp: "accepted",
      table: id("table-1"),
    },
    {
      name: "Maja Jovanović",
      email: "maja@example.com",
      rsvp: "accepted",
      table: id("table-2"),
    },
    {
      name: "Stefan Jovanović",
      rsvp: "accepted",
      table: id("table-2"),
    },
    {
      name: "Ivana Marković",
      email: "ivana@example.com",
      rsvp: "pending",
      table: id("table-3"),
    },
    {
      name: "Luka Đorđević",
      rsvp: "declined",
      message: "Nažalost ne možemo",
    },
    {
      name: "Sara Nikolić",
      email: "sara@example.com",
      rsvp: "accepted",
      table: id("table-4"),
    },
    {
      name: "Petar Nikolić",
      rsvp: "accepted",
      table: id("table-4"),
    },
    { name: "Milica Stanković", rsvp: "pending" },
    {
      name: "Andrej Ilić",
      email: "andrej@example.com",
      rsvp: "accepted",
      table: id("table-3"),
    },
    { name: "Teodora Popović", rsvp: "accepted", table: id("table-2") },
    { name: "Vuk Radović", rsvp: "pending" },
  ];

  const extraFirstNames = [
    "Ana",
    "Marko",
    "Jovana",
    "Nemanja",
    "Katarina",
    "Filip",
    "Marija",
    "Aleksandar",
    "Tamara",
    "Dušan",
    "Natalija",
    "Igor",
    "Bojana",
    "Vladimir",
    "Sanja",
    "Darko",
    "Jelena",
    "Milan",
    "Ivana",
    "Stefan",
  ];
  const extraLastNames = [
    "Jović",
    "Milić",
    "Kovačević",
    "Ristić",
    "Živković",
    "Pavlović",
    "Simić",
    "Tomić",
    "Đukić",
    "Lazić",
  ];
  const tableCycle = [
    id("table-1"),
    id("table-2"),
    id("table-3"),
    id("table-4"),
    id("table-5"),
    id("table-6"),
    undefined,
  ];
  const rsvpCycle: RSVPStatus[] = [
    "accepted",
    "accepted",
    "accepted",
    "pending",
    "accepted",
    "declined",
    "pending",
  ];

  const guestSeed = [
    ...featuredGuests,
    ...Array.from({ length: 48 }, (_, i) => {
      const first = extraFirstNames[i % extraFirstNames.length];
      const last = extraLastNames[i % extraLastNames.length];
      return {
        name: `${first} ${last}`,
        rsvp: rsvpCycle[i % rsvpCycle.length],
        table: tableCycle[i % tableCycle.length],
      };
    }),
  ];

  const guests: Guest[] = guestSeed.map((g, index) => {
    const table = tables.find((t) => t.id === g.table) || null;
    return {
      id: id(`guest-${index + 1}`),
      project_id: PROJECT_ID,
      name: g.name,
      email: "email" in g ? (g.email ?? null) : null,
      rsvp_status: g.rsvp,
      message: "message" in g ? (g.message ?? null) : null,
      notes: null,
      table_id: g.table ?? null,
      party_size: 1,
      is_child: false,
      age: null,
      parent_guest_id: null,
      name_pending: false,
      created_at: NOW,
      updated_at: NOW,
      tables: table ? { id: table.id, name: table.name } : null,
    };
  });

  const budgetCategories: BudgetCategory[] = [
    {
      id: id("bc-venue"),
      project_id: PROJECT_ID,
      name: "Sala",
      icon: "Home",
      color: "#be123c",
      sort_order: 0,
      created_at: NOW,
    },
    {
      id: id("bc-photo"),
      project_id: PROJECT_ID,
      name: "Fotograf",
      icon: "Camera",
      color: "#0369a1",
      sort_order: 1,
      created_at: NOW,
    },
    {
      id: id("bc-music"),
      project_id: PROJECT_ID,
      name: "Muzika",
      icon: "Music",
      color: "#7c3aed",
      sort_order: 2,
      created_at: NOW,
    },
    {
      id: id("bc-decor"),
      project_id: PROJECT_ID,
      name: "Dekoracija",
      icon: "Flower2",
      color: "#059669",
      sort_order: 3,
      created_at: NOW,
    },
    {
      id: id("bc-invite"),
      project_id: PROJECT_ID,
      name: "Pozivnice",
      icon: "Mail",
      color: "#0f766e",
      sort_order: 4,
      created_at: NOW,
    },
  ];

  const cat = (cid: string) => {
    const c = budgetCategories.find((x) => x.id === cid)!;
    return { id: c.id, name: c.name, icon: c.icon, color: c.color };
  };

  const budgetItems: BudgetItem[] = [
    {
      id: id("bi-1"),
      project_id: PROJECT_ID,
      category_id: id("bc-venue"),
      title: "Iznajmljivanje sale",
      vendor_name: "Sala Belvedere",
      planned_amount: 2800,
      currency: "EUR",
      due_date: "2026-08-01",
      payment_date: "2026-05-10",
      phone: null,
      email: null,
      website: null,
      notes: "Kapara uplaćena",
      created_at: NOW,
      updated_at: NOW,
      budget_categories: cat(id("bc-venue")),
      budget_payments: [],
      budget_attachments: [],
    },
    {
      id: id("bi-2"),
      project_id: PROJECT_ID,
      category_id: id("bc-photo"),
      title: "Foto + video paket",
      vendor_name: "Studio Lumina",
      planned_amount: 900,
      currency: "EUR",
      due_date: "2026-09-01",
      payment_date: null,
      phone: null,
      email: null,
      website: null,
      notes: null,
      created_at: NOW,
      updated_at: NOW,
      budget_categories: cat(id("bc-photo")),
      budget_payments: [],
      budget_attachments: [],
    },
    {
      id: id("bi-3"),
      project_id: PROJECT_ID,
      category_id: id("bc-music"),
      title: "Bend za venčanje",
      vendor_name: "Acoustic Duo",
      planned_amount: 650,
      currency: "EUR",
      due_date: "2026-08-20",
      payment_date: null,
      phone: null,
      email: null,
      website: null,
      notes: null,
      created_at: NOW,
      updated_at: NOW,
      budget_categories: cat(id("bc-music")),
      budget_payments: [],
      budget_attachments: [],
    },
    {
      id: id("bi-4"),
      project_id: PROJECT_ID,
      category_id: id("bc-decor"),
      title: "Cveće i dekoracija",
      vendor_name: "Atelier Flora",
      planned_amount: 480,
      currency: "EUR",
      due_date: "2026-09-05",
      payment_date: null,
      phone: null,
      email: null,
      website: null,
      notes: null,
      created_at: NOW,
      updated_at: NOW,
      budget_categories: cat(id("bc-decor")),
      budget_payments: [],
      budget_attachments: [],
    },
    {
      id: id("bi-5"),
      project_id: PROJECT_ID,
      category_id: id("bc-invite"),
      title: "Digitalna pozivnica",
      vendor_name: "Pozivnice",
      planned_amount: 40,
      currency: "EUR",
      due_date: "2026-04-01",
      payment_date: "2026-03-20",
      phone: null,
      email: null,
      website: null,
      notes: "Plaćeno",
      created_at: NOW,
      updated_at: NOW,
      budget_categories: cat(id("bc-invite")),
      budget_payments: [],
      budget_attachments: [],
    },
  ];

  const budgetPayments = [
    {
      id: id("bp-1"),
      budget_item_id: id("bi-1"),
      amount: 1000,
      payment_date: "2026-05-10",
      method: "transfer" as const,
      note: "Kapara",
      created_at: NOW,
    },
    {
      id: id("bp-2"),
      budget_item_id: id("bi-5"),
      amount: 40,
      payment_date: "2026-03-20",
      method: "card" as const,
      note: null,
      created_at: NOW,
    },
  ];

  budgetItems[0].budget_payments = [budgetPayments[0]];
  budgetItems[4].budget_payments = [budgetPayments[1]];

  const plannerCategories: PlannerCategory[] = DEFAULT_PLANNER_CATEGORIES.map(
    (name, index) => ({
      id: id(`pc-${index + 1}`),
      project_id: PROJECT_ID,
      name,
      sort_order: index,
      created_at: NOW,
    }),
  );

  const plannerTasks: PlannerTask[] = DEFAULT_PLANNER_TASKS.map((task) => {
    // Demo should feel in-progress: first two high-priority bookings done.
    const completed =
      task.title === "Rezervisati restoran" ||
      task.title === "Rezervisati fotografa";

    return {
      id: id(`pt-${task.sort_order}`),
      project_id: PROJECT_ID,
      category: task.category,
      title: task.title,
      description: task.description,
      priority: task.priority,
      due_date: null,
      completed,
      completed_at: completed ? "2026-05-01T12:00:00.000Z" : null,
      sort_order: task.sort_order,
      created_at: NOW,
      updated_at: NOW,
    };
  });

  const guestPhotos: GuestPhoto[] = [
    {
      id: id("photo-1"),
      project_id: PROJECT_ID,
      public_id: "demo/guest-1",
      secure_url:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
      file_name: "toast.jpg",
      guest_name: "Jelena Petrović",
      width: 900,
      height: 600,
      bytes: null,
      format: "jpg",
      created_at: NOW,
    },
    {
      id: id("photo-2"),
      project_id: PROJECT_ID,
      public_id: "demo/guest-2",
      secure_url:
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",
      file_name: "sala.jpg",
      guest_name: "Maja Jovanović",
      width: 900,
      height: 600,
      bytes: null,
      format: "jpg",
      created_at: NOW,
    },
    {
      id: id("photo-3"),
      project_id: PROJECT_ID,
      public_id: "demo/guest-3",
      secure_url:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80",
      file_name: "ples.jpg",
      guest_name: "Sara Nikolić",
      width: 900,
      height: 600,
      bytes: null,
      format: "jpg",
      created_at: NOW,
    },
  ];

  return {
    user: {
      id: "demo-user",
      email: "demo@pozivnice.com",
    },
    client: {
      id: CLIENT_ID,
      auth_user_id: "demo-user",
      name: "Ana Marković",
      email: "demo@pozivnice.com",
      phone: "+381 60 000 0000",
    },
    projects: [project],
    guests,
    tables,
    budgetCategories,
    budgetItems,
    budgetPayments,
    budgetAttachments: [],
    plannerCategories,
    plannerTasks,
    guestPhotos,
  };
}

export const DEMO_PROJECT_ID = PROJECT_ID;
