export default function Notice({ show, children }) {
  if (!show) return null;
  return <div className="notice">{children}</div>;
}
