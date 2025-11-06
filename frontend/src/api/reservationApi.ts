import type {
  GetReservationResponse,
  IReservation,
  ReservationResponse
} from '@/types/types'
import httpClient from './httpClient'

export const makeReservation = (
  token: string,
  reservation: IReservation
): Promise<ReservationResponse> =>
  httpClient('/reservations', { method: 'POST', body: { token, reservation } })

export const getReservations = (): Promise<GetReservationResponse> =>
  httpClient('/reservations', { method: 'GET' })
