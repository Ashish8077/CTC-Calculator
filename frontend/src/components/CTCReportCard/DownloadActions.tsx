import { type FC } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'


import { Download } from 'lucide-react'
import { useCtc } from '../../store/ctcContext'
import SalaryPDFDocument from '../SalaryPDFDocument/SalaryPDFDocument'
import { exportToExcel } from '../../utils/ctc.util'

const DownloadActions: FC = () => {

  const { ctc, isMonthly, isEpfApplicable, visibility, ctcBreakdownData } = useCtc()

  const ctcPeriod = isMonthly ? "per month" : "per annum"
  const netSalaryLabel = isMonthly ? "Net Monthly Salary" : "Net Annual Salary"
  const basicSalary = ctcBreakdownData?.basicSalary ?? 0
  const hra = ctcBreakdownData?.hra ?? 0
  const da = ctcBreakdownData?.da ?? 0
  const lta = ctcBreakdownData?.lta ?? 0
  const specialAllowance = ctcBreakdownData?.specialAllowance ?? 0
  const performanceBonus = ctcBreakdownData?.performanceBonus ?? 0
  const epf = isEpfApplicable ? ctcBreakdownData?.epf ?? 0 : 0
  const ptTax = ctcBreakdownData?.ptTax ?? { label: 0, color: "text-red-600" }
  const employeeEsi = ctcBreakdownData?.employeeEsi ?? { label: 0, color: "text-red-600" }
  const totalDeductions = ctcBreakdownData?.totalDeductions ?? 0
  const totalIncomeTax = ctcBreakdownData?.tds ?? { totalTax: 0, margin: 0, cess: 0, incomeTax: 0 }

  const tds = isMonthly ? totalIncomeTax.incomeTax / 12 : totalIncomeTax.incomeTax
  const net = isMonthly ? ctcBreakdownData?.netAnnualEquivalent ?? 0 : ctcBreakdownData?.netAnnualSalary ?? 0
  const baseTax = ctcBreakdownData?.baseTax ?? 0
  const marginalRelief = ctcBreakdownData?.marginalRelief ?? 0
  const cessTax = ctcBreakdownData?.halthEducationCessTax ?? 0


  const grossSalary = ctcBreakdownData?.grossSalary ?? 0

  const netSalary = isMonthly ? net / 12 : net

  const professionalT: number = Number(typeof ptTax.label === "number" ? ptTax.label : 0)
  const Esi: number = Number(typeof employeeEsi.label === "number" ? employeeEsi.label : 0)




  const salaryData = {

    basicSalary,
    hra,
    da,
    lta,
    specialAllowance,
    performanceBonus,
    grossSalary,
    epf,
    professionalT,
    Esi,
    tds,
    totalDeductions,
    ctcPeriod,
    netSalaryLabel,
    netSalary,
    baseTax,
    marginalRelief,
    cessTax,
    isMonthly,
    ctc
  };





  return (
    <div className={`flex    mt-10 justify-end gap-2 ${!(visibility) && ctc <= 0 ? "lg:mt-70" : visibility && ctc <= 0 ? "lg:mt-120" : ""} `} >
      <PDFDownloadLink className={` w-[100px]  justify-center min-[400px]:w-auto bg-blue-700  flex items-center text-white font-medium  text-sm p-2 gap-1  rounded-md  cursor-pointer`} document={<SalaryPDFDocument salaryData={salaryData} />} fileName="CTC_Salary_Breakdown.pdf">
        {({ loading }) =>
          loading ? (
            'Preparing PDF...'
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span className='hidden  min-[400px]:block'>Download </span> PDF

            </>
          )
        }
      </PDFDownloadLink>
      <button className={`w-[100px]  justify-center min-[400px]:w-auto bg-green-700  flex items-center text-white font-medium  text-sm p-2 gap-1  rounded-md cursor-pointer`} onClick={() => exportToExcel({
        earnings: [
          { component: 'Basic Salary', amount: salaryData.basicSalary },
          { component: 'House Rent Allowance (HRA)', amount: salaryData.hra },
          { component: 'Dearness Allowance (DA)', amount: salaryData.da },
          { component: 'Leave Travel Allowance (LTA)', amount: salaryData.lta },
          { component: 'Special Allowance', amount: salaryData.specialAllowance },
          { component: 'Performance Bonus', amount: salaryData.performanceBonus },
        ],
        deductions: [
          {
            component: "Employee's Provident Fund", amount: salaryData.epf
          },
          {
            component: "Employee's State Insurance", amount: salaryData.Esi
          },
          { component: "Professional Tax", amount: salaryData.professionalT },
          // { component: 'Income Tax', amount: salaryData.tds }
        ],
        grossSalary: salaryData.grossSalary,
        totalDeductions: salaryData.totalDeductions,
        netMonthlySalary: salaryData.netSalary,
        totalIncomeTax: salaryData.tds,
        totalCTC: salaryData.ctc,
        ctcPeriod: salaryData.ctcPeriod,
        netSalaryLabel: salaryData.netSalaryLabel,
        baseTax: salaryData.baseTax,
        marginalRelief: salaryData.marginalRelief,
        cessTax: salaryData.cessTax,
      })}  > <Download className="w-4 h-4" /> <span className='hidden  min-[400px]:block'>Download </span>Excel</button>
    </div >
  )
}


{/*  */ }

export default DownloadActions