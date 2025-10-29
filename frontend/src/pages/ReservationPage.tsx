import CustomSelect from '@/components/CustomSelect'
import { DatePicker } from '@/components/DatePicker'
import TimeSelect from '@/components/TimeSelect'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import useVehicles from '@/hooks/useVehicles'
import VehicleInformation from '@/components/VehicleInformation'

const cities = [
  { key: 'bahia-blanca', value: 'Bahía Blanca' },
  { key: 'buenos-aires', value: 'Buenos Aires' },
  { key: 'cordoba', value: 'Córdoba' },
  { key: 'rosario', value: 'Rosario' },
  { key: 'mendoza', value: 'Mendoza' },
  { key: 'neuquen', value: 'Neuquén' },
  { key: 'tucuman', value: 'San Miguel de Tucumán' }
]

const filters = [
  { key: 'passengers', value: 'Cantidad de pasajeros' },
  { key: 'manual-transmission', value: 'Caja manual' },
  { key: 'automatic-transmission', value: 'Caja automática' },
  { key: 'economic-manual', value: 'Económico (TM)' }
]

const MakeReservation: React.FC = () => {
  const [pickupDate, setPickupDate] = useState<Date | undefined>()
  const [returnDate, setReturnDate] = useState<Date | undefined>()
  const [discountCode, setDiscountCode] = useState('')
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

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

  const { vehicles } = useVehicles()

  const handleFilterChange = (key: string): void => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    )
  }

  const filteredVehicles = vehicles?.filter((v) => {
    // Si no hay filtros, mostrar todos
    if (activeFilters.length === 0) return true

    // Caja manual
    if (
      activeFilters.includes('manual-transmission') &&
      v.transmissionType !== 'manual'
    )
      return false

    // Caja automática
    if (
      activeFilters.includes('automatic-transmission') &&
      v.transmissionType !== 'automatic'
    )
      return false

    // Económico (TM): precio menor a cierto valor + transmisión manual
    if (
      activeFilters.includes('economic-manual') &&
      !(v.transmissionType.toLowerCase() === 'manual' && v.pricePerDay <= 65)
    )
      return false

    // Cantidad de pasajeros: autos con más de 4 asientos
    if (activeFilters.includes('passengers') && v.seatingCapacity < 5)
      return false

    return true
  })

  useEffect(() => {
    if (filteredVehicles?.length === 0 && activeFilters.length === 0) return

    console.log('🚀 ~ MakeReservation ~ filteredVehicles: ', filteredVehicles)
    console.log('🚀 ~ MakeReservation ~ activeFilters: ', activeFilters)
  }, [filteredVehicles, activeFilters])

  return (
    <section className="my-10 flex justify-center gap-4 px-16">
      <aside className="flex w-[50%] flex-col gap-4">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="flex w-full flex-col items-center gap-4 rounded-md border border-gray-200 px-4 py-8 shadow-md"
        >
          <CustomSelect
            selectedValue={selectedCity}
            setSelectedValue={setSelectedCity}
            selectItems={cities}
            cssClasess="w-full"
          />
          <DatePicker
            placeholder="Fecha de retiro"
            onDateChange={setPickupDate}
            disabled={{ before: new Date() }}
            cssClasess="w-full text-base"
          />
          <DatePicker
            placeholder="Fecha de devolución"
            onDateChange={setReturnDate}
            disabled={{ before: new Date() }}
            cssClasess="w-full text-base"
          />

          <div className="flex w-full gap-2">
            <TimeSelect />
            <TimeSelect />
          </div>

          <input
            type="text"
            placeholder="Código de descuento"
            className="h-9 w-full rounded-sm border border-gray-200 bg-white pl-2 text-base placeholder:text-base"
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
        <div className="flex flex-col gap-4 rounded-md border border-gray-200 p-4 text-gray-900 shadow-md">
          <h4 className="w-full text-center text-xl font-bold">Categorías</h4>
          <ol className="grid grid-cols-2 gap-2">
            {filters.map((filter) => (
              <li key={filter.key} className="flex gap-2">
                <input
                  type="checkbox"
                  id={filter.key}
                  className="h-5 w-5 cursor-pointer"
                  checked={activeFilters.includes(filter.key)}
                  onChange={() => handleFilterChange(filter.key)}
                />
                <label htmlFor={filter.key}>{filter.value}</label>
              </li>
            ))}
          </ol>
          <div className="h-0.5 border-t" />
          <p>TM: Transmisión Manual</p>
        </div>
      </aside>
      <article className="flex w-full flex-col items-center gap-4 rounded-md border border-gray-200 px-4 py-8 shadow-md">
        {filteredVehicles &&
          filteredVehicles.map((vehicle) => {
            const makeAndModel = `${vehicle.make} ${vehicle.model}`

            return (
              <VehicleInformation
                key={vehicle._id}
                makeAndModel={makeAndModel}
                transmissionType={vehicle.transmissionType}
                pricePerDay={vehicle.pricePerDay}
                warrantyCost={vehicle.warrantyCost}
              />
            )
          })}
      </article>
    </section>
  )
}

export default MakeReservation
