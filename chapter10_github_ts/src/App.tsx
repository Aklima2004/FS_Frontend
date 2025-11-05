import { NavLink, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import AboutPage from "./pages/AboutPage";
import "./App.css"; 

export default function App() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    "app-nav-link" + (isActive ? " active" : "");

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-logo"> Chapter 11: Useful Third-Party Components</div>

        <nav className="app-nav">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/search" className={linkClass}>
            Search
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
        </nav>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Если путь не найден — можно показывать About или простую 404 */}
          <Route path="*" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  );
}
