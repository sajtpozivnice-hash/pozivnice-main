"use client";
import InvitationContactForm from "@/components/shared/InvitationContactForm/InvitationContactForm";
import { useEffect, useState } from "react";

const TemplateForm = () => {
  const [formData, setFormData] = useState();
  useEffect(() => {
    const saved = localStorage.getItem("contactData");
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);
  return <InvitationContactForm config={formData} />;
};

export default TemplateForm;
