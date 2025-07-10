import type { SalaryData, SalaryBreakdownItem } from "../types/salary";

export const salaryFields:{label:string, name: keyof SalaryData }[] = [
  { label: 'Basic Salary', name: 'basicSalary' },
  { label: 'HRA', name: 'hra' },
  { label: 'DA', name: 'da' },
  { label: 'LTA', name: 'lta' },
  { label: 'Special Allowance', name: 'specialAllowance' },
  { label: 'Performance Bonus', name: 'performanceBonus' }
];



export const states = [
  { label: 'Tamil Nadu', value: 'tamilNadu' },
  { label: 'Karnataka', value: 'karnataka' },
  { label: 'Maharashtra', value: 'maharashtra' },
  { label: 'Telangana', value: 'telangana' },
  { label: 'West Bengal', value: 'westBengal' },
  { label: 'Custom', value: 'custom' },
];


export  const salaryBreakdown:SalaryBreakdownItem[] = [
  { label: 'Basic Salary', name:"basicSalary", labelClassName:"", },
  { label: 'HRA', name:"hra" },
  { label: 'DA',  name:"da" },
  { label: 'LTA',  name:"lta" },
  { label: 'Special Allowance',  name:"performanceBonus" },
  { label: 'Performance Bonus',  name:"specialAllowance", className:"border-b border-gray-300 w-full pb-3" }
]


export const  grossSalary:SalaryBreakdownItem[] = [
  {  label: 'Gross Salary', value: 0, labelClassName:"font-medium", deduction:false }, 
  { label: 'Standard Deduction', value: -1, valueClassName:"text-red-600 font-medium", deduction:true, },
  { label: 'Taxable Income (before other deductions)', value: 12, labelClassName: 'text-sm text-gray-600', className:"border-b border-gray-300 w-full pb-3", valueClassName:"text-sm", deduction:false, td:true },
]


export const deductions:SalaryBreakdownItem[] = [
  // {label: 'Deductions',  labelClassName:"text-sm font-medium text-gray-500" },
  { label: 'EPF (Employee)', value: 123, valueClassName:"text-red-600 font-medium", epf:true  },
  { label: 'EPF (Employer)', value: 14, labelClassName: 'text-sm text-gray-400', valueClassName:"text-gray-400", epf:true },
  { label: 'ESI (Employee)', value: 12345, valueClassName:"text-red-600 font-medium", epf:false },
  { label: 'ESI (Employer)', value: 123456, labelClassName: 'text-sm text-gray-400', valueClassName:"text-gray-400" , epf:false  },
  { label: 'Professional Tax', value: 200,  className:"border-b border-gray-300 w-full pb-3", valueClassName:"text-gray-500", pt:true }, 
  {  label: 'Summary',className:"border-b border-gray-300 w-full pb-3", labelClassName:"font-medium text-gray-500 text-sm"  },
  {label:"Summary", labelClassName:"font-medium"},
]

export const summary:SalaryBreakdownItem[] = [
  { label: 'Total Deductions', value: 12345, className:"border-b border-gray-300 w-full pb-3" , valueClassName:"text-red-600" }, 
] 

export const costToCompanyBreakup: SalaryBreakdownItem[] = [
  {  label: 'Cost to Company Breakup', labelClassName:"font-medium text-gray-500 text-sm"  },
  { label: 'Gross Salary', value: 0,  },
  { label: 'Employer EPF Contribution', value: 1000, },
  { label: 'Employer ESI Contribution', value: 488,  }
]
