import { useState } from 'react'
import { DatePicker } from '@/components/DatePicker'
import { Button } from '@/components/ui/button'
import CitySelect from './CitySelect'
// import { format } from 'date-fns'

// interface HomePageFormReservationProps {}

const HomePageFormReservation: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [pickupDate, setPickupDate] = useState<Date | undefined>()
  const [returnDate, setReturnDate] = useState<Date | undefined>()
  const [discountCode, setDiscountCode] = useState('')

  const handleDiscountCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.toUpperCase()

    // Acepta letras y números, hasta 10 caracteres
    if (!/^[A-Z0-9]{0,6}$/.test(value)) return

    setDiscountCode(value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    console.log('Se presionó el submit')
  }

  return (
    <>
      <div className="w-4/5">
        <h1 className="mb-4 text-5xl font-bold text-white">
          Alquiler de autos en Argentina con Sharps
        </h1>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex h-32 w-4/5 items-center gap-4 rounded-sm bg-stone-700/40 p-16"
      >
        <CitySelect
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          cssClasess="min-w-56"
        />
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
          type="submit"
          className="cursor-pointer bg-white font-medium text-gray-400 shadow-md shadow-stone-600 transition-colors duration-300 ease-in-out hover:bg-stone-800 hover:text-gray-200 disabled:cursor-not-allowed disabled:bg-white disabled:text-gray-300 disabled:opacity-100 disabled:shadow-none"
        >
          Continuar
        </Button>
      </form>
    </>
  )
}

export default HomePageFormReservation
