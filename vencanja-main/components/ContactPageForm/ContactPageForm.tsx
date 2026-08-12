import { FC, useState } from "react";
import styles from "./ContactPageForm.module.css";
import FormLabel from "../shared/FormLabel/FormLabel";
import FormError from "../shared/FormError/FormError";
import Button from "../button/Button";
import AnimatedMail from "../icons/AnimatedMail";
import Heading from "../shared/typography/Heading";
import { motion } from "framer-motion";
import FormSelectDropdown from "../shared/FormSelectDropdwon/FormSelectDropdown";
import { useToast } from "../Toast/ToastContext";
import type { UniversalProjectConfig } from "@/types/config";

interface InviteContactFormProps {
  config?: UniversalProjectConfig | null;
}

const requiredFieldNames: Record<string, string> = {
  name: "Ime",
  lastname: "Prezime",
  email: "Email",
  phoneNumber: "Broj telefona",
};

const options = ["Venčanje", "Rođendan", "Krštenje"];

const ContactPageForm: FC<InviteContactFormProps> = ({ config = null }) => {
  const { addToast } = useToast();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    type: "",
    message: "",
    /** Honeypot — must stay empty */
    website: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value);
      if (!value.trim() && requiredFieldNames[key]) {
        newErrors[key] = `${requiredFieldNames[key]} je obavezno polje`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Ime je obavezno";
        break;
      case "lastname":
        if (!value.trim()) error = "Prezime je obavezno";
        break;
      case "email":
        if (!value.trim()) error = "Email je obavezan";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
          error = "Email nije validan";
        break;
      case "phoneNumber":
        if (!value.trim()) error = "Broj telefona je obavezan";
        else if (!/^\+?\d{6,15}$/.test(value))
          error = "Broj telefona nije validan";
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSend = async () => {
    if (!validate()) return;

    const payload = {
      formText: `
      Ime: ${formData.name}
      Prezime: ${formData.lastname}
      Email: ${formData.email}
      Telefon: ${formData.phoneNumber}
      Vrsta Događaja: ${formData.type}
      Poruka: ${formData.message}
      
    `,
      config,
      website: formData.website,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/send-invite", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });

      if (!res.ok) throw new Error("Slanje nije uspelo");
      addToast("Poruka je poslata. Javićemo vam se uskoro.", "success");
      setFormData({
        name: "",
        lastname: "",
        email: "",
        phoneNumber: "",
        type: "",
        message: "",
        website: "",
      });
      setType("");
      setErrors({});
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Slanje nije uspelo";
      console.error(err);
      addToast(`${message}. Molimo Vas pokušajte ponovo.`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Heading>Pošaljite nam poruku</Heading>
        <p className={styles.formIntro}>
        Tu smo da pomognemo oko organizacije Vašeg događaja.
        </p>
      </div>
      <form
        className={styles.formContainer}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "-10000px",
            top: "auto",
            width: 1,
            height: 1,
            overflow: "hidden",
          }}
        >
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, website: e.target.value }))
            }
          />
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.inputWrapper}>
            <FormLabel text={"Ime"} required />
            <motion.input
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={{
                offscreen: { opacity: 0, y: 40 },
                onscreen: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              className={`${styles.inputStyle} ${errors.name ? styles.inputError : ""}`}
              type="text"
              name="name"
              placeholder="Vaše ime"
              value={formData.name}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
                validateField(name, value);
              }}
            />
            <FormError message={errors.name} />
          </div>
          <div className={styles.inputWrapper}>
            <FormLabel text={"Prezime"} required />
            <motion.input
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={{
                offscreen: { opacity: 0, y: 40 },
                onscreen: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.4,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              className={`${styles.inputStyle} ${errors.lastname ? styles.inputError : ""}`}
              type="text"
              value={formData.lastname}
              name="lastname"
              placeholder="Vaše Prezime"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
                validateField(name, value);
              }}
            />
            <FormError message={errors.lastname} />
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.inputWrapper}>
            <FormLabel text={"Email"} required />
            <motion.input
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={{
                offscreen: { opacity: 0, y: 40 },
                onscreen: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.6,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              className={`${styles.inputStyle} ${errors.email ? styles.inputError : ""}`}
              type="email"
              value={formData.email}
              name="email"
              placeholder="Vaša Email adresa"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
                validateField(name, value);
              }}
            />
            <FormError message={errors.email} />
          </div>
          <div className={styles.inputWrapper}>
            <FormLabel text={"Broj Telefona"} required />
            <motion.input
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true }}
              variants={{
                offscreen: { opacity: 0, y: 40 },
                onscreen: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.8,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  },
                },
              }}
              className={`${styles.inputStyle} ${errors.phoneNumber ? styles.inputError : ""}`}
              type="tel"
              value={formData.phoneNumber}
              name="phoneNumber"
              placeholder="Vaš Broj Telefona"
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
                validateField(name, value);
              }}
            />
            <FormError message={errors.phoneNumber} />
          </div>
        </div>
        <div>
          <FormLabel text={"Vrsta događaja"} required />
          <FormSelectDropdown
            value={type}
            options={options}
            onChange={(option) => {
              setType(option);
              setFormData((prev) => ({ ...prev, type: option }));
            }}
          ></FormSelectDropdown>
        </div>
        <div>
          <FormLabel text={"Vaša Ideja"} required />
          <motion.textarea
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true }}
            variants={{
              offscreen: { opacity: 0, y: 40 },
              onscreen: {
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.4,
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              },
            }}
            value={formData.message}
            className={styles.textAreaInput}
            name="message"
            placeholder="Napišite vaše pitanje ili poruku..."
            required={false}
            rows={7}
            onChange={(e) => {
              const { name, value } = e.target;
              setFormData((prev) => ({ ...prev, [name]: value }));
            }}
          />
        </div>
        <Button type="submit" icon={AnimatedMail} loading={loading}>
          Pošalji
        </Button>
      </form>
    </div>
  );
};

export default ContactPageForm;
