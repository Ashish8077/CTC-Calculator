export function getComponentAmount(ctc, value) {
  return ctc * (value / 100);
}
export function calculateEPF(value, isEpfApplicable) {
  return isEpfApplicable ? value * 0.12 : 0;
}

export function calculateESI(value, type, isMonthly) {
  if (isMonthly) {
    if (value <= 42000) {
      if (type === "employee") {
        return { label: value * 0.0175, color: "text-red-500" };
      } else if (type === "employer") {
        return { label: value * 0.0325, color: "text-red-500" };
      }
    } else {
      return { label: "Not Applicable", color: "text-gray-500" };
    }
  } else {
    if (value <= 504000) {
      if (type === "employee") {
        return { label: value * 0.0175, color: "text-red-500" };
      } else if (type === "employer") {
        return { label: value * 0.0325, color: "text-red-500" };
      }
    }
  }

  return { label: "Not Applicable", color: "text-gray-500" };
}

export function professionalTax(value, isMonthly, isPtApplicable) {
  if (!isPtApplicable) {
    return { label: "Not Applicable", color: "text-gray-500" };
  }
  if (isMonthly) {
    if (value <= 21000) {
      return { label: "Not Applicable", color: "text-gray-500" };
    } else if (value > 21000 && value <= 30000) {
      return { label: 100, color: "text-red-600" };
    } else {
      return { label: 200, color: "text-red-600" };
    }
  } else {
    if (value <= 252012) {
      return { label: "Not Applicable", color: "text-gray-500" };
    } else if (value > 252012 && value <= 360012) {
      return { label: 1200, color: "text-red-600" };
    } else {
      return { label: 2400, color: "text-red-600" };
    }
  }
}

export const calculateIncomeTax = (annualIncome) => {
  const taxSlabs = [
    { min: 0, max: 400000, rate: 0 },
    { min: 400001, max: 800000, rate: 5 },
    { min: 800001, max: 1200000, rate: 10 },
    { min: 1200001, max: 1600000, rate: 15 },
    { min: 1600001, max: 2000000, rate: 20 },
    { min: 2000001, max: 2400000, rate: 25 },
    { min: 2400001, max: Infinity, rate: 30 },
  ];

  let totalTax = 0;
  let marginalR = 0;

  for (const slab of taxSlabs) {
    if (annualIncome > slab.min - 1) {
      const taxableInThisSlab =
        Math.min(annualIncome, slab.max) - (slab.min - 1);
      const taxForThisSlab = (taxableInThisSlab * slab.rate) / 100;

      if (taxableInThisSlab > 0) {
        totalTax += taxForThisSlab;
      }
    }
  }
  if (annualIncome > 1200000 && annualIncome < 1275000) {
    marginalR = annualIncome - 1200000;
    if (totalTax > marginalR) {
      marginalR = totalTax - marginalR;
    }
  }
  let cessTax = (totalTax - marginalR) * 0.04;
  const incomeTax = totalTax - marginalR + cessTax;
  return {
    totalTax,
    margin: marginalR,
    cess: cessTax,
    incomeTax: incomeTax,
  };
};

export function getValue(value) {
  return typeof value === "number" ? value : 0;
}

export function totalDeduction(epf, employeeEsi, pt, incomeTax) {
  return epf + getValue(employeeEsi) + getValue(pt) + incomeTax;
}

export function calcaluteCTCBreakdown(
  ctc,
  variablePay,
  isEpfApplicable,
  isPtApplicable,
  salaryBreakout
) {
  const isMonthly = variablePay === "monthly" ? true : false;
  const basicSalary = getComponentAmount(ctc, salaryBreakout.basicSalary);
  const hra = getComponentAmount(ctc, salaryBreakout.hra);
  const da = getComponentAmount(ctc, salaryBreakout.da);
  const lta = getComponentAmount(ctc, salaryBreakout.lta);
  const specialAllowance = getComponentAmount(
    ctc,
    salaryBreakout.specialAllowance
  );
  const performanceBonus = getComponentAmount(
    ctc,
    salaryBreakout.performanceBonus
  );
  const standardDeduction = variablePay === "monthly" ? 6250 : 75000;

  const grossSalary =
    basicSalary + hra + da + lta + specialAllowance + performanceBonus;

  const taxableIncome = grossSalary - standardDeduction;

  const income = isMonthly
    ? grossSalary * 12 - 75000
    : grossSalary - standardDeduction;

  const epf = calculateEPF(basicSalary, isEpfApplicable);

  const employeeEsi = isMonthly
    ? calculateESI(grossSalary, "employee", isMonthly)
    : calculateESI(grossSalary, "employee", isMonthly);



  const employerEsi = isMonthly
    ? calculateESI(grossSalary, "employer", isMonthly)
    : calculateESI(grossSalary, "employer", isMonthly);

  let ptTax = professionalTax(grossSalary, isMonthly, isPtApplicable);

  const tds = calculateIncomeTax(income <= 1200000 ? 0 : income);

  const totalIncomeTax = isMonthly ? tds.incomeTax / 12 : tds.incomeTax;
  const baseTax = isMonthly ? tds.totalTax / 12 : tds.totalTax;
  const marginalRelief = isMonthly ? tds.margin / 12 : tds.margin;
  const halthEducationCessTax = isMonthly ? tds.cess / 12 : tds.cess;

  const totalDeductions = isMonthly
    ? totalDeduction(epf, employeeEsi.label, ptTax.label, tds.incomeTax / 12)
    : totalDeduction(epf, employeeEsi.label, ptTax.label, tds.incomeTax);

  const totalDeductionAnnual = isMonthly
    ? totalDeduction(
        epf * 12,
        typeof employeeEsi.label === "number" ? employeeEsi.label * 12 : 0,
        typeof ptTax.label === "number" ? ptTax.label * 12 : 0,
        tds.incomeTax
      )
    : totalDeduction(epf, employeeEsi.label, ptTax.label, tds.incomeTax);

  const annualCtc = isMonthly ? grossSalary * 12 : grossSalary;
  const netAnnualEquivalent = annualCtc - totalDeductionAnnual;

  const deduction = isMonthly
    ? totalDeduction(
        epf * 12,
        typeof employeeEsi.label === "number" ? employeeEsi.label * 12 : 0,
        typeof ptTax.label === "number" ? ptTax.label * 12 * 12 : 0,
        tds.incomeTax
      )
    : totalDeduction(
        epf,
        typeof employeeEsi.label === "number" ? employeeEsi.label : 0,
        typeof ptTax.label === "number" ? ptTax.label * 12 : 0,
        tds.incomeTax
      );

  const netAnnualSalary = isMonthly
    ? grossSalary * 12 - deduction
    : grossSalary - deduction;

  return {
    basicSalary,
    hra,
    da,
    lta,
    specialAllowance,
    performanceBonus,
    standardDeduction,
    taxableIncome,
    epf,
    employeeEsi,
    employerEsi,
    ptTax,
    totalIncomeTax,
    totalDeductions,
    tds,
    netAnnualEquivalent,
    netAnnualSalary,
    grossSalary,
    baseTax,
    marginalRelief,
    halthEducationCessTax,
  };
}
