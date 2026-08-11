import type {
  BudgetAttachment,
  BudgetCategory,
  BudgetItem,
  BudgetPayment,
  CreateBudgetAttachmentDto,
  CreateBudgetCategoryDto,
  CreateBudgetItemDto,
  CreateBudgetPaymentDto,
  CreateGuestDto,
  CreateGuestPhotoDto,
  CreatePlannerCategoryDto,
  CreatePlannerTaskDto,
  CreateTableDto,
  Guest,
  GuestPhoto,
  PlannerCategory,
  PlannerTask,
  Project,
  PublicRsvpPayload,
  ResolvePartyPersonInput,
  Table,
  UpdateBudgetItemDto,
  UpdatePlannerTaskDto,
} from "@/components/dashboard/types";
import { mapAttendanceToRsvpStatus } from "@/components/dashboard/utils/guestParty";
import type { UniversalProjectConfig } from "@/types/config";
import { getDemoStore } from "./mode";

const now = () => new Date().toISOString();
const newId = (prefix: string) => `demo-${prefix}-${crypto.randomUUID()}`;

function withGuestTable(guest: Guest): Guest {
  const store = getDemoStore();
  const table = guest.table_id
    ? store.tables.find((t) => t.id === guest.table_id)
    : null;
  return {
    ...guest,
    tables: table ? { id: table.id, name: table.name } : null,
  };
}

function enrichBudgetItem(item: BudgetItem): BudgetItem {
  const store = getDemoStore();
  const category = store.budgetCategories.find((c) => c.id === item.category_id);
  const payments = store.budgetPayments.filter(
    (p) => p.budget_item_id === item.id,
  );
  const attachments = store.budgetAttachments.filter(
    (a) => a.budget_item_id === item.id,
  );
  return {
    ...item,
    budget_categories: category
      ? {
          id: category.id,
          name: category.name,
          icon: category.icon,
          color: category.color,
        }
      : null,
    budget_payments: payments,
    budget_attachments: attachments,
  };
}

/* ─── Project ─────────────────────────────────────────────── */

export function demoGetProject(projectId: string): Project {
  const project = getDemoStore().projects.find((p) => p.id === projectId);
  if (!project) throw new Error("Demo project not found");
  return structuredClone(project);
}

export function demoGetProjects(clientId: string): Project[] {
  return structuredClone(
    getDemoStore().projects.filter((p) => p.client_id === clientId),
  );
}

export function demoUpdateProject(
  projectId: string,
  updates: Partial<Project>,
): Project {
  const store = getDemoStore();
  const index = store.projects.findIndex((p) => p.id === projectId);
  if (index < 0) throw new Error("Demo project not found");

  const next: Project = {
    ...store.projects[index],
    ...updates,
    id: projectId,
    updated_at: now(),
  };
  store.projects[index] = next;
  return structuredClone(next);
}

export function demoUpdateConfig(
  projectId: string,
  config: UniversalProjectConfig,
): Project {
  return demoUpdateProject(projectId, { config_json: config });
}

/* ─── Guests ──────────────────────────────────────────────── */

export function demoGetGuests(projectId: string): Guest[] {
  return getDemoStore()
    .guests.filter((g) => g.project_id === projectId)
    .map(withGuestTable)
    .map((g) => structuredClone(g));
}

export function demoCreateGuest(
  projectId: string,
  guest: CreateGuestDto,
): Guest {
  const store = getDemoStore();
  const created: Guest = {
    id: newId("guest"),
    project_id: projectId,
    name: guest.name,
    email: guest.email ?? null,
    rsvp_status: guest.rsvp_status ?? "pending",
    message: guest.message ?? null,
    notes: guest.notes ?? null,
    table_id: guest.table_id ?? null,
    party_size: guest.party_size ?? 1,
    is_child: guest.is_child ?? false,
    age: guest.age ?? null,
    parent_guest_id: guest.parent_guest_id ?? null,
    name_pending: guest.name_pending ?? false,
    created_at: now(),
    updated_at: now(),
  };
  store.guests.push(created);
  return structuredClone(withGuestTable(created));
}

export function demoUpdateGuest(
  id: string,
  updates: Partial<CreateGuestDto>,
): Guest {
  const store = getDemoStore();
  const index = store.guests.findIndex((g) => g.id === id);
  if (index < 0) throw new Error("Demo guest not found");

  const next: Guest = {
    ...store.guests[index],
    ...updates,
    id,
    updated_at: now(),
  };
  store.guests[index] = next;

  if (!next.parent_guest_id && updates.rsvp_status != null && updates.rsvp_status !== "") {
    store.guests = store.guests.map((guest) =>
      guest.parent_guest_id === next.id
        ? { ...guest, rsvp_status: updates.rsvp_status!, updated_at: now() }
        : guest,
    );
  }

  return structuredClone(withGuestTable(next));
}

export function demoDeleteGuest(id: string): void {
  const store = getDemoStore();
  const target = store.guests.find((g) => g.id === id);
  store.guests = store.guests.filter(
    (g) => g.id !== id && g.parent_guest_id !== id,
  );

  if (target?.parent_guest_id) {
    const siblings = store.guests.filter(
      (g) => g.parent_guest_id === target.parent_guest_id,
    );
    store.guests = store.guests.map((g) =>
      g.id === target.parent_guest_id
        ? { ...g, party_size: 1 + siblings.length, updated_at: now() }
        : g,
    );
  }
}

export function demoSubmitPublicRsvp(
  payload: PublicRsvpPayload,
): { contactId: string } {
  const partySize = Math.min(
    Math.max(Math.floor(payload.guestsCount) || 1, 1),
    50,
  );
  const status = mapAttendanceToRsvpStatus(payload.attendance);
  const contact = demoCreateGuest(payload.projectId, {
    name: payload.fullName.trim(),
    email: payload.email?.trim() || null,
    message: payload.message?.trim() || null,
    rsvp_status: status,
    party_size: partySize,
    is_child: false,
    name_pending: false,
    parent_guest_id: null,
  });

  for (let i = 0; i < partySize - 1; i += 1) {
    demoCreateGuest(payload.projectId, {
      name: "",
      message: null,
      email: null,
      rsvp_status: status,
      party_size: 1,
      is_child: false,
      name_pending: true,
      parent_guest_id: contact.id,
    });
  }

  return { contactId: contact.id };
}

export function demoResolvePartyNames(
  projectId: string,
  contactId: string,
  people: ResolvePartyPersonInput[],
): Guest[] {
  const store = getDemoStore();
  const contact = store.guests.find(
    (g) => g.id === contactId && g.project_id === projectId,
  );
  if (!contact || contact.parent_guest_id) {
    throw new Error("RSVP prijava nije pronađena.");
  }

  const companions = store.guests
    .filter((g) => g.parent_guest_id === contactId)
    .sort((a, b) => a.created_at.localeCompare(b.created_at));

  const [primary, ...rest] = people;
  const updatedContact = demoUpdateGuest(contactId, {
    name: primary.name.trim(),
    is_child: primary.is_child,
    age: primary.age ?? null,
    name_pending: false,
    party_size: people.length,
  });

  const result: Guest[] = [updatedContact];

  for (let i = 0; i < rest.length; i += 1) {
    const person = rest[i];
    const existing = companions[i];
    if (existing) {
      result.push(
        demoUpdateGuest(existing.id, {
          name: person.name.trim(),
          is_child: person.is_child,
          age: person.age ?? null,
          name_pending: false,
          party_size: 1,
          message: null,
        }),
      );
    } else {
      result.push(
        demoCreateGuest(projectId, {
          name: person.name.trim(),
          is_child: person.is_child,
          age: person.age ?? null,
          name_pending: false,
          party_size: 1,
          message: null,
          rsvp_status: contact.rsvp_status,
          parent_guest_id: contactId,
        }),
      );
    }
  }

  if (companions.length > rest.length) {
    companions.slice(rest.length).forEach((g) => demoDeleteGuest(g.id));
  }

  return result;
}

/* ─── Tables ──────────────────────────────────────────────── */

export function demoGetTables(projectId: string): Table[] {
  return structuredClone(
    getDemoStore().tables.filter((t) => t.project_id === projectId),
  );
}

export function demoCreateTable(
  projectId: string,
  table: CreateTableDto,
): Table {
  const store = getDemoStore();
  const created: Table = {
    id: newId("table"),
    project_id: projectId,
    name: table.name,
    number_of_guests: table.number_of_guests,
  };
  store.tables.push(created);
  return structuredClone(created);
}

export function demoUpdateTable(
  id: string,
  updates: Partial<CreateTableDto>,
): Table {
  const store = getDemoStore();
  const index = store.tables.findIndex((t) => t.id === id);
  if (index < 0) throw new Error("Demo table not found");

  const next: Table = { ...store.tables[index], ...updates, id };
  store.tables[index] = next;
  return structuredClone(next);
}

export function demoDeleteTable(id: string): void {
  const store = getDemoStore();
  store.tables = store.tables.filter((t) => t.id !== id);
  store.guests = store.guests.map((g) =>
    g.table_id === id ? { ...g, table_id: null } : g,
  );
}

/* ─── Budget ──────────────────────────────────────────────── */

export function demoGetBudgetCategories(projectId: string): BudgetCategory[] {
  return structuredClone(
    getDemoStore()
      .budgetCategories.filter((c) => c.project_id === projectId)
      .sort((a, b) => a.sort_order - b.sort_order),
  );
}

export function demoCreateBudgetCategoriesBulk(
  projectId: string,
  categories: CreateBudgetCategoryDto[],
): BudgetCategory[] {
  return categories.map((category, index) =>
    demoCreateBudgetCategory(projectId, {
      ...category,
      sort_order: category.sort_order ?? index,
    }),
  );
}

export function demoCreateBudgetCategory(
  projectId: string,
  category: CreateBudgetCategoryDto,
): BudgetCategory {
  const store = getDemoStore();
  const created: BudgetCategory = {
    id: newId("bc"),
    project_id: projectId,
    name: category.name.trim(),
    icon: category.icon ?? "Wallet",
    color: category.color ?? "#64748b",
    sort_order: category.sort_order ?? 999,
    created_at: now(),
  };
  store.budgetCategories.push(created);
  return structuredClone(created);
}

export function demoGetBudgetItems(projectId: string): BudgetItem[] {
  return getDemoStore()
    .budgetItems.filter((i) => i.project_id === projectId)
    .map(enrichBudgetItem)
    .map((i) => structuredClone(i));
}

export function demoCreateBudgetItem(
  projectId: string,
  item: CreateBudgetItemDto,
): BudgetItem {
  const store = getDemoStore();
  const created: BudgetItem = {
    id: newId("bi"),
    project_id: projectId,
    category_id: item.category_id,
    title: item.title.trim(),
    vendor_name: item.vendor_name?.trim() || null,
    planned_amount: item.planned_amount,
    currency: item.currency,
    due_date: item.due_date || null,
    payment_date: item.payment_date || null,
    phone: item.phone?.trim() || null,
    email: item.email?.trim() || null,
    website: item.website?.trim() || null,
    notes: item.notes?.trim() || null,
    created_at: now(),
    updated_at: now(),
  };
  store.budgetItems.push(created);
  return structuredClone(enrichBudgetItem(created));
}

export function demoUpdateBudgetItem(
  id: string,
  updates: UpdateBudgetItemDto,
): BudgetItem {
  const store = getDemoStore();
  const index = store.budgetItems.findIndex((i) => i.id === id);
  if (index < 0) throw new Error("Demo budget item not found");

  const current = store.budgetItems[index];
  const next: BudgetItem = {
    ...current,
    category_id:
      updates.category_id !== undefined
        ? updates.category_id
        : current.category_id,
    title:
      updates.title !== undefined ? updates.title.trim() : current.title,
    vendor_name:
      updates.vendor_name !== undefined
        ? updates.vendor_name?.trim() || null
        : current.vendor_name,
    planned_amount:
      updates.planned_amount !== undefined
        ? updates.planned_amount
        : current.planned_amount,
    currency:
      updates.currency !== undefined ? updates.currency : current.currency,
    due_date:
      updates.due_date !== undefined
        ? updates.due_date || null
        : current.due_date,
    payment_date:
      updates.payment_date !== undefined
        ? updates.payment_date || null
        : current.payment_date,
    phone:
      updates.phone !== undefined
        ? updates.phone?.trim() || null
        : current.phone,
    email:
      updates.email !== undefined
        ? updates.email?.trim() || null
        : current.email,
    website:
      updates.website !== undefined
        ? updates.website?.trim() || null
        : current.website,
    notes:
      updates.notes !== undefined
        ? updates.notes?.trim() || null
        : current.notes,
    updated_at: now(),
  };
  store.budgetItems[index] = next;
  return structuredClone(enrichBudgetItem(next));
}

export function demoDeleteBudgetItem(id: string): void {
  const store = getDemoStore();
  store.budgetItems = store.budgetItems.filter((i) => i.id !== id);
  store.budgetPayments = store.budgetPayments.filter(
    (p) => p.budget_item_id !== id,
  );
  store.budgetAttachments = store.budgetAttachments.filter(
    (a) => a.budget_item_id !== id,
  );
}

export function demoCreateBudgetPayment(
  budgetItemId: string,
  payment: CreateBudgetPaymentDto,
): BudgetPayment {
  const store = getDemoStore();
  const created: BudgetPayment = {
    id: newId("bp"),
    budget_item_id: budgetItemId,
    amount: payment.amount,
    payment_date: payment.payment_date,
    method: payment.method,
    note: payment.note?.trim() || null,
    created_at: now(),
  };
  store.budgetPayments.push(created);
  return structuredClone(created);
}

export function demoDeleteBudgetPayment(id: string): void {
  const store = getDemoStore();
  store.budgetPayments = store.budgetPayments.filter((p) => p.id !== id);
}

export function demoCreateBudgetAttachment(
  budgetItemId: string,
  attachment: CreateBudgetAttachmentDto,
): BudgetAttachment {
  const store = getDemoStore();
  const created: BudgetAttachment = {
    id: newId("ba"),
    budget_item_id: budgetItemId,
    file_url: attachment.file_url,
    file_name: attachment.file_name,
    type: attachment.type,
    created_at: now(),
  };
  store.budgetAttachments.push(created);
  return structuredClone(created);
}

export function demoDeleteBudgetAttachment(id: string): void {
  const store = getDemoStore();
  store.budgetAttachments = store.budgetAttachments.filter((a) => a.id !== id);
}

/* ─── Planner ─────────────────────────────────────────────── */

export function demoGetPlannerCategories(
  projectId: string,
): PlannerCategory[] {
  return structuredClone(
    getDemoStore()
      .plannerCategories.filter((c) => c.project_id === projectId)
      .sort((a, b) => a.sort_order - b.sort_order),
  );
}

export function demoCreatePlannerCategoriesBulk(
  projectId: string,
  categories: CreatePlannerCategoryDto[],
): PlannerCategory[] {
  return categories.map((category, index) =>
    demoCreatePlannerCategory(projectId, {
      ...category,
      sort_order: category.sort_order ?? index,
    }),
  );
}

export function demoCreatePlannerCategory(
  projectId: string,
  category: CreatePlannerCategoryDto,
): PlannerCategory {
  const store = getDemoStore();
  const created: PlannerCategory = {
    id: newId("pc"),
    project_id: projectId,
    name: category.name.trim(),
    sort_order: category.sort_order ?? 999,
    created_at: now(),
  };
  store.plannerCategories.push(created);
  return structuredClone(created);
}

export function demoGetPlannerTasks(projectId: string): PlannerTask[] {
  return structuredClone(
    getDemoStore()
      .plannerTasks.filter((t) => t.project_id === projectId)
      .sort((a, b) => a.sort_order - b.sort_order),
  );
}

export function demoCreatePlannerTasksBulk(
  projectId: string,
  tasks: CreatePlannerTaskDto[],
): PlannerTask[] {
  return tasks.map((task, index) =>
    demoCreatePlannerTask(projectId, {
      ...task,
      sort_order: task.sort_order ?? index,
    }),
  );
}

export function demoCreatePlannerTask(
  projectId: string,
  task: CreatePlannerTaskDto,
): PlannerTask {
  const store = getDemoStore();
  const completed = task.completed ?? false;
  const created: PlannerTask = {
    id: newId("pt"),
    project_id: projectId,
    category: task.category.trim(),
    title: task.title.trim(),
    description: task.description?.trim() || null,
    priority: task.priority,
    due_date: task.due_date || null,
    completed,
    completed_at: completed ? now() : null,
    sort_order: task.sort_order ?? 999,
    created_at: now(),
    updated_at: now(),
  };
  store.plannerTasks.push(created);
  return structuredClone(created);
}

export function demoUpdatePlannerTask(
  id: string,
  updates: UpdatePlannerTaskDto,
): PlannerTask {
  const store = getDemoStore();
  const index = store.plannerTasks.findIndex((t) => t.id === id);
  if (index < 0) throw new Error("Demo planner task not found");

  const current = store.plannerTasks[index];
  const next: PlannerTask = {
    ...current,
    category:
      updates.category !== undefined
        ? updates.category.trim()
        : current.category,
    title: updates.title !== undefined ? updates.title.trim() : current.title,
    description:
      updates.description !== undefined
        ? updates.description?.trim() || null
        : current.description,
    priority:
      updates.priority !== undefined ? updates.priority : current.priority,
    due_date:
      updates.due_date !== undefined
        ? updates.due_date || null
        : current.due_date,
    sort_order:
      updates.sort_order !== undefined
        ? updates.sort_order
        : current.sort_order,
    completed:
      updates.completed !== undefined ? updates.completed : current.completed,
    completed_at:
      updates.completed !== undefined
        ? updates.completed_at !== undefined
          ? updates.completed_at
          : updates.completed
            ? now()
            : null
        : updates.completed_at !== undefined
          ? updates.completed_at
          : current.completed_at,
    updated_at: now(),
  };
  store.plannerTasks[index] = next;
  return structuredClone(next);
}

export function demoDeletePlannerTask(id: string): void {
  const store = getDemoStore();
  store.plannerTasks = store.plannerTasks.filter((t) => t.id !== id);
}

/* ─── Guest photos ────────────────────────────────────────── */

export function demoGetGuestPhotos(projectId: string): GuestPhoto[] {
  return structuredClone(
    getDemoStore().guestPhotos.filter((p) => p.project_id === projectId),
  );
}

export function demoCreateGuestPhoto(
  projectId: string,
  photo: CreateGuestPhotoDto,
): GuestPhoto {
  const store = getDemoStore();
  const created: GuestPhoto = {
    id: newId("photo"),
    project_id: projectId,
    public_id: photo.public_id,
    secure_url: photo.secure_url,
    file_name: photo.file_name ?? null,
    guest_name: photo.guest_name?.trim() || null,
    width: photo.width ?? null,
    height: photo.height ?? null,
    bytes: photo.bytes ?? null,
    format: photo.format ?? null,
    created_at: now(),
  };
  store.guestPhotos.unshift(created);
  return structuredClone(created);
}

export function demoDeleteGuestPhoto(id: string): void {
  const store = getDemoStore();
  store.guestPhotos = store.guestPhotos.filter((p) => p.id !== id);
}
