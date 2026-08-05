"use client";

import { ChangeEvent } from "react";
import {
  CatalogFilters,
  TEMPLATE_STYLE_LABELS,
  TemplateStyle,
} from "@/types/catalog";
import styles from "./PozivniceFilters.module.css";

type PozivniceFiltersProps = {
  filters: CatalogFilters;
  styleOptions: TemplateStyle[];
  priceOptions: number[];
  onChange: (next: CatalogFilters) => void;
};

const PozivniceFilters = ({
  filters,
  styleOptions,
  priceOptions,
  onChange,
}: PozivniceFiltersProps) => {
  const update = <K extends keyof CatalogFilters>(
    key: K,
    value: CatalogFilters[K],
  ) => {
    onChange({ ...filters, [key]: value });
  };

  const handleStyle = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    update("style", (value || "") as TemplateStyle | "");
  };

  const handlePrice = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    update("price", value === "" ? "" : Number(value));
  };

  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span className={styles.label}>Pretraga</span>
        <input
          type="search"
          className={styles.input}
          placeholder="Naziv, opis, stil…"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Stil</span>
        <select
          className={styles.select}
          value={filters.style}
          onChange={handleStyle}
        >
          <option value="">Svi stilovi</option>
          {styleOptions.map((style) => (
            <option key={style} value={style}>
              {TEMPLATE_STYLE_LABELS[style]}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Cena</span>
        <select
          className={styles.select}
          value={filters.price === "" ? "" : String(filters.price)}
          onChange={handlePrice}
        >
          <option value="">Sve cene</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {price}€
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default PozivniceFilters;
