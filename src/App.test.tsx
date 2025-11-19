import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import App from './App';

describe("App tests", () => {
  test("App component renders", () => {
    render(<App />);
    expect(screen.getByText(/Car Shop/i)).toBeInTheDocument();
  });
});
