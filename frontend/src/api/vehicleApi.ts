import type { IVehicle } from '../types/types'
import httpClient from './httpClient'

export const getVehicles = (): Promise<IVehicle[]> => httpClient('/vehicles')
