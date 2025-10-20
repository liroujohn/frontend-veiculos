import axios from 'axios'

export const veiculosApi = axios.create({
  baseURL: import.meta.env.VITE_API_VEHICLE_URL,
})
