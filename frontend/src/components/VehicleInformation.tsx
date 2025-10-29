import vehicleLogo from '../assets/fiat-mobi-easy.webp'
import UserIconSvg from '@/components/svg-components/UserIconSvg'
import { CarIconSvg } from '@/components/svg-components/CarIconSvg'

interface VehicleInformationProps {
  makeAndModel: string
  transmissionType: string
  pricePerDay: number
  warrantyCost: number
}

const VehicleInformation: React.FC<VehicleInformationProps> = ({
  makeAndModel,
  transmissionType,
  pricePerDay,
  warrantyCost
}) => {
  return (
    <div className="flex w-full items-center rounded-md border py-4 shadow-md">
      <div className="w-[60%]">
        <img src={vehicleLogo} alt="Logo del vehículo" className="w-72" />
      </div>
      <div className="flex w-full">
        <div className="w-1/2">
          <h4 className="text-3xl font-bold">{makeAndModel}</h4>
          <div className="mt-2 flex gap-2">
            <div className="flex items-center justify-around gap-2 rounded-xs bg-gray-100 px-1">
              <div className="w-4 stroke-gray-900">
                <UserIconSvg />
              </div>
              <p className="text-base font-bold text-gray-900">5</p>
            </div>
            <div className="flex items-center justify-around gap-2 rounded-xs bg-gray-100 stroke-white px-1">
              <div className="w-4">
                <CarIconSvg />
              </div>
              <p className="text-base font-bold text-gray-900">
                {transmissionType}
              </p>
            </div>
          </div>
          <p className="mt-2 text-xl font-bold">Kilometraje Limitado</p>
          <p className="mt-2 text-xl">{`Garantia: $ ${warrantyCost}`}</p>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center">
          <p className="font-bold text-gray-900">Costo de alquiler por día</p>
          <p className="text-2xl text-gray-900">
            ARS <b className="font-bold">{`$${pricePerDay}`}</b>
          </p>
        </div>
      </div>
    </div>
  )
}

export default VehicleInformation
