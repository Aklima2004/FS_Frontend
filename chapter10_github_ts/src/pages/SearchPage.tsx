import { useState } from "react";
import { api } from "../api";
import type { Repository, SearchResponse } from "../types";

import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import type {
  ColDef,
  ICellRendererParams,
  ValueGetterParams,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import "../App.css";

ModuleRegistry.registerModules([AllCommunityModule]);

type Status = "idle" | "loading" | "success" | "error";

export default function SearchPage() {
  const [keyword, setKeyword] = useState("");
  const [repos, setRepos] = useState<Repository[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const q = keyword.trim();
    if (!q) {
      setRepos([]);
      setStatus("idle");
      setError("");
      return;
    }

    try {
      setStatus("loading");
      setError("");

      const resp = await api.get<SearchResponse>("/search/repositories", {
        params: { q },
      });

      console.log("GitHub items:", resp.data.items.length);
      setRepos(resp.data.items);
      setStatus("success");
    } catch (e: any) {
      const msg =
        e?.response?.status === 403
          ? "Rate limit exceeded. Please wait a minute and try again."
          : e?.message || "Network error";

      setError(msg);
      setStatus("error");
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      handleSearch();
    }
  };

  const hasResults =
    repos.length > 0 || status === "loading" || status === "error";

  // ------- колонки AG Grid -------
  const [columnDefs] = useState<ColDef<Repository>[]>([
    {
      field: "full_name",
      headerName: "Repository",
      sortable: true,
      filter: true,
      flex: 2,
    },
    {
      headerName: "Owner",
      valueGetter: (params: ValueGetterParams<Repository>) =>
        params.data?.owner?.login ?? "",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "stargazers_count",
      headerName: "Stars",
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 130,
      valueFormatter: (p) =>
        p.value != null ? Number(p.value).toLocaleString() : "",
    },
    {
      headerName: "Link",
      flex: 2,
      cellRenderer: (params: ICellRendererParams<Repository>) => {
        const href = params.data?.html_url ?? "#";
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#6ea8fe", textDecoration: "underline" }}
          >
            Open →
          </a>
        );
      },
    },
  ]);

  return (
    <div className={`page ${hasResults ? "page-top" : ""}`}>
      <div className="card">
        <header className="header">
          <h1 className="title">GitHub Repositories — Search</h1>
          <span className="muted">Axios • AG Grid • TypeScript</span>
        </header>

        {/* Вспомогательная строка, чтобы видеть состояние */}
        <p className="muted" style={{ marginTop: 8 }}>
          Status: <code>{status}</code>, repositories:{" "}
          <code>{repos.length}</code>
        </p>

        <div className="form" style={{ marginTop: 12 }}>
          <input
            className="input"
            type="text"
            placeholder="Type keyword, e.g. react, vite, spring..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn"
            type="button"
            onClick={handleSearch}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Fetching…" : "Fetch"}
          </button>
        </div>

        {status === "loading" && <div className="status muted">Loading…</div>}
        {status === "error" && <div className="error">{error}</div>}

        {status === "success" && repos.length === 0 && (
          <div className="empty">No repositories found.</div>
        )}

        {repos.length > 0 && (
          <div className="table-wrap">
            <div
              className="ag-theme-material dark-grid"
              style={{
                width: "100%",
                height: 520,
                borderRadius: "12px",
                marginTop: "16px",
              }}
            >
              <AgGridReact
                rowData={repos}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={10}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
