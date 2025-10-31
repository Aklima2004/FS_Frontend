import { useState } from "react";
import { api } from "./api";
import type { Repository, SearchResponse } from "./types";
import "./App.css";

type Status = "idle" | "loading" | "success" | "error";

export default function App() {
  const [keyword, setKeyword] = useState<string>("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setRepos([]);
      setStatus("idle");
      setError("");
      return;
    }

    try {
      setStatus("loading");
      setError("");

      const resp = await api.get<SearchResponse>("/search/repositories", {
        params: { q: keyword.trim() },
      });

      setRepos(resp.data.items);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      const msg =
        e?.response?.status === 403
          ? "Rate limit: слишком много запросов. Подождите минуту и попробуйте снова."
          : e?.message || "Network error";
      setError(msg);
    }
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    handleSearch();
  };

  // 💡 добавляем флаг для анимации "поднятия" карточки
  const hasResults = repos.length > 0 || status === "loading" || status === "error";

  return (
    <div className={`page ${hasResults ? "page-top" : ""}`}>
      <div className="card">
        <header className="header">
          <h1 className="title">GitHub Repositories — Search</h1>
          <span className="muted">Axios + TypeScript</span>
        </header>

        <form className="form" onSubmit={onSubmit}>
          <input
            className="input"
            type="text"
            placeholder="Type keyword, e.g. react, vite, spring..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn" type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Fetching…" : "Fetch"}
          </button>
        </form>

        {status === "loading" && <div className="status muted">Loading…</div>}
        {status === "error" && <div className="error">{error}</div>}

        {status !== "idle" && repos.length === 0 && status === "success" && (
          <div className="empty">No data available</div>
        )}

        {repos.length > 0 && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Repository</th>
                  <th>Stars</th>
                  <th>Description</th>
                  <th>Link</th>
                </tr>
              </thead>
              <tbody>
                {repos.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div className="repo">
                        <img
                          className="avatar"
                          src={r.owner.avatar_url}
                          alt={r.owner.login}
                        />
                        <div>
                          <div>{r.full_name}</div>
                          <div className="muted">@{r.owner.login}</div>
                        </div>
                      </div>
                    </td>
                    <td>{r.stargazers_count.toLocaleString()}</td>
                    <td>{r.description ?? "—"}</td>
                    <td>
                      <a href={r.html_url} target="_blank" rel="noreferrer">
                        {r.html_url}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
