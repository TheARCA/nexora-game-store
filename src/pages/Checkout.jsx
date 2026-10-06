import { useI18n } from "../context/useI18n";
import { useRef, useState } from "react";
import {
  Wallet,
  Building2,
  QrCode,
  CheckCircle2,
  ChevronLeft,
  LockKeyhole,
} from "lucide-react";
import { useStore } from "../context/useStore";
import { gameImage } from "../data/games";
import { validateCheckout } from "../data/validation";
import { OrderSummary, PageHeading } from "./Cart";
export default function Checkout({ navigate }) {
  const { t, money } = useI18n();
  const { cart, placeOrder } = useStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    method: "ewallet",
    code: "",
    consent: false,
  });
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);
  const submitting = useRef(false);
  const formRef = useRef(null);
  const update = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };
  function submit(event) {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateCheckout(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const field = Object.keys(nextErrors)[0];
      formRef.current.elements.namedItem(field)?.focus();
      return;
    }
    submitting.current = true;
    const result = placeOrder({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
    });
    if (result) {
      setOrder(result);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else submitting.current = false;
  }
  const field = (name, label, type, placeholder, autoComplete) => (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name]}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(event) => update(name, event.target.value)}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
      />
      {errors[name] && (
        <span className="field-error" id={`${name}-error`}>
          {t(errors[name])}
        </span>
      )}
    </div>
  );
  if (order)
    return (
      <div className="success-screen">
        <div className="success-icon">
          <CheckCircle2 size={46} />
        </div>
        <span className="eyebrow">{t("Pembelian selesai")}</span>
        <h1>{t("Sip, gamenya masuk library!")}</h1>
        <p>
          {t(
            "Pembelian simulasi berhasil. {count} game sudah ditambahkan ke library kamu.",
            { count: order.games.length },
          )}
        </p>
        <div className="receipt">
          <div>
            <span>{t("ID pesanan")}</span>
            <strong>{order.id}</strong>
          </div>
          <div>
            <span>{t("Nama")}</span>
            <strong>{order.customer.name}</strong>
          </div>
          <div>
            <span>Email</span>
            <strong>{order.customer.email}</strong>
          </div>
          {order.games.map((game) => (
            <div key={game.id}>
              <span>{game.title}</span>
              <strong>{money(game.paidPrice)}</strong>
            </div>
          ))}
          <div className="receipt-total">
            <span>{t("Total simulasi")}</span>
            <strong>{money(order.total)}</strong>
          </div>
        </div>
        <button className="button primary" onClick={() => navigate("library")}>
          {" "}
          {t("Buka library saya")}{" "}
        </button>
        <button className="text-button" onClick={() => navigate("store")}>
          {" "}
          {t("Kembali ke store")}{" "}
        </button>
      </div>
    );
  if (!cart.length)
    return (
      <div className="empty-state">
        <h3>{t("Tidak ada game untuk checkout")}</h3>
        <button className="button primary" onClick={() => navigate("store")}>
          {" "}
          {t("Jelajahi game")}{" "}
        </button>
      </div>
    );
  return (
    <>
      <button
        className="text-button back-link"
        onClick={() => navigate("cart")}
      >
        <ChevronLeft size={16} /> {t("Kembali ke keranjang")}{" "}
      </button>
      <PageHeading
        eyebrow="Nexora / Pembayaran"
        title="Checkout"
        description={t(
          "Lengkapi data pembeli untuk menambahkan game ke library.",
        )}
      />
      <div className="checkout-layout">
        <form
          ref={formRef}
          id="checkout-form"
          className="checkout-form"
          onSubmit={submit}
          noValidate
        >
          <section className="form-panel">
            <h2>
              <span className="step-number">01</span> {t("Data pembeli")}{" "}
            </h2>
            {field("name", t("Nama lengkap"), "text", t("Nama kamu"), "name")}
            {field(
              "email",
              t("Alamat email"),
              "email",
              t("kamu@email.com"),
              "email",
            )}
            {field("phone", t("Nomor telepon"), "tel", "081234567890", "tel")}
          </section>
          <section className="form-panel">
            <h2>
              <span className="step-number">02</span>{" "}
              {t("Metode pembayaran")}{" "}
            </h2>
            <fieldset className="payment-options">
              <legend className="sr-only">
                {" "}
                {t("Pilih metode pembayaran simulasi")}{" "}
              </legend>
              {[
                {
                  id: "ewallet",
                  label: "E-Wallet",
                  description: "GoPay / OVO / DANA",
                  icon: Wallet,
                },
                {
                  id: "virtual-account",
                  label: "Virtual Account",
                  description: t("Transfer bank"),
                  icon: Building2,
                },
                {
                  id: "qris",
                  label: "QRIS",
                  description: t("Pembayaran QR"),
                  icon: QrCode,
                },
              ].map(({ id, label, description, icon: Icon }) => (
                <label
                  key={id}
                  className={`payment-option ${form.method === id ? "selected" : ""}`}
                >
                  <input
                    name="method"
                    type="radio"
                    value={id}
                    checked={form.method === id}
                    onChange={() => update("method", id)}
                  />
                  <Icon size={21} />
                  <span>
                    <strong>{label}</strong>
                    <small>{description}</small>
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="demo-notice">
              <LockKeyhole size={18} />
              <p>
                {" "}
                {t(
                  "Mode simulasi aktif. Tidak ada pembayaran nyata atau pengiriman email. Gunakan kode",
                )}{" "}
                <strong>123456</strong> {t("untuk mencoba alur checkout.")}{" "}
              </p>
            </div>
            {field(
              "code",
              t("Kode pembayaran simulasi"),
              "text",
              "123456",
              "off",
            )}
            <label className="consent">
              <input
                name="consent"
                type="checkbox"
                checked={form.consent}
                onChange={(event) => update("consent", event.target.checked)}
                aria-invalid={!!errors.consent}
              />
              <span>
                {t("Saya memahami bahwa pembelian ini hanya simulasi.")}
              </span>
            </label>
            {errors.consent && (
              <span className="field-error" role="alert">
                {t(errors.consent)}
              </span>
            )}
          </section>
        </form>
        <OrderSummary>
          <div className="checkout-mini-games">
            {cart.map((game) => (
              <div key={game.id}>
                <img src={gameImage(game)} alt="" />
                <span>{game.title}</span>
              </div>
            ))}
          </div>
          <button
            type="submit"
            form="checkout-form"
            className="button primary w-full"
          >
            {" "}
            {t("Selesaikan pembelian simulasi")}{" "}
          </button>
        </OrderSummary>
      </div>
    </>
  );
}
