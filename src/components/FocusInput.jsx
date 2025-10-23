import { useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function FocusInput() {
  const [name, setName] = useLocalStorage("name", "");
  const inputRef = useRef(null);
  const prevNameRef = useRef("");

  useEffect(() => {
    prevNameRef.current = name;
  }, [name]);

  return (
    <section className="section">
      <h3>useRef + custom useLocalStorage hook</h3>

      {/* инпут и кнопка в одну линию */}
      <div className="space-between" style={{ marginTop: 10 }}>
        <input
          ref={inputRef}
          className="input"
          placeholder="Enter a name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {/* добавили focus-btn */}
        <button
          type="button"
          className="btn focus-btn"
          onClick={() => inputRef.current?.focus()}
          title="Фокус на поле"
        >
          Focus on the field
        </button>
      </div>

      <p className="muted" style={{ marginTop: 10 }}>
        Previous: <code>{prevNameRef.current || "—"}</code> | Current: <b>{name || "—"}</b>
      </p>
      <p className="muted" style={{ marginTop: 6 }}>
        The value is stored in <code>localStorage</code> under the key <code>"name"</code>. Refresh the page 
        and the text will remain.
      </p>
    </section>
  );
}
