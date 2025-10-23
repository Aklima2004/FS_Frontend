import { useState } from "react";
import useTitle from "../hooks/useTitle.js";

export default function Counter() {
  const [count, setCount] = useState(0);

  // Демонстрация кастомного хука useTitle из главы.
  // Если таймер на странице активен, он будет перезаписывать title чаще — это ок.
  useTitle(`Counter: ${count}`);

  return (
    <section className="section">
      <h3>Counter (Batching demo)</h3>
      <p style={{ margin: "6px 0 12px" }}>
        Current value: <b>{count}</b>
      </p>
      <div className="row">
        <button className="btn" onClick={() => setCount((c) => c + 1)}>
          +1
        </button>
        <button
          className="btn"
          onClick={() => {
            // batched обновления
            setCount((c) => c + 1);
            setCount((c) => c + 1);
            setCount((c) => c + 1);
          }}
        >
          +3 (batch)
        </button>
      </div>
    </section>
  );
}
