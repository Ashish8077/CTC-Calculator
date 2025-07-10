export type SalaryData = {
  basicSalary: number
  hra: number
  da: number
  lta: number,
  specialAllowance: number
  performanceBonus: number
}


export type SalaryKey = keyof SalaryData;

export type SalaryBreakdownItem = {
  label: string;
  name?: keyof SalaryData;
  value?: number;
  labelClassName?: string;
  className?: string;
  valueClassName?: string;
  deduction?: boolean;
  td?: boolean;
  epf?: boolean;
  pt?: boolean;
};


export type SalaryComponent = {
  label: string;
  value: number;
};

export type PdfData = {
  earnings: SalaryComponent[],
  deductions: SalaryComponent[],
}



export type ExtendedSalaryData = SalaryData & {
  ctcPeriod: string,
  netSalary: number,
  netSalaryLabel: string,
  grossSalary: number,
  epf: number
  professionalT: number,
  Esi: number,
  tds: number,
  totalDeductions: number,
  baseTax: number,
  marginalRelief: number,
  cessTax: number,
  isMonthly: boolean,
  ctc: number,
}

export interface LabelValue {
  label: string | number;
  color: string;
}

export interface TdsDetails {
  totalTax: number;
  margin: number;
  cess: number;
  incomeTax: number;
}

export interface CtcBreakdown {
  basicSalary: number;
  hra: number;
  da: number;
  lta: number;
  specialAllowance: number;
  performanceBonus: number;
  standardDeduction: number;
  taxableIncome: number;
  epf: number;
  employeeEsi: LabelValue;
  employerEsi: LabelValue;
  ptTax: LabelValue;
  totalIncomeTax: number;
  totalDeductions: number;
  tds: TdsDetails;
  netAnnualEquivalent: number;
  netAnnualSalary: number;
  grossSalary: number;
  baseTax: number,
  marginalRelief: number,
  halthEducationCessTax: number,
}

export interface TaxDetails {
  totalTax: number;
  margin: number;
  cess: number;
  incomeTax: number;
}