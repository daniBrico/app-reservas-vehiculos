import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'

const TimeSelect: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState('')

  // Genera horarios desde 16:00 hasta 21:30 en intervalos de 15 minutos
  const times: string[] = []
  for (let h = 16; h <= 21; h++) {
    for (const m of [0, 15, 30, 45]) {
      if (h === 21 && m > 30) break

      const hour = h.toString().padStart(2, '0')
      const minute = m.toString().padStart(2, '0')
      times.push(`${hour}:${minute}`)
    }
  }

  return (
    <Select value={selectedTime} onValueChange={setSelectedTime}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {times.map((time) => (
          <SelectItem key={time} value={time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TimeSelect
