import { useState } from "react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./styles.css";

/* components */
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Notice from "./components/Notice.jsx";
import Counter from "./components/Counter.jsx";
import TimerCore from "./components/TimerCore.jsx";
import FocusInput from "./components/FocusInput.jsx";
import TodoApp from "./components/TodoApp.jsx";
import Hello from "./components/Hello.jsx";

/* ---------- App shell ---------- */
function AppContent() {
  const { theme, toggleTheme } = useTheme();

  const [showIntro, setShowIntro] = useState(true);
  const [showTimer, setShowTimer] = useState(true);
  const [timerKey, setTimerKey] = useState(0); // для «обнуления при показе»

  return (
    <div className="container">
      <Header />

      {/* Вступительный блок */}
      <section className="section">
        <Hello user="Aklima" />
        <h3>Introduction</h3>
        <p> Conditional rendering and Context API</p>
        {/* учебный компонент для props */}
        <div className="row">
          <button className="btn" onClick={() => setShowIntro((v) => !v)}>
            {showIntro ? "Hide Hint" : "Show Hint"}
          </button>
          <button className="btn" onClick={toggleTheme}>
            Switch theme ({theme})
          </button>
        </div>
      </section>

      <Notice show={showIntro}>
        This is a conditional block controlled by the <code>showIntro</code> state.
      </Notice>

      {/* Хуки: useState batching */}
      <Counter />

      {/* useEffect timer с полноценным скрытием и сбросом */}
      <section className="section">
        <h3>Timer (useEffect)</h3>
        {showTimer ? <TimerCore key={timerKey} /> : <p className="muted">Timer is hidden</p>}
        <div className="row">
          <button
            className="btn"
            onClick={() => {
              if (showTimer) {
                setShowTimer(false);
              } else {
                // при показе обнуляем
                setTimerKey((k) => k + 1);
                setShowTimer(true);
              }
            }}
          >
            {showTimer ? "Hide Timer" : "Show Timer"}
          </button>
        </div>
      </section>

      {/* useRef + useLocalStorage */}
      <FocusInput />

      {/* Списки / события / формы */}
      <TodoApp />

      <Footer />
    </div>
  );
}

// something new
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
