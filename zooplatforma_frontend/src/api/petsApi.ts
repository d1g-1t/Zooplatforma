const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api/v1';

// Вспомогательная функция для запросов
async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// Работа с /pets/
export const getPets = () => fetchData(`${API_BASE_URL}/pets/`);

export const createPet = (data: { name: string; age: number; type: string }) =>
  fetchData(`${API_BASE_URL}/pets/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

// Работа с /pets/{id}/
export const getPetById = (id: number) =>
  fetchData(`${API_BASE_URL}/pets/${id}/`);

export const updatePetById = (
  id: number,
  data: { name: string; age: number; type: string }
) =>
  fetchData(`${API_BASE_URL}/pets/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const patchPetById = (
  id: number,
  data: Partial<{ name: string; age: number; type: string }>
) =>
  fetchData(`${API_BASE_URL}/pets/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

export const deletePetById = (id: number) =>
  fetch(`${API_BASE_URL}/pets/${id}/`, { method: 'DELETE' });

// Работа с /pet-photos/
export const getPetPhotos = () => fetchData(`${API_BASE_URL}/pet-photos/`);

export const createPetPhoto = (data: {
  pet: number;
  photo: string;
  main_photo: boolean;
}) =>
  fetchData(`${API_BASE_URL}/pet-photos/`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

// Работа с /pet-photos/{id}/
export const getPetPhotoById = (id: number) =>
  fetchData(`${API_BASE_URL}/pet-photos/${id}/`);

export const updatePetPhotoById = (
  id: number,
  data: Partial<{ photo: string; main_photo: boolean }>
) =>
  fetchData(`${API_BASE_URL}/pet-photos/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

export const patchPetPhotoById = (
  id: number,
  data: Partial<{ photo: string; main_photo: boolean }>
) =>
  fetchData(`${API_BASE_URL}/pet-photos/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });

export const deletePetPhotoById = (id: number) =>
  fetch(`${API_BASE_URL}/pet-photos/${id}/`, { method: 'DELETE' });
