import type { JSX } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'

const HomePage = (): JSX.Element => {
  return (
    <main className="w-full px-16">
      <div className="mt-40 flex h-full w-full flex-col items-center justify-center">
        <div className="w-4/5">
          <h1 className="mb-4 text-6xl font-bold text-white">
            Alquiler de autos en Argentina
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
      </div>
    </main>
  )
}

export default HomePage
