"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
import { EventType } from "@/types/config";
import PozivniceFilters from "./PozivniceFilters";
import styles from "./PozivniceContent.module.css";

const INITIAL_FILTERS: CatalogFilters = {
  eventType: "",
  style: "",
  price: "",
  search: "",
};

const EVENT_TYPES: EventType[] = [
  "wedding",
  "comingOfAge",
  "kidsBirthday",
  "baptism",
];

const parseEventType = (value: string | null): EventType | "" => {
  if (value && EVENT_TYPES.includes(value as EventType)) {
    return value as EventType;
  }
  return "";
};

const PozivniceContent = () => {
  const catalog = useMemo(() => getCatalogTemplates(), []);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const eventTypeFromUrl = parseEventType(searchParams.get("eventType"));

  const [filters, setFilters] = useState<CatalogFilters>(() => ({
    ...INITIAL_FILTERS,
    eventType: eventTypeFromUrl,
  }));

  useEffect(() => {
    setFilters((prev) =>
      prev.eventType === eventTypeFromUrl
        ? prev
        : { ...prev, eventType: eventTypeFromUrl },
    );
  }, [eventTypeFromUrl]);

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

  const setEventType = (eventType: EventType | "") => {
    setFilters((prev) => ({ ...prev, eventType }));

    const params = new URLSearchParams(searchParams.toString());
    if (eventType) {
      params.set("eventType", eventType);
    } else {
      params.delete("eventType");
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <Section>
      <SwitchToggle selected={filters.eventType} onChange={setEventType} />
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
