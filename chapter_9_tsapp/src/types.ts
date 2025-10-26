// src/types.ts

// Интерфейс с опциональным полем email
export interface Student {
  id: number;
  name: string;
  email?: string; // необязательное поле
}

// Пример union-типа (или строка, или число)
export type Id = string | number;
