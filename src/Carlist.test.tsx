import React from 'react';
import { describe, test, expect, vi } from 'vitest';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

// 👇 Мокаем carapi.ts — ПУТЬ относительный к ЭТОМУ файлу (src/Carlist.test.tsx)
vi.mock('./api/carapi', () => ({
  // getCars: используется Carlist-ом для загрузки данных
  getCars: vi.fn(() =>
    Promise.resolve([
      {
        id: 1,
        brand: 'Ford',
        model: 'Focus',
        color: 'Red',
        fuel: 'Diesel',
        modelYear: 2019,
        price: 15000,
      },
    ])
  ),

  // addCar: используется в AddCar.tsx → должен существовать в моке
  addCar: vi.fn(() => Promise.resolve()),

  // updateCar / deleteCar могут использоваться в других компонентах, тоже подстрахуемся
  updateCar: vi.fn(() => Promise.resolve()),
  deleteCar: vi.fn(() => Promise.resolve()),
}));

// ⬇️ МОКАЕМ MUI DataGrid, чтобы не тянуть его CSS и сложную разметку
vi.mock('@mui/x-data-grid', () => ({
  DataGrid: (props: any) => (
    <div data-testid="mock-datagrid">
      DataGrid mock ({props.rows?.length ?? 0} rows)
      {/* Пробрасываем данные в DOM, чтобы их можно было искать в тестах */}
      {props.rows?.map((row: any) => (
        <div key={row.id ?? row._id ?? JSON.stringify(row)}>
          {row.brand} {row.model}
        </div>
      ))}
    </div>
  ),
}));

// Создаём QueryClient для тестов (без retry, чтобы не ждать лишнего)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

// Обёртка, которая будет подавать QueryClient в Carlist
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

import Carlist from './components/Carlist';

describe('Carlist tests', () => {
  test('component renders and shows Loading...', () => {
    render(<Carlist />, { wrapper });

    // На самом первом рендере React Query ещё не успевает получить данные,
    // поэтому наш компонент показывает текст "Loading..."
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('Cars are fetched and shown', async () => {
    render(<Carlist />, { wrapper });

    // Ждём, когда данные "загрузятся" и появится кнопка "New Car"
    await waitFor(() => screen.getByText(/New Car/i));

    // Мы замокали API так, что там есть Ford.
    expect(screen.getByText(/Ford/i)).toBeInTheDocument();
  });

    test('Open new car modal', async () => {
    render(<Carlist />, { wrapper });

    // Ждём, пока появится кнопка "New Car" (данные "загрузились")
    await waitFor(() => screen.getByText(/New Car/i));

    // Кликаем по кнопке "New Car"
    await userEvent.click(screen.getByText(/New Car/i));

    // После клика должна открыться модалка с кнопкой "Save"
    expect(screen.getByText(/Save/i)).toBeInTheDocument();
  });
});
