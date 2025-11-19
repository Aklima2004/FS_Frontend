import axios from 'axios';
import { CarResponse, Car, CarEntry } from '../types';

// Получение списка машин
export const getCars = async (): Promise<CarResponse[]> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/cars`
  );
  return response.data._embedded.cars;
};

// Удаление машины по ссылке
export const deleteCar = async (link: string): Promise<void> => {
  await axios.delete(link);
};

// Добавить новую машину
export const addCar = async (car: Car): Promise<CarResponse> => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/cars`,
    car,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

// Обновить существующую машину
export const updateCar = async (carEntry: CarEntry): Promise<CarResponse> => {
  const response = await axios.put(carEntry.url, carEntry.car, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
