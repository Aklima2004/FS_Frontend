import { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function HomePage() {
  const [date, setDate] = useState<Date | null>(new Date());

  const handleChange = (value: Date | Date[] | null) => {
    if (Array.isArray(value)) {
      setDate(value[0] ?? null);
    } else {
      setDate(value);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <header className="header">
          <h1 className="title">Home — Third-Party Components</h1>
          <span className="muted">React Router • DatePicker • AG Grid</span>
        </header>

        <p className="muted">
          This is the main page of the lab for Chapter 11. Here we
          demonstrate the use of third-party components in React.
        </p>

        <ul>
          <li>
            Navigation between pages via <code>react-router-dom</code>.
          </li>
          <li>Searching GitHub repositories using Axios.</li>
          <li>
            Displaying data in a table using <code>AG Grid</code>.
          </li>
          <li>
            Choosing a date via the <code>react-date-picker</code> component.
          </li>
        </ul>

        <div style={{ marginTop: "16px" }}>
          <p>Choose a date:</p>

          <DatePicker
            className="date-picker"
            // важно: тут НЕ типизируем параметр,
            // а просто передаём дальше и приводим тип внутри
            onChange={(value) => handleChange(value as Date | Date[] | null)}
            value={date}
            clearIcon={null}
          />

          <p style={{ marginTop: "12px" }}>
            Selected date:{" "}
            <span className="muted">
              {date ? date.toLocaleDateString() : "дата не выбрана"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
