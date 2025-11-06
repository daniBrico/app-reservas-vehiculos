import React from 'react'

interface InputFieldProps {
  label: string
  name: string
  type?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
  disabled?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  className = '',
  disabled = false
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor={name}
        className={`pointer-events-none absolute left-2 text-base text-black/50 transition-all duration-200 ${value ? '-top-6 text-sm' : 'top-2.5 text-base'} `}
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value === 0 ? '' : value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        placeholder=" "
        className={`peer w-full rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none ${className} ${
          disabled ? 'cursor-not-allowed bg-gray-200' : ''
        }`}
      />
    </div>
  )
}

export default InputField
