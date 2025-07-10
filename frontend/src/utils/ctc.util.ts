import type { SalaryData, TaxDetails } from "../types/salary";
import ExcelJS from "exceljs"
import {saveAs} from "file-saver"

export  function formatPriceInINR(amount: number | string): string | number {
  if (typeof amount !== 'number') return amount;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount)
}


// export const formattedPrice = (value: number | string | null | undefined): string => {
//   const numericValue = Number(value);

//   if (isNaN(numericValue) || value === null || value === undefined) {
//     return '0';
//   }

//   return numericValue.toLocaleString('en-IN', {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });
// };



export function formattedPrice(value:number){
  if (typeof value === 'undefined' || value === null || isNaN(Number(value))) return '0';
  return Intl.NumberFormat("en-IN", {maximumFractionDigits:0}).format(value)
}

export function getValue(value: string | number): number {
  return typeof value === "number" ? value : 0
}

export function salaryBreakoutWarning({ basicSalary, hra, da, lta, specialAllowance, performanceBonus }: SalaryData,): number {
  const total = getValue(basicSalary) + getValue(hra) + getValue(da) + getValue(lta) + getValue(specialAllowance) + getValue(performanceBonus)
  return total
}


export function calculateEPF(value: number): number {
  return value * 0.12
}

export function calculateESI(value: number, type: string, isMonthly:boolean): { label: string | number, color: string } {
  if (isMonthly) {
    if (value <= 42000) {
      if (type === "employee") {
        return { label: -value * 0.0175, color: "text-red-500" }
      } else if (type === "employer") {
        return { label: value * 0.0325, color: "text-red-500" }
      }
    } else {
      return { label: "Not Applicable", color: "text-gray-500" };
    }
  } else {
    if (value <= 504000) {
      if (type === "employee") {
        return { label: -value * 0.0175, color: "text-red-500" }
      } else if (type === "employer") {
        return { label: value * 0.0325, color: "text-red-500" }
      }
    }
  }

  return { label: "Not Applicable", color: "text-gray-500" };

}


export function getComponentAmount(value: number, ctc:number) {
  return  ctc * (value/100)
}



export const calculateIncomeTax = (annualIncome: number): TaxDetails => { 
  const taxSlabs = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400001, max: 800000, rate: 5 },
  { min: 800001, max: 1200000, rate: 10 },
  { min: 1200001, max: 1600000, rate: 15 },
  { min: 1600001, max: 2000000, rate: 20 },
  { min: 2000001, max: 2400000, rate: 25 },
  { min: 2400001, max: Infinity, rate: 30 }
  ];
 
  let totalTax = 0;
  let marginalR=0;
 
 
 
 
  
  for (const slab of taxSlabs) {
  if (annualIncome > slab.min - 1) {
  const taxableInThisSlab = Math.min(annualIncome, slab.max) - (slab.min - 1);
  const taxForThisSlab = (taxableInThisSlab * slab.rate) / 100;
  
  if (taxableInThisSlab > 0) {
  totalTax += taxForThisSlab;
  }
  }
  }
  if(annualIncome>1200000 && annualIncome<1275000){
  marginalR=annualIncome-1200000;
  if(totalTax>marginalR){
  marginalR= totalTax-marginalR
  }
  }
  let cessTax = (totalTax - marginalR)*0.04;
  const incomeTax = totalTax - marginalR + cessTax
  return {
  totalTax, 
  margin: marginalR,
  cess: cessTax,
  incomeTax: incomeTax,
  };
 };


 
export const exportToExcel = async ({
  earnings,
  deductions,
  grossSalary,
  totalDeductions,
  netMonthlySalary,
  totalCTC,
  totalIncomeTax,
  ctcPeriod,
  netSalaryLabel,
  baseTax,
  marginalRelief,
  cessTax
}: {
  earnings: { component: string; amount: number }[];
  deductions: { component: string; amount: number }[];
  grossSalary: number;
  totalDeductions: number;
  netMonthlySalary: number;
  totalCTC:number;
  totalIncomeTax:number;
  ctcPeriod:string,
  netSalaryLabel:string,
  baseTax:number,
  marginalRelief:number,
  cessTax:number,
}) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('CTC Breakdown');

  let rowIndex = 1;

 
  // Row 1: Main Title
  worksheet.mergeCells('A1:B1');
  worksheet.getCell('A1').value = 'CTC CALCULATOR - SALARY BREAKDOWN';
  worksheet.getCell('A1').font = { bold: true, size: 14 };
  worksheet.getCell('A1').alignment = { horizontal: 'center' };
  rowIndex++;

   // Row 2: Total  CTC
  worksheet.mergeCells(`A${rowIndex}:B${rowIndex}`);
  worksheet.getCell(`A${rowIndex}`).value = `Total CTC: ₹${formattedPrice(totalCTC)} ${ctcPeriod}`;
  worksheet.getCell(`A${rowIndex}`).font = { bold: true, size: 12 };
  worksheet.getCell(`A${rowIndex}`).alignment = { horizontal: 'center' };
  rowIndex++;
  rowIndex++;
  
 //Row 3
  worksheet.getCell(`A${rowIndex}`).value = 'Earnings';
  worksheet.getCell(`A${rowIndex}`).font = { bold: true };
  rowIndex++;

  ////Row 4 
  worksheet.getCell(`A${rowIndex}`).value = 'Component';
  worksheet.getCell(`B${rowIndex}`).value = 'Amount';
  worksheet.getRow(rowIndex).font = { bold: true };
  rowIndex++;
 
  //Row 5 : earnings array
  earnings.forEach((item) => {
    worksheet.getCell(`A${rowIndex}`).value = item.component;
    worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(item.amount)}`;
    rowIndex++;
  });

  //Row 6 : gross salary
  worksheet.getCell(`A${rowIndex}`).value = 'Gross Salary';
  worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(grossSalary)}`;
  worksheet.getRow(rowIndex).font = { bold: true };
  rowIndex++;
  rowIndex++

  // Deductions Section
  worksheet.getCell(`A${rowIndex}`).value = 'Deductions';
  worksheet.getCell(`A${rowIndex}`).font = { bold: true };
  rowIndex++;

  deductions.forEach((item) => {
    worksheet.getCell(`A${rowIndex}`).value = item.component;
    worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(item.amount)}`;
    rowIndex++;
  });


  if(totalIncomeTax > 0){
    rowIndex++; // Add a blank line
  }

  if(totalIncomeTax > 0){
    worksheet.getCell(`A${rowIndex}`).value = "Total Income Tax BreakDown"
    worksheet.getCell(`A${rowIndex}`).font = { bold: true };
    rowIndex++;
  }

  worksheet.getCell(`A${rowIndex}`).value = "Total IncomeTax"
  worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(totalIncomeTax)}`;
  rowIndex++;

  if(baseTax > 0){
    worksheet.getCell(`A${rowIndex}`).value = "Base Tax"
    worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(baseTax)}`;
    rowIndex++;
  }

  if (marginalRelief > 0) {
    worksheet.getCell(`A${rowIndex}`).value = "Marginal Relief";
    worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(marginalRelief)}`;
    rowIndex++;
  }

  if(cessTax > 0){
    worksheet.getCell(`A${rowIndex}`).value = "Health & Education Cess"
    worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(cessTax)}`;
  }


  rowIndex++;
  rowIndex++


  worksheet.getCell(`A${rowIndex}`).value = 'SUMMARY';
  worksheet.getCell(`A${rowIndex}`).font = { bold: true, size: 12 };
  rowIndex++;

  worksheet.getCell(`A${rowIndex}`).value = 'Total Deductions';
  worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(totalDeductions)}`;
  rowIndex++;

  worksheet.getCell(`A${rowIndex}`).value = `${netSalaryLabel}`;
  worksheet.getCell(`B${rowIndex}`).value = `₹${formattedPrice(netMonthlySalary)}`
  rowIndex++;

  //  Auto-width
  worksheet.columns.forEach((column) => {
    let maxLength = 10;
    column.eachCell?.({ includeEmpty: true }, (cell) => {
      const val = cell.value ? cell.value.toString() : '';
      maxLength = Math.max(maxLength, val.length);
    });
    column.width = maxLength + 2;
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });

  saveAs(blob, 'CTC_Salary_Breakdown.xlsx');
};

export function professionalTax(value: number, isMonthly:boolean): { label: string | number, color: string } {
  if (isMonthly) {
    if (value <= 21000) {
      return { label: "Not Applicable", color: "text-gray-500" };
    } else if (value > 21000 && value <= 30000) {
      return { label: -100, color: "text-red-600" };
    } else {
      return { label: -200, color: "text-red-600" };
    }
  } else {
    if (value <= 252012) {
      return { label: "Not Applicable", color: "text-gray-500" };
    } else if (value > 252012 && value <= 360012) {
      return { label: -1200, color: "text-red-600" };
    } else {
      return { label: -2400, color: "text-red-600" };
    }
  }

}

export function totalDeduction(epf: number, employeeEsi: number | string, pt: number | string, 
  incomeTax:number):number {
    return (epf -  getValue(employeeEsi) - getValue(pt) + incomeTax)
}