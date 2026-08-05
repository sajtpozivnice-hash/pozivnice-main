import { FC, useState } from "react";
import Button from "../../button/Button";
import AnimatedMail from "../../icons/AnimatedMail";
import styles from "./InvitionContactForm.module.css";
import FormError from "../FormError/FormError";
import FormLabel from "../FormLabel/FormLabel";
import { useToast } from "@/components/Toast/ToastContext";
import Heading from "../typography/Heading";

interface InviteContactFormProps {
  config: unknown;
}

const requiredFieldNames: Record<string, string> = {
  name: "Ime i Prezime",
  email: "Email",
  phoneNumber: "Broj telefona",
};

const InvitationContactForm: FC<InviteContactFormProps> = ({ config }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
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
      Ime i Prezime: ${formData.name}
      Email: ${formData.email}
      Telefon: ${formData.phoneNumber}
      Poruka: ${formData.message}
    `,
      config,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/send-invite", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Slanje nije uspelo");
      addToast("Poruka je poslata. Javićemo vam se uskoro.", "success");
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
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
    <div>
      <form
        className={styles.container}
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div>
          <Heading className="text-center">Pošaljite upit</Heading>
          <p className="text-center margin-bottom30">
            Napišite nam svoje podatke i poruku. Ako vam se dopada ovaj dizajn —
            ili želite nešto drugačije — javićemo se i dogovoriti izradu.
          </p>
        </div>
        <div className={styles.innerContainer}>
          <div className={styles.inputWrapper}>
            <FormLabel text={"Ime i Prezime"} required />
            <input
              className={`${styles.inputStyle} ${errors.name ? styles.inputError : ""}`}
              type="text"
              name="name"
              placeholder="Vaše ime i prezime"
              value={formData.name}
              onChange={(e) => {
                const { name, value } = e.target;
                setFormData((prev) => ({ ...prev, [name]: value }));
                validateField(name, value);
              }}
            />
            <FormError message={errors.name} />
          </div>
        </div>
        <div className={styles.innerContainer}>
          <div>
            <FormLabel text={"Email"} required />
            <input
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
          <div>
            <FormLabel text={"Broj Telefona"} required />
            <input
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
          <FormLabel text={"Poruka"} />
          <textarea
            value={formData.message}
            className={styles.textAreaInput}
            name="message"
            placeholder="Vaša poruka"
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

export default InvitationContactForm;
