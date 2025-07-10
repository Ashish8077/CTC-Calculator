import { useState, type FC } from 'react'

import { useCtc } from '../../store/ctcContext'
import { formatPriceInINR } from '../../utils/ctc.util'

const SalaryBreakDown: FC = () => {
  const [visible, setvisible] = useState<boolean>(false)

  const { isEpfApplicable, isPtApplicable, ctcBreakdownData, isMonthly } = useCtc()


  const basicSalary = ctcBreakdownData?.basicSalary ?? 0
  const hra = ctcBreakdownData?.hra ?? 0
  const da = ctcBreakdownData?.da ?? 0
  const lta = ctcBreakdownData?.lta ?? 0
  const specialAllowance = ctcBreakdownData?.specialAllowance ?? 0
  const performanceBonus = ctcBreakdownData?.performanceBonus ?? 0
  const standardDeduction = ctcBreakdownData?.standardDeduction ?? 0
  const taxableIncome = ctcBreakdownData?.taxableIncome ?? 0
  const epf = ctcBreakdownData?.epf ?? 0
  const ptTax = ctcBreakdownData?.ptTax ?? { label: 0, color: "text-red-600" }
  const employeeEsi = ctcBreakdownData?.employeeEsi ?? { label: 0, color: "text-red-600" }
  const employerEsi = ctcBreakdownData?.employerEsi ?? { label: 0, color: "text-red-600" }
  const totalDeductions = ctcBreakdownData?.totalDeductions ?? 0
  const tds = ctcBreakdownData?.tds ?? { totalTax: 0, margin: 0, cess: 0, incomeTax: 0 }
  const grossSalary = ctcBreakdownData?.grossSalary ?? 0





  return (
    <>

      <div className='flex flex-col gap-4'>
        <h6 className='text-sm text-gray-700 font-medium'>Earnings</h6>
        <div className='flex flex-col gap-1 border-b border-gray-300 pb-2'>
          <div className='flex justify-between max-[400px]:text-sm flex-col  min-[400px]:flex-row '>
            <span className='text-gray-500'>Basic Salary</span>
            <span className='font-medium'>{formatPriceInINR(basicSalary)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'  >HRA</span>
            <span className='font-medium'>{formatPriceInINR(hra)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>DA</span>
            <span className='font-medium'>{formatPriceInINR(da)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>LTA</span>
            <span className='font-medium'>{formatPriceInINR(lta)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>Special Allowance</span>
            <span className='font-medium'>{formatPriceInINR(specialAllowance)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>Performance Bonus</span>
            <span className='font-medium'>{formatPriceInINR(performanceBonus)}</span>
          </div>
        </div>
        <div className='flex flex-col gap-1 border-b border-gray-300 pb-2'>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='font-medium'>Gross Salary</span>
            <span className='font-medium'>{formatPriceInINR(grossSalary)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>Standard Deduction</span>
            <span className='font-medium text-red-600'>-{formatPriceInINR(standardDeduction)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-sm text-gray-500'>Taxable Income (before other deductions)</span>
            <span className='font-medium'>{formatPriceInINR(taxableIncome)}</span>
          </div>
        </div>
        <div className='flex flex-col gap-1 border-b border-gray-300 pb-2'>
          <h6 className='text-sm text-gray-700 font-medium  '>Deductions</h6>
          <div>
            <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
              <span className='text-gray-500'>EPF (Employee)</span>
              <span className={`font-medium  ${isEpfApplicable ? "text-red-600" : "text-gray-500"}`}>{isEpfApplicable ? `-${formatPriceInINR(epf)}` : "Not Opted"}</span>
            </div>
            {isEpfApplicable && <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
              <span className='text-sm text-gray-500'>EPF (Employee)</span>
              <span className='font-medium '>{formatPriceInINR(epf)}</span>
            </div>}

          </div>
          <div>
            <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
              <span className='text-gray-500'>ESI (Employee)</span>
              <span className={`font-medium ${employeeEsi.color}`}>{typeof employeeEsi.label === "number" ? `-${formatPriceInINR(employeeEsi.label)}` : employeeEsi.label}</span>
            </div>
            {
              employeeEsi.label != "Not Applicable" && <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
                <span className='text-sm text-gray-500'>ESI (Employer)</span>
                <span className={`font-medium`}>{formatPriceInINR(employerEsi.label)}</span>
              </div>
            }


          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>Professional Tax</span>
            <span className={`font-medium ${isPtApplicable && !isNaN(Number(ptTax.label)) ? "text-red-500" : "text-gray-500"
              }`}>{typeof ptTax.label === "number" ? `-${formatPriceInINR(ptTax.label)}` : ptTax.label}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <div>
              <span className='text-gray-500'>Income Tax</span>
              <button className='text-xs ml-2 text-blue-700 cursor-pointer' onClick={() => setvisible(prev => !prev)} >Show Details</button>
            </div>
            <div>
              <span className={`font-medium text-red-500`}>-{isMonthly ? formatPriceInINR(tds.incomeTax / 12) : formatPriceInINR(tds.incomeTax)}</span>
            </div>
          </div>

          <div className={` mt-1 w-[95%] ml-[5%] ${visible ? "block" : "hidden"}`}>
            <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
              <span className='text-gray-500 text-sm'>Base Tax</span>
              <span className={`font-medium text-red-500`}>-{isMonthly ? formatPriceInINR(tds.totalTax / 12) : formatPriceInINR(tds.totalTax)}</span>
            </div>
            {tds.margin > 0 && <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
              <span className='text-gray-500 text-sm'>Marginal Relief</span>
              <span className={`font-medium  text-green-600`}>+{isMonthly ? formatPriceInINR(tds.margin / 12) : formatPriceInINR(tds.margin)}</span>
            </div>}

            <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
              <span className='text-gray-500 text-sm'>Health & Education Cess</span>
              <span className={`font-medium  text-red-500`}>-{isMonthly ? formatPriceInINR(tds.cess / 12) : formatPriceInINR(tds.cess)}</span>
            </div>
          </div>


        </div>
        <div className='flex flex-col gap-1 border-b border-gray-300 pb-2'>
          <h6 className='text-gray-700 font-medium text'>summary</h6>
        </div>
        <div className='flex flex-col gap-1 border-b border-gray-300 pb-2'>
          <p className='font-medium text-lg'>summary</p>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>Total Deductions</span>
            <span className='font-medium text-red-600'>-{formatPriceInINR(totalDeductions)}</span>
          </div>
        </div>
        <div className='flex flex-col gap-1  pb-2'>
          <h6 className='font-medium text-sm text-gray-700'>Cost to Company Breakup</h6>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>Gross Salary</span>
            <span className='font-medium '>{formatPriceInINR(grossSalary)}</span>
          </div>
          <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
            <span className='text-gray-500'>Employer EPF Contribution</span>
            <span className='font-medium'>{formatPriceInINR(epf)}</span>
          </div>
          {
            employeeEsi.label != "Not Applicable" && <div className='flex justify-between max-[400px]:text-sm flex-col min-[400px]:flex-row '>
              <span className='text-gray-500'>Employer ESI Contribution</span>
              <span className='font-medium'>{formatPriceInINR(employerEsi.label)}</span>
            </div>
          }

        </div>
      </div>

    </>
  )
}

export default SalaryBreakDown