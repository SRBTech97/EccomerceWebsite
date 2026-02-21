import { apiGet } from './client';

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Size {
  id: number;
  label: string;
  code: string;
}

export interface Color {
  id: number;
  name: string;
  code: string;
}

export async function fetchBrands(): Promise<Brand[]> {
  return apiGet<Brand[]>('/master-data/brands');
}

export async function fetchCategories(): Promise<Category[]> {
  return apiGet<Category[]>('/master-data/categories');
}

export async function fetchSizes(): Promise<Size[]> {
  return apiGet<Size[]>('/master-data/sizes');
}

export async function fetchColors(): Promise<Color[]> {
  return apiGet<Color[]>('/master-data/colors');
}
