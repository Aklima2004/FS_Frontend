// src/App.test.tsx
import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// ⬇️ Мокаем компонент Carlist, чтобы не тянуть MUI DataGrid и его CSS
vi.mock('./components/Carlist', () => ({
  // default-экспорт – простой фейковый компонент
  default: () => <div>Carlist mock</div>,
}));

import App from './App';

describe('App tests', () => {
  test('App component renders header', () => {
    render(<App />);
    // Проверяем, что заголовок отрисовался
    expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
  });
});
