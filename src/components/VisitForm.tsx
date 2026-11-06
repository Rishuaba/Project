"use client";

import { useState } from "react";

export function VisitForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <p className="form-success" role="status">
        The note stays on this page. This desk is a demonstration, so nothing was sent.
      </p>
    );
  }

  return (
    <form
      className="visit-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <label>
        Name
        <input name="name" required autoComplete="name" maxLength={80} />
      </label>
      <label>
        Email
        <input name="email" type="email" required autoComplete="email" maxLength={120} />
      </label>
      <label>
        Note
        <textarea name="note" required rows={5} maxLength={800} />
      </label>
      <button type="submit" className="cta">
        Leave a note
      </button>
    </form>
  );
}
