import type { IVehicle } from '../types/types'
import httpClient from './httpClient'

export interface Course {
  _id: string
  name: string
  teacher: string
}

export const getVehicles = (): Promise<IVehicle[]> => httpClient('/vehicles')
