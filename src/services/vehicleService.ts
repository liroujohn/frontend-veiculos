import { veiculosApi } from "@/lib/axios";
import {
  Vehicle,
  VehicleFilterParams,
  UnsoldCount,
  VehiclesPerDecade,
  VehiclesPerBrand,
  VehicleFormData,
} from "@/types";

export class VehicleService {
  static async findAll(): Promise<Vehicle[]> {
    const response = await veiculosApi.get<Vehicle[]>("/vehicle");
    return response.data;
  }

  static async findByFilter(params: VehicleFilterParams): Promise<Vehicle[]> {
    const response = await veiculosApi.get<Vehicle[]>("/vehicle/filter", {
      params: {
        brand: params.brand,
        sold: params.sold,
        decade: params.decade,
        registeredLastWeek: params.registeredLastWeek,
        page: params.page,
        size: params.size,
      },
    });
    return response.data;
  }

  static async getById(id: number): Promise<Vehicle> {
    const response = await veiculosApi.get<Vehicle>(`/vehicle/${id}`);
    return response.data;
  }

  static async create(data: VehicleFormData): Promise<Vehicle> {
    const response = await veiculosApi.post<Vehicle>("/vehicle", data);
    return response.data;
  }

  static async update(id: number, data: VehicleFormData): Promise<Vehicle> {
    const response = await veiculosApi.put<Vehicle>(`/vehicle/${id}`, data);
    return response.data;
  }

  static async partialUpdate(
    id: number,
    data: Partial<VehicleFormData>
  ): Promise<Vehicle> {
    const response = await veiculosApi.patch<Vehicle>(`/vehicle/${id}`, data);
    return response.data;
  }

  static async delete(id: number): Promise<void> {
    await veiculosApi.delete(`/vehicle/${id}`);
  }

  static async getUnsoldCount(): Promise<UnsoldCount> {
    const response = await veiculosApi.get<UnsoldCount>("/vehicle/unsold-count");
    return response.data;
  }

  static async getDistributionByDecade(): Promise<VehiclesPerDecade[]> {
    const response = await veiculosApi.get<VehiclesPerDecade[]>(
      "/vehicle/distribution-by-decade"
    );
    return response.data;
  }

  static async getDistributionByBrand(): Promise<VehiclesPerBrand[]> {
    const response = await veiculosApi.get<VehiclesPerBrand[]>(
      "/vehicle/distribution-by-brand"
    );
    return response.data;
  }

  static async getRegisteredLastWeek(): Promise<Vehicle[]> {
    const response = await veiculosApi.get<Vehicle[]>(
      "/vehicle/registered-last-week"
    );
    return response.data;
  }
}
