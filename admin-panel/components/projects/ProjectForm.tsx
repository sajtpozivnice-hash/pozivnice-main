"use client";

import { useEffect, useMemo, useState } from "react";
import { Field, SelectField, TextAreaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import {
  extractConfigHints,
  parseConfigJson,
} from "@/lib/configParse";
import { normalizeSubdomain } from "@/lib/subdomain";
import {
  EVENT_TYPE_LABELS,
  type Client,
  type EventType,
  type TemplateCatalogItem,
  type TemplateKey,
  type UniversalProjectConfig,
} from "@/types/project";

export type ConfigSource = "template" | "paste";

export type ProjectFormValues = {
  client_id: string;
  title: string;
  eventType: EventType;
  template: TemplateKey | "";
  subdomain: string;
  eventDate: string;
  published: boolean;
  configSource: ConfigSource;
  configText: string;
};

type Props = {
  mode: "create" | "edit";
  initial: ProjectFormValues;
  clients: Client[];
  templates: TemplateCatalogItem[];
  submitting?: boolean;
  error?: string;
  onSubmit: (
    values: ProjectFormValues,
    extras?: {
      resetConfig?: boolean;
      config_json?: UniversalProjectConfig;
    },
  ) => void;
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
  const [configHint, setConfigHint] = useState("");
  const [configError, setConfigError] = useState("");

  useEffect(() => {
    setValues(initial);
  }, [initial]);

  const filteredTemplates = useMemo(
    () => templates.filter((t) => t.eventTypes.includes(values.eventType)),
    [templates, values.eventType],
  );

  useEffect(() => {
    if (templates.length === 0) return;
    if (values.configSource === "paste") return;
    if (
      values.template &&
      !filteredTemplates.some((t) => t.key === values.template)
    ) {
      setValues((prev) => ({ ...prev, template: "" }));
    }
  }, [
    filteredTemplates,
    templates.length,
    values.template,
    values.configSource,
  ]);

  const templateChanged =
    mode === "edit" &&
    values.configSource === "template" &&
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

  const applyPastedConfig = () => {
    setConfigError("");
    setConfigHint("");
    const parsed = parseConfigJson(values.configText);
    if (!parsed.ok) {
      setConfigError(parsed.error);
      return;
    }

    const hints = extractConfigHints(parsed.config);
    setValues((prev) => ({
      ...prev,
      configSource: "paste",
      template: hints.template || prev.template,
      eventType: hints.eventType,
      title: prev.title || hints.title,
      eventDate: prev.eventDate || hints.eventDate,
      configText: JSON.stringify(parsed.config, null, 2),
    }));
    setConfigHint(
      `Config učitan (template: ${parsed.config.template}${
        parsed.config.eventType ? `, tip: ${parsed.config.eventType}` : ""
      }).`,
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfigError("");

    if (templateChanged && !confirmReset) {
      return;
    }

    if (values.configSource === "paste") {
      const parsed = parseConfigJson(values.configText);
      if (!parsed.ok) {
        setConfigError(parsed.error);
        return;
      }
      if (!values.template && parsed.config.template) {
        setField("template", parsed.config.template as TemplateKey);
      }
      onSubmit(
        {
          ...values,
          template:
            values.template ||
            (parsed.config.template as TemplateKey | ""),
        },
        { config_json: parsed.config },
      );
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
          required={values.configSource === "template"}
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

      {filteredTemplates.length === 0 && values.configSource === "template" ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Trenutno nema template-a za tip „{EVENT_TYPE_LABELS[values.eventType]}
          ”.
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
        hint="Šalji gostima: www.vasdogadjaj.com/i/subdomain (radi i bez www). Lepši alias bez www: subdomain.vasdogadjaj.com"
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

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-2)]/40 p-4">
        <p className="text-sm font-medium text-[var(--foreground)]">
          Config pozivnice
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Sa sajta stiže mejl sa prilogom <code>invite-config.json</code>{" "}
          (podešeno u editoru). Ubacite taj JSON ovde, ili koristite default iz
          template-a.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            type="button"
            variant={values.configSource === "template" ? "primary" : "outline"}
            onClick={() => {
              setConfigError("");
              setConfigHint("");
              setField("configSource", "template");
            }}
          >
            Template default
          </Button>
          <Button
            type="button"
            variant={values.configSource === "paste" ? "primary" : "outline"}
            onClick={() => setField("configSource", "paste")}
          >
            Ubaci JSON iz mejla
          </Button>
        </div>

        {values.configSource === "paste" ? (
          <div className="mt-4 space-y-3">
            <TextAreaField
              label="config_json"
              value={values.configText}
              onChange={(v) => {
                setConfigError("");
                setField("configText", v);
              }}
              placeholder='Nalepi sadržaj invite-config.json ovde…'
              rows={14}
              mono
              required
              hint="Posle lepljenja kliknite „Primeni config” da popunite template/tip/datum iz JSON-a."
            />
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={applyPastedConfig}>
                Primeni config
              </Button>
            </div>
            {configHint ? (
              <p className="text-sm text-emerald-700">{configHint}</p>
            ) : null}
            {configError ? (
              <p className="text-sm text-red-700">{configError}</p>
            ) : null}
          </div>
        ) : (
          <p className="mt-3 text-sm text-[var(--muted)]">
            {mode === "create"
              ? "Pri kreiranju biće generisan početni config iz izabranog template-a."
              : "Postojeći config ostaje. Promena template-a zahteva potvrdu (reset)."}
          </p>
        )}
      </div>

      {templateChanged ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-medium">Promena template-a</p>
          <p className="mt-1">
            Postojeći <code>config_json</code> biće zamenjen default config-om
            novog template-a.
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
