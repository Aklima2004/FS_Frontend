export default function AboutPage() {
  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <h1 className="title">About this lab</h1>
        </header>

        <p className="muted">
          This small application is compiled as part of the 11th chapter
          &nbsp;«Useful Third-Party Components for React».
        </p>

        <p>Several third-party libraries are used here:</p>

        <ul>
          <li>
            <b>react-router-dom</b> — navigate between pages (Home, Search,
            About) without restarting the browser.
          </li>
          <li>
            <b>Axios</b> — sending HTTP requests to the GitHub REST API for search
            repositories.
          </li>
          <li>
            <b>AG Grid</b> — powerful component of the table: sorting, filtering,
            pagination of data by repositories.
          </li>
          <li>
            <b>react-date-picker</b> — selecting a date on the main page via
            a convenient calendar.
          </li>
        </ul>

        <p className="muted">
          All these components are installed via <code>npm install</code> and
          they are used as regular React components, which saves time and makes
          the interface is richer.
        </p>
      </div>
    </div>
  );
}
