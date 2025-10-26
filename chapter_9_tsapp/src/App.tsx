// src/App.tsx
import { useState } from "react";
import Hello from "./Hello";
import type { Student, Id } from "./types";

function App() {
  /* ---------- типизированные состояния ---------- */
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number | undefined>(undefined);

  /* ---------- демонстрация интерфейса и union-типа ---------- */
  const user: Student = { id: 1, name: "Aklima" }; // email опционален
  const someId: Id = Math.random() > 0.5 ? 123 : "iskra"; // union: number | string

  /* ---------- типизированные обработчики событий ---------- */
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAge(val === "" ? undefined : Number(val));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Hello ${name || "Guest"}${age !== undefined ? `, age ${age}` : ""}`);
  };

  /* ---------- JSX-разметка ---------- */
  return (
    <div className="container">
      <h1>Chapter 9 — TypeScript with React</h1>

      {/* ========== ФОРМА (типизированное состояние и события) ========== */}
      <section className="card">
        <h3>Form (typed state & events)</h3>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="number"
            placeholder="Age"
            value={age ?? ""}
            onChange={handleAgeChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>

      {/* ========== использование типизированного компонента с опциональным age ========== */}
      <section className="card">
        <Hello name={name || "Guest"} age={age} />
      </section>

      {/* ========== Демонстрация интерфейса + optional chaining ========== */}
      <section className="card">
        <h3>Students (interface demo)</h3>

        {/* Студент без email */}
        <p>
          <b>Student 1:</b> {user.name} (id: {user.id})
          {user.email?.length ? (
            <> — email: {user.email}</>
          ) : (
            <> — email not provided</>
          )}
        </p>

        {/* Студент с email */}
        {(() => {
          const studentWithEmail: Student = {
            id: 2,
            name: "Dean Winchester",
            email: "dean.w@mail.com",
          };
          return (
            <p>
              <b>Student 2:</b> {studentWithEmail.name} (id: {studentWithEmail.id})
              {studentWithEmail.email?.length ? (
                <> — email: {studentWithEmail.email}</>
              ) : (
                <> — email not provided</>
              )}
            </p>
          );
        })()}

        <p className="muted">
          Optional chaining protects access to fields that may
          be <code> undefined</code>: example — <code>user.email?.length</code>
        </p>
      </section>

      {/* ========== Демонстрация union-типа ========== */}
      <section className="card">
        <h3>Union type</h3>
        <p>
          <b>Some Id (union string | number):</b> {String(someId)}
        </p>
      </section>

            {/* ===== Футер ===== */}
      <footer className="footer">
        © 2025 FullStack Lab
      </footer>

    </div>
  );
}

export default App;
