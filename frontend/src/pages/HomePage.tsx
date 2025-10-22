import { useEffect, type JSX } from 'react'
// Date Picker
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import CarouselVehicles from '@/components/CarouselVehicles'
import useVehicle from '@/hooks/useVehicles'

const HomePage = (): JSX.Element => {
  const { vehicles } = useVehicle()

  useEffect(() => {
    if (vehicles?.length === 0) return

    console.log(vehicles)
  }, [vehicles])

  return (
    <main className="h-screen w-full">
      <section className="flex h-[calc(100dvh-120px)] w-full flex-col items-center justify-center bg-[url('./assets/driving-car.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="w-4/5">
          <h1 className="mb-4 text-5xl font-bold text-white">
            Alquiler de autos en Argentina con Sharps
          </h1>
        </div>
        <div className="flex h-32 w-4/5 items-center gap-4 rounded-sm bg-stone-700/40 p-16">
          <Select>
            <SelectTrigger className="cursor-pointer bg-white">
              <SelectValue placeholder="Seleccione lugar de entrega" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bahia-blanca" className="cursor-pointer">
                Bahía blanca
              </SelectItem>
            </SelectContent>
          </Select>

          <DatePicker placeholder="Fecha de retiro" />
          <DatePicker placeholder="Fecha de devolución" />

          <input
            type="text"
            placeholder="Código de descuento"
            className="h-9 rounded-sm bg-white pl-2"
          />

          <Button className="cursor-pointer bg-white text-black/40 transition-colors duration-300 ease-in-out hover:bg-stone-300">
            Continuar
          </Button>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center bg-amber-600 pb-24">
        {vehicles === null || vehicles.length === 0 ? (
          <div className="mt-4 flex h-52 w-1/3 items-center justify-center rounded-md bg-amber-800/80">
            <p className="text-3xl text-white">No hay vehículos disponibles</p>
          </div>
        ) : (
          <>
            <h2 className="my-4 text-5xl text-white">
              Nuestra flota de alquiler de vehículos
            </h2>
            <CarouselVehicles vehicles={vehicles} />
          </>
        )}
      </section>
    </main>
  )
}

export default HomePage
