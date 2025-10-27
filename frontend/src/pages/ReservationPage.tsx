import CitySelect from '@/components/CitySelect'
import { DatePicker } from '@/components/DatePicker'
import TimeSelect from '@/components/TimeSelect'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const MakeReservation: React.FC = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>()
  const [returnDate, setReturnDate] = useState<Date | undefined>()
  const [discountCode, setDiscountCode] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    console.log('Se presionó el submit')
  }

  const handleDiscountCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value.toUpperCase()

    // Acepta letras y números, hasta 10 caracteres
    if (!/^[A-Z0-9]{0,6}$/.test(value)) return

    setDiscountCode(value)
  }

  return (
    <section className="mt-12 flex items-center justify-center gap-2 px-16">
      <aside className="w-1/5">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full flex-col items-center gap-4 rounded-md border border-black/10 px-4 py-8"
        >
          <CitySelect
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            cssClasess="w-full"
          />
          <DatePicker
            placeholder="Fecha de retiro"
            onDateChange={setPickupDate}
            disabled={{ before: new Date() }}
            cssClasess="w-full"
          />
          <DatePicker
            placeholder="Fecha de devolución"
            onDateChange={setReturnDate}
            disabled={{ before: new Date() }}
            cssClasess="w-full"
          />

          <div className="flex w-full gap-2">
            <TimeSelect />
            <TimeSelect />
          </div>

          <input
            type="text"
            placeholder="Código de descuento"
            className="h-9 w-full rounded-sm border border-gray-200 bg-white pl-2"
            onChange={handleDiscountCodeChange}
            value={discountCode}
          />

          <Button
            disabled={selectedCity === ''}
            type="submit"
            className="cursor-pointer border border-black/30 bg-white text-gray-400 shadow-md transition-colors duration-300 ease-in-out hover:bg-stone-800 hover:text-white"
          >
            Continuar
          </Button>
        </form>
        {/* <div>filtro de autos</div> */}
      </aside>
      <article className="w-[80%] bg-amber-500">Lista de los vehículos</article>
    </section>
  )
}

export default MakeReservation
