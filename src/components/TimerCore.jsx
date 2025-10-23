import { useEffect, useState } from "react";

export default function TimerCore({ onTick }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
      onTick?.();
    }, 1000);
    return () => clearInterval(id);
  }, [onTick]);

  useEffect(() => {
    document.title = `FS Lab · ${seconds}s`;
  }, [seconds]);

  return (
    <>
      <p style={{ margin: "6px 0 12px" }}>
        Seconds passed: <b>{seconds}</b>
      </p>
    </>
  );
}
