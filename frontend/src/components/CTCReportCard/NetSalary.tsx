import { type FC } from 'react'

import { formatPriceInINR } from '../../utils//ctc.util'
import { useCtc } from '../../store/ctcContext'

const NetSalary: FC = () => {

  const { isMonthly, ctcBreakdownData } = useCtc()

  const netAnnualEquivalent = ctcBreakdownData?.netAnnualEquivalent ?? 0
  const monthlySalary = netAnnualEquivalent === 0 ? 0 : netAnnualEquivalent / 12
  const netAnnualSalary = ctcBreakdownData?.netAnnualSalary ?? 0



  const labels = isMonthly
    ? [{ label: "Net Annual Equivalent", total: formatPriceInINR(netAnnualEquivalent) }, { label: "Net Monthly Salary", total: formatPriceInINR(monthlySalary) }]
    : [{ label: "Net Monthly Equivalent", total: formatPriceInINR(netAnnualSalary / 12) }, { label: "Net Annual Salary", total: formatPriceInINR(netAnnualSalary) }]

  return (
    <div className='bg-white shadow-sm rounded-lg p-3'>
      {labels.map(({ label, total }, i) => (
        <div
          key={label}
          className={`flex justify-between items-center   flex-col gap-1 max-[400px]:text-sm   sm:text-xl lg:flex-row  border-gray-300 ${i === 0 ? "border-b pb-3 mb-3" : "py-2"
            }`}

        >
          <span className='font-medium '>{label}</span>
          <span className='font-bold text-green-600 text-right '>{total}</span>
        </div>
      ))}
    </div>
  )
}




export default NetSalary
