import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function TodoApp() {
  const [todos, setTodos] = useLocalStorage("todos", [
    { id: 1, title: "go to university", done: false },
    { id: 2, title: "drawing", done: false },
    { id: 3, title: "sleeping", done: false },
  ]);
  const [title, setTitle] = useState("");

  const add = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    setTodos((list) => [{ id: Date.now(), title: t, done: false }, ...list]);
    setTitle("");
  };

  const toggle = (id) =>
    setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remove = (id) => setTodos((list) => list.filter((t) => t.id !== id));

  const clearCompleted = () => setTodos((list) => list.filter((t) => !t.done));

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <section className="section">
      <h3>Todo (lists, events, forms)</h3>

      {/* инпут и «Добавить» на одной строке */}
      <form onSubmit={add} className="space-between" style={{ marginTop: 10 }}>
        <input
          className="input"
          placeholder="A new task…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>

      <ul className="todo-list">
        {todos.map((t) => (
          <li key={t.id} className="todo-item">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t.id)}
              title="Отметить выполненной"
            />
            <span
              className="todo-title"
              style={{
                textDecoration: t.done ? "line-through" : "none",
                color: t.done ? "var(--muted)" : "inherit",
              }}
            >
              {t.title}
            </span>
            <button className="btn" onClick={() => remove(t.id)} title="Удалить">
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="space-between" style={{ marginTop: 12 }}>
        <small>
          Left: <b>{remaining}</b>
        </small>
        <button className="btn" onClick={clearCompleted} disabled={todos.every((t) => !t.done)}>
          Clear completed tasks
        </button>
      </div>
    </section>
  );
}
