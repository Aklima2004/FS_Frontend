import { useEffect } from "react";

/**
 * Кастомный хук из главы: обновляет заголовок вкладки.
 * Вызывает document.title = title при каждом изменении title.
 */
export default function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
