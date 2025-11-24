// src/api/carapi.ts
import axios, { AxiosRequestConfig } from 'axios';
import { CarResponse, Car, CarEntry } from '../types';

// helper: собираем конфиг с заголовками
const getAxiosConfig = (): AxiosRequestConfig => {
  const rawToken = sessionStorage.getItem('jwt');

  // подстрахуемся: если нет префикса Bearer — добавим
  const authHeader =
    rawToken && rawToken.startsWith('Bearer ')
      ? rawToken
      : rawToken
      ? `Bearer ${rawToken}`
      : '';

  console.log('Using Authorization header:', authHeader);

  return {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json',
    },
  };
};

export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    getAxiosConfig()
  );
  return response.data._embedded.cars;
};

export const deleteCar = async (link: string): Promise<CarResponse> => {
  const response = await axios.delete(link, getAxiosConfig());
  return response.data;
};

export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    getAxiosConfig()
  );
  return response.data;
};

export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(
    carEntry.url,
    carEntry.car,
    getAxiosConfig()
  );
  return response.data;
};
