"use client";

import { useActionState } from "react";
import styles from "../contentpage.module.css";
import { sendContact, type ContactState } from "./actions";

export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, null as ContactState);

  return (
    <div className={styles.formCard}>
      <h3 className={styles.formTitle}>Collaboration</h3>
      <p className={styles.formSub}>Send a message, to start collaboration.</p>

      <form action={action} className={styles.form}>
        <input name="company" tabIndex={-1} autoComplete="off" className={styles.hp} />

        <label className={styles.label}>
          Name *
          <input name="name" required className={styles.input} />
        </label>

        <label className={styles.label}>
          E-mail *
          <input name="email" type="email" required className={styles.input} />
        </label>

        <label className={styles.label}>
          Message *
          <textarea name="message" required rows={6} className={styles.textarea} />
        </label>

        <button className={styles.submit} type="submit" disabled={pending}>
          {pending ? "Sending…" : "Submit"}
        </button>

        {state?.ok === true ? <div className={styles.ok}>Sent. We’ll reply by e-mail.</div> : null}
        {state?.ok === false ? <div className={styles.err}>{state.error}</div> : null}
      </form>
    </div>
  );
}
