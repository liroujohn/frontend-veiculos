export interface Vehicle {
  id: number;
  brand: string;
  yearManufacture: number;
  description: string;
  sold: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface VehicleFormData {
  brand: string;
  yearManufacture: number;
  description: string;
  sold: boolean;
}

export interface UnsoldCount {
  unsoldCount: number;
}

export interface VehiclesPerDecade {
  decade: number;
  quantity: number;
}

export interface VehiclesPerBrand {
  brand: string;
  quantity: number;
}

export interface VehicleFilterParams {
  brand?: string;
  sold?: boolean;
  decade?: number;
  registeredLastWeek?: boolean;
  page?: number;
  size?: number;
}

export type PaginatedResponse<T> = {
  items: T[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
};
