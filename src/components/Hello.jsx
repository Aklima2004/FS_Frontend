/**
 * Мини-компонент для демонстрации props.
 * Пример: <Hello user="Aklima" />
 */
export default function Hello({ user = "World" }) {
  return <h2 style={{ marginTop: 8 }}>Hello, {user}!</h2>;
}
