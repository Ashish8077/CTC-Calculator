import { useCtc } from "../../store/ctcContext"
import DownloadActions from "./DownloadActions"
import NetSalary from "./NetSalary"
import SalaryBreakDown from "./SalaryBreakDown"



const CTCReportCard = () => {

  const { ctc } = useCtc()



  return (
    <div className={`w-full max-w-[600px] m-auto  px-2 sm:px-4 mt-5 lg:mt-0 lg:w-1/2`} >
      {ctc > 0 && <div className={` bg-gray-100 rounded-md p-4 sm:p-6 flex flex-col gap-4 shadow-sm`}>
        <h1 className='text-lg sm:text-xl font-semibold'>Salary Breakdown under New Tax Regime (2025-2026)</h1>
        <NetSalary />
        <SalaryBreakDown />
      </div>}

      <DownloadActions />
    </div>
  )
}

export default CTCReportCard