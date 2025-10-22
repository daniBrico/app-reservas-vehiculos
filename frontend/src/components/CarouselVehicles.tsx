import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import type { IVehicle } from '@/types/types'
import carImage from '../assets/fiat-mobi-easy.webp'

interface CarouselVehiclesProps {
  vehicles: IVehicle[]
}

const CarouselVehicles: React.FC<CarouselVehiclesProps> = ({ vehicles }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  }

  return (
    <div className="m-auto w-3/4">
      <div>
        <Slider {...settings}>
          {vehicles.map((vehicle) => {
            return (
              <div className="h-72 rounded-md bg-white p-4" key={vehicle._id}>
                <div className="flex flex-col items-center gap-10">
                  <h3 className="text-2xl font-bold">{vehicle.make}</h3>
                  <div className="mt-auto">
                    <img
                      className="mx-auto w-58"
                      src={carImage}
                      alt={vehicle.make}
                    />
                    <p className="h-16 text-center font-light">
                      {vehicle.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

export default CarouselVehicles
