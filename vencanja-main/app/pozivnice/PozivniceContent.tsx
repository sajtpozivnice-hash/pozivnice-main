"use client";

import { useMemo, useState } from "react";
import FeaturedBox from "@/components/featuredInvites/FeaturedBox";
import Section from "@/components/layout/Section";
import SwitchToggle from "@/components/packages/SwitchToggle";
import {
  filterCatalogTemplates,
  getCatalogPriceOptions,
  getCatalogStyleOptions,
  getCatalogTemplates,
} from "@/templates/catalog";
import { CatalogFilters } from "@/types/catalog";
import PozivniceFilters from "./PozivniceFilters";
import styles from "./PozivniceContent.module.css";

const INITIAL_FILTERS: CatalogFilters = {
  eventType: "",
  style: "",
  price: "",
  search: "",
};

const PozivniceContent = () => {
  const catalog = useMemo(() => getCatalogTemplates(), []);
  const [filters, setFilters] = useState<CatalogFilters>(INITIAL_FILTERS);

  const styleOptions = useMemo(
    () => getCatalogStyleOptions(catalog),
    [catalog],
  );
  const priceOptions = useMemo(
    () => getCatalogPriceOptions(catalog),
    [catalog],
  );

  const filteredTemplates = useMemo(
    () => filterCatalogTemplates(catalog, filters),
    [catalog, filters],
  );

  return (
    <Section>
      <SwitchToggle
        selected={filters.eventType}
        onChange={(eventType) => setFilters((prev) => ({ ...prev, eventType }))}
      />
      <PozivniceFilters
        filters={filters}
        styleOptions={styleOptions}
        priceOptions={priceOptions}
        onChange={setFilters}
      />

      {filteredTemplates.length === 0 ? (
        <p className={styles.empty}>
          Nema pozivnica za izabrane filtere. Pokušajte sa drugim kombinacijama.
        </p>
      ) : (
        <div className={styles.container}>
          {filteredTemplates.map((item, index) => (
            <FeaturedBox key={item.id} {...item} index={index} />
          ))}
        </div>
      )}
    </Section>
  );
};

export default PozivniceContent;
