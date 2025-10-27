import useVehicle from '@/hooks/useVehicles'

import { type JSX } from 'react'

import CarouselVehicles from '@/components/CarouselVehicles'
import HomePageFormReservation from '@/components/HomePageFormReservation'

const HomePage = (): JSX.Element => {
  const { vehicles } = useVehicle()

  return (
    <>
      <section className="flex h-[calc(100dvh-120px)] w-full flex-col items-center justify-center bg-[url('./assets/driving-car.jpg')] bg-cover bg-center bg-no-repeat">
        <HomePageFormReservation />
      </section>
      <section className="flex flex-col items-center justify-between gap-6 bg-amber-600 pt-6 pb-16">
        {vehicles === null || vehicles.length === 0 ? (
          <div className="mt-4 flex h-52 w-1/3 items-center justify-center rounded-md bg-amber-800/80">
            <p className="text-3xl text-white">No hay vehículos disponibles</p>
          </div>
        ) : (
          <>
            <h2 className="text-5xl text-white">
              Nuestra flota de alquiler de vehículos
            </h2>
            <CarouselVehicles vehicles={vehicles} />
          </>
        )}
      </section>
    </>
  )
}

export default HomePage
