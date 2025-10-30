import { useEffect, useState } from "react";
import "./App.css";

/**
 * Weather (Tokyo, JP) — React + fetch + async/await.
 * Показываем температуру, описание и иконку; ведём статус запроса.
 * Цветовая тема — в App.css 
 */

const CITY = "Tokyo";
const COUNTRY = "JP"; // Япония
const API_KEY = import.meta.env.VITE_OWM_KEY; // читаем из .env.local

export default function App() {
  // данные погоды
  const [weather, setWeather] = useState({
    temp: null,   // число (°C) или null
    desc: "",     // краткое описание, например "Clouds"
    icon: "",     // код иконки, например "10d"
  });

  // статус и ошибка
  const [status, setStatus] = useState("idle");   // 'idle' | 'loading' | 'success' | 'error'
  const [error, setError] = useState("");

  useEffect(() => {
    // если ключ не задан — сразу ошибка с подсказкой
    if (!API_KEY) {
      setStatus("error");
      setError("Missing OpenWeather API key. Put it into .env.local as VITE_OWM_KEY");
      return;
    }

    const controller = new AbortController();
    const url =
      `https://api.openweathermap.org/data/2.5/weather` +
      `?q=${encodeURIComponent(CITY)},${COUNTRY}` +
      `&units=metric` +
      `&appid=${API_KEY}`;

    async function load() {
      try {
        setStatus("loading");
        setError("");

        const resp = await fetch(url, { signal: controller.signal });
        if (!resp.ok) {
          // fetch не кидает исключение на 4xx/5xx → проверяем вручную
          throw new Error(`HTTP ${resp.status} ${resp.statusText}`);
        }

        const json = await resp.json();

        // безопасно достаём данные
        const temp = Math.round(json?.main?.temp ?? 0);
        const desc = json?.weather?.[0]?.main ?? "";
        const icon = json?.weather?.[0]?.icon ?? "";

        setWeather({ temp, desc, icon });
        setStatus("success");
      } catch (e) {
        if (e.name === "AbortError") return; // запрос отменили — игнорируем
        setError(e.message || "Network error");
        setStatus("error");
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // UI по статусу
  if (status === "loading") {
    return (
      <div className="page">
        <div className="card">
          <header className="card-header">
            <h2>東京の天気 — {CITY} weather</h2>
          </header>
          <p className="muted">Loading weather…</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="page">
        <div className="card error">
          <header className="card-header">
            <h2>東京の天気 — {CITY} weather</h2>
          </header>
          <p className="error-text">{error}</p>
          <p className="muted">
            Tip: make sure your <code>.env.local</code> has <code>VITE_OWM_KEY</code> and the key is active.
          </p>
        </div>
      </div>
    );
  }

  // success
  const { temp, desc, icon } = weather;
  const iconUrl = icon
    ? `https://openweathermap.org/img/wn/${icon}@2x.png`
    : "";

  return (
    <div className="page">
      <div className="card">
        <header className="card-header">
          <h2>東京の天気 — {CITY} weather</h2>
          <span className="chip">Japan</span>
        </header>

        <div className="weather-row">
          {iconUrl && (
            <img
              className="weather-icon"
              src={iconUrl}
              alt={desc || "weather-icon"}
              width={100}
              height={100}
              loading="lazy"
            />
          )}

          <div className="weather-info">
            <div className="temp">
              {temp !== null ? <>{temp}°C</> : "—"}
            </div>
            <div className="desc">{desc || "—"}</div>
          </div>
        </div>

        <footer className="card-footer">
          <span className="muted">OpenWeather • metric °C</span>
          <span className="muted">Tokyo, JP</span>
        </footer>
      </div>
    </div>
  );
}
