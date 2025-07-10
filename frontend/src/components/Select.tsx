import { type SelectHTMLAttributes, useId, forwardRef } from 'react'

type Option = {
  label: string
  value: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[]
  className?: string
}


const Select = forwardRef<HTMLSelectElement, SelectProps>(({ options, className, ...rest }: SelectProps, ref) => {
  const selectId = useId()
  return (
    <select name="" id={selectId} className={`border border-gray-300 rounded p-2 text-sm outline-none ${className}`} ref={ref} {...rest} >
      {options.map(({ label, value }) => (
        <option value={value} key={value} >{label} </option>
      ))}
    </select>
  )
})

export default Select