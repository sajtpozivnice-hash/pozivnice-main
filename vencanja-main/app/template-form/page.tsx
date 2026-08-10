"use client";
import InvitationContactForm from "@/components/shared/InvitationContactForm/InvitationContactForm";
import { useState } from "react";

const TemplateForm = () => {
  const [formData] = useState(() => {
    if (typeof window === "undefined") return undefined;
    const saved = localStorage.getItem("contactData");
    if (!saved) return undefined;
    try {
      return JSON.parse(saved);
    } catch {
      return undefined;
    }
  });
  return <InvitationContactForm config={formData} />;
};

export default TemplateForm;
