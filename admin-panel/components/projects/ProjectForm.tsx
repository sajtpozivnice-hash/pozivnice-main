"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, SelectField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import {
  EVENT_TYPE_LABELS,
  type Client,
  type EventType,
  type TemplateCatalogItem,
  type TemplateKey,
} from "@/types/project";
import { normalizeSubdomain } from "@/lib/subdomain";

export type ProjectFormValues = {
  client_id: string;
  title: string;
  eventType: EventType;
  template: TemplateKey | "";
  subdomain: string;
  eventDate: string;
  published: boolean;
};

type Props = {
  mode: "create" | "edit";
  initial: ProjectFormValues;
  clients: Client[];
  templates: TemplateCatalogItem[];
  submitting?: boolean;
  error?: string;
  onSubmit: (values: ProjectFormValues, extras?: { resetConfig?: boolean }) => void;
  onCancel?: () => void;
};

export function ProjectForm({
  mode,
  initial,
  clients,
  templates,
  submitting,
  error,
  onSubmit,
  onCancel,
}: Props) {
  const [values, setValues] = useState<ProjectFormValues>(initial);
  const [confirmReset, setConfirmReset] = useState(false);
  const [touchedSubdomain, setTouchedSubdomain] = useState(mode === "edit");

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const filteredTemplates = useMemo(
    () => templates.filter((t) => t.eventTypes.includes(values.eventType)),
    [templates, values.eventType],
  );

  useEffect(() => {
    // Don't wipe template while catalog is still loading
    if (templates.length === 0) return;
    if (
      values.template &&
      !filteredTemplates.some((t) => t.key === values.template)
    ) {
      setValues((prev) => ({ ...prev, template: "" }));
    }
  }, [filteredTemplates, templates.length, values.template]);

  const templateChanged =
    mode === "edit" &&
    Boolean(values.template) &&
    values.template !== initial.template;

  const setField = <K extends keyof ProjectFormValues>(
    key: K,
    value: ProjectFormValues[K],
  ) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && mode === "create" && !touchedSubdomain) {
        next.subdomain = normalizeSubdomain(String(value));
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (templateChanged && !confirmReset) {
      return;
    }
    onSubmit(values, { resetConfig: templateChanged ? true : undefined });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <SelectField
        label="Klijent"
        required
        value={values.client_id}
        onChange={(v) => setField("client_id", v)}
        options={[
          { value: "", label: "Izaberi klijenta" },
          ...clients.map((c) => ({
            value: c.id,
            label: `${c.name} (${c.email})`,
          })),
        ]}
      />

      <Field
        label="Naziv projekta"
        required
        value={values.title}
        onChange={(v) => setField("title", v)}
        placeholder="npr. Ana & Marko"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Tip događaja"
          required
          value={values.eventType}
          onChange={(v) => setField("eventType", v as EventType)}
          options={(Object.keys(EVENT_TYPE_LABELS) as EventType[]).map(
            (key) => ({
              value: key,
              label: EVENT_TYPE_LABELS[key],
            }),
          )}
        />

        <SelectField
          label="Template"
          required
          value={values.template}
          onChange={(v) => setField("template", v as TemplateKey | "")}
          options={[
            { value: "", label: "Izaberi template" },
            ...filteredTemplates.map((t) => ({
              value: t.key,
              label: `${t.title} (${t.key})`,
            })),
          ]}
        />
      </div>

      {filteredTemplates.length === 0 ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Trenutno nema template-a za tip „{EVENT_TYPE_LABELS[values.eventType]}
          ”. Za krštenje još nema registrovanog pack-a — izaberite drugi tip ili
          dodajte template u vencanja-main.
        </p>
      ) : null}

      <Field
        label="Subdomain / slug"
        required
        value={values.subdomain}
        onChange={(v) => {
          setTouchedSubdomain(true);
          setField("subdomain", normalizeSubdomain(v));
        }}
        placeholder="ana-marko"
        hint="Pozivnica: subdomain.localhost:3000 (lokalno) / subdomain.pozivnice.com"
      />

      <Field
        label="Datum događaja"
        type="date"
        value={values.eventDate}
        onChange={(v) => setField("eventDate", v)}
      />

      {mode === "edit" ? (
        <SelectField
          label="Status aktivacije"
          value={values.published ? "true" : "false"}
          onChange={(v) => setField("published", v === "true")}
          options={[
            { value: "true", label: "Aktivan (objavljen)" },
            { value: "false", label: "Neaktivan" },
          ]}
        />
      ) : (
        <label className="flex items-center gap-2 text-sm text-[var(--foreground)]">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(e) => setField("published", e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)]"
          />
          Odmah objavi projekat (published)
        </label>
      )}

      {templateChanged ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-medium">Promena template-a</p>
          <p className="mt-1">
            Postojeći <code>config_json</code> biće zamenjen default config-om
            novog template-a. Tekstovi, slike i sekcije koje ste uređivali biće
            izgubljeni.
          </p>
          <label className="mt-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={confirmReset}
              onChange={(e) => setConfirmReset(e.target.checked)}
            />
            Razumem i želim da resetujem config
          </label>
        </div>
      ) : null}

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-2 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting
            ? "Čuvanje…"
            : mode === "create"
              ? "Kreiraj projekat"
              : "Sačuvaj izmene"}
        </Button>
        {onCancel ? (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Otkaži
          </Button>
        ) : null}
      </div>
    </form>
  );
}
