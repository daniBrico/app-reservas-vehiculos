import { useState } from 'react'

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
import CancelMarkSvg from '@/components/svg-components/CancelMarkSvg'
// import { format } from 'date-fns'

// interface HomePageFormReservationProps {}

const HomePageFormReservation: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [pickupDate, setPickupDate] = useState<Date | undefined>()
  const [returnDate, setReturnDate] = useState<Date | undefined>()
  const [discountCode, setDiscountCode] = useState('')

  const handleClearSelect = (): void => setSelectedCity('')

  const handleDiscountCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.toUpperCase()

    // Acepta letras y números, hasta 10 caracteres
    if (!/^[A-Z0-9]{0,6}$/.test(value)) return

    setDiscountCode(value)
  }

  return (
    <>
      <div className="w-4/5">
        <h1 className="mb-4 text-5xl font-bold text-white">
          Alquiler de autos en Argentina con Sharps
        </h1>
      </div>
      <div className="flex h-32 w-4/5 items-center gap-4 rounded-sm bg-stone-700/40 p-16">
        <div className="relative">
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="w-64 cursor-pointer bg-white">
              <SelectValue placeholder="Seleccione lugar de entrega" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bahia-blanca" className="cursor-pointer">
                Bahía blanca
              </SelectItem>
            </SelectContent>
          </Select>
          {selectedCity !== '' && (
            <button
              className="absolute top-0 right-full z-1000 mt-0.5 mr-2 w-8 cursor-pointer rounded-full bg-white stroke-black/20 transition-all duration-300 ease-in-out hover:scale-110 hover:rotate-180 hover:bg-gray-400 hover:stroke-white"
              onClick={handleClearSelect}
            >
              <CancelMarkSvg />
            </button>
          )}
        </div>

        <DatePicker
          placeholder="Fecha de retiro"
          onDateChange={setPickupDate}
          disabled={{ before: new Date() }}
        />
        <DatePicker
          placeholder="Fecha de devolución"
          onDateChange={setReturnDate}
          disabled={{ before: new Date() }}
        />

        <input
          type="text"
          placeholder="Código de descuento"
          className="h-9 rounded-sm bg-white pl-2"
          onChange={handleDiscountCodeChange}
          value={discountCode}
        />

        <Button
          disabled={selectedCity === ''}
          className="cursor-pointer bg-white text-black/40 transition-colors duration-300 ease-in-out hover:bg-stone-300"
        >
          Continuar
        </Button>
      </div>
    </>
  )
}

export default HomePageFormReservation
