import ComponentsTitle from "./ComponentsTitle"
import { salaryFields, states } from "../../data/data"
import InputMode from "./InputMode"
import Select from "../Select"

import Component from "./Component"
import type { ChangeEvent } from "react"
import { formattedPrice, salaryBreakoutWarning } from "../../utils/ctc.util"
import { useCtc } from "../../store/ctcContext"


const AdvancedSalarySettings = () => {

  const { ctc, visibility, setVisibility, isEpfApplicable, setEpfApplicable, isPtApplicable, setPtApplicable, salaryBreakout, isPercentage } = useCtc()


  const handleEpfApplicableChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEpfApplicable(e.target.checked)
  }

  const handlePtApplicableChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPtApplicable(e.target.checked)
  }


  const breakOutTotal = isPercentage ? salaryBreakoutWarning(salaryBreakout) : Math.round((ctc * (salaryBreakout.basicSalary / 100)) + (ctc * (salaryBreakout.hra / 100)) + (ctc * (salaryBreakout.da / 100)) + (ctc * (salaryBreakout.lta / 100)) + (ctc * (salaryBreakout.specialAllowance / 100)) + (ctc * (salaryBreakout.performanceBonus / 100)))


  return (
    <>
      <div className='flex justify-between my-4'>
        <span className="text-base sm:text-lg font-medium">Advanced Settings</span>
        <button className='text-blue-500 text-sm sm:text-base cursor-pointer flex items-center' onClick={() => setVisibility(prev => !prev)} > {visibility ? "Hide" : "Show"} </button>
      </div>


      {
        visibility && <div className={` h-[250px] overflow-y-auto w-full`}>
          <div className={`flex flex-col gap-4 sm:gap-5 w-full max-w-[600px]`}>
            <ComponentsTitle breakOutTotal={breakOutTotal} />
            <InputMode />
            {salaryFields.map(({ label, name }) => (
              <Component key={label} label={label} name={name} />
            ))}





            {isPercentage ? !(breakOutTotal === 100) && < p className="text-sm text-red-500">Total percentage should be 100%. Current total: {breakOutTotal}%</p> : (breakOutTotal > ctc) && < p className="text-sm text-red-500"> Total amount cannot exceed monthly CTC of {formattedPrice(ctc)}</p>}

            <div className='flex items-center gap-2'>
              <input type="checkbox" id="epfApplicabe" checked={isEpfApplicable} onChange={handleEpfApplicableChange} />
              <label htmlFor="epfApplicabe text-sm" className="text-sm">EPF Applicable</label>
            </div>
            <div className='flex items-center gap-2'>
              <input type="checkbox" id="ptApplicabe" checked={isPtApplicable} onChange={handlePtApplicableChange} />
              <label htmlFor="ptApplicabe" className="text-sm">Professional Tax Applicable</label>
            </div>

            <div>
              <Select className="w-full text-sm" options={states} />
            </div>
          </div>
        </div >
      }



    </>

  )
}

export default AdvancedSalarySettings