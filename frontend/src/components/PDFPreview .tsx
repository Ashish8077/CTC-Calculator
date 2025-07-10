import { PDFViewer } from "@react-pdf/renderer";
import SalaryPDFDocument from "./SalaryPDFDocument/SalaryPDFDocument";
import { useCtc } from "../store/ctcContext";


const PDFPreview = () => {
  const { ctc,  isMonthly, isEpfApplicable, ctcBreakdownData } = useCtc()

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
  const baseTax = isMonthly ? totalIncomeTax.totalTax / 12 : totalIncomeTax.totalTax
  const marginalRelief = isMonthly ? totalIncomeTax.margin / 12 : totalIncomeTax.margin
  const cessTax = isMonthly ? totalIncomeTax.cess / 12 : totalIncomeTax.cess






  const net = isMonthly ? ctcBreakdownData?.netAnnualEquivalent ?? 0 : ctcBreakdownData?.netAnnualSalary ?? 0
  const netSalary = isMonthly ? net === 0 ? net : net / 12 : net === 0 ? net : net

  const professionalT: number = Number(typeof ptTax.label === "number" ? ptTax.label.toString().replace("-", "") : 0)
  const Esi: number = Number(typeof employeeEsi.label === "number" ? employeeEsi.label.toString().replace
    ("-", "") : 0)
  const grossSalary = ctcBreakdownData?.grossSalary ?? 0


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

  // 
  return (
    <div style={{ height: '100vh' }}>
      <PDFViewer width="100%" height="100%">
        <SalaryPDFDocument salaryData={salaryData} />
      </PDFViewer>
    </div>
  );
};

export default PDFPreview;
