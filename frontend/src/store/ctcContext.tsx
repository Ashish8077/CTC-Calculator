import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction, useEffect } from "react";
import type { CtcBreakdown, SalaryData } from "../types/salary";





interface ctcContextType {
  ctc: number;
  setCtc: Dispatch<SetStateAction<number>>
  isMonthly: boolean;
  setIsMonthly: Dispatch<SetStateAction<boolean>>
  visibility: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>
  salaryBreakout: SalaryData,
  setSalaryBreakout: Dispatch<SetStateAction<SalaryData>>
  isEpfApplicable: boolean,
  setEpfApplicable: Dispatch<SetStateAction<boolean>>,
  isPtApplicable: boolean,
  setPtApplicable: Dispatch<SetStateAction<boolean>>,
  isPercentage: boolean,
  setIsPercentage: Dispatch<SetStateAction<boolean>>,
  ctcBreakdownData: CtcBreakdown | null
}

const CtcContext = createContext<ctcContextType | null>(null)


export const CtcProvider = ({ children }: { children: ReactNode }) => {
  const [ctc, setCtc] = useState<number>(0)
  const [isMonthly, setIsMonthly] = useState<boolean>(false)
  const [visibility, setVisibility] = useState<boolean>(false)
  const [isEpfApplicable, setEpfApplicable] = useState<boolean>(true)
  const [isPtApplicable, setPtApplicable] = useState<boolean>(true)
  const [isPercentage, setIsPercentage] = useState<boolean>(true)
  const [salaryBreakout, setSalaryBreakout] = useState<SalaryData>({
    basicSalary: 40,
    hra: 20,
    da: 10,
    lta: 5,
    specialAllowance: 15,
    performanceBonus: 10,
  })
  const [ctcBreakdownData, setCTCBreakdownData] = useState(null)

  useEffect(() => {
    async function fetchCTCBreakdown(ctc: number, variablePay: "monthly" | "yearly") {
      const response = await fetch("/api/calculate-ctc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ctc, variablePay, isEpfApplicable, isPtApplicable, salaryBreakout }),
      });

      const data = await response.json();
      if (data.success) {
        return data.data;
      } else {
        throw new Error("Failed to fetch CTC breakdown");
      }
    }
    fetchCTCBreakdown(ctc, isMonthly ? "monthly" : "yearly").then((data) => {
      setCTCBreakdownData(data)
    })
  }, [ctc, isEpfApplicable, isPtApplicable, salaryBreakout])





  return (
    <CtcContext.Provider value={{ ctc, setCtc, isMonthly, setIsMonthly, visibility, setVisibility, salaryBreakout, setSalaryBreakout, isEpfApplicable, setEpfApplicable, isPtApplicable, setPtApplicable, isPercentage, setIsPercentage, ctcBreakdownData }} >
      {children}
    </CtcContext.Provider >
  )
}

export const useCtc = () => {
  const ctx = useContext(CtcContext);
  if (!ctx) throw new Error("useCtc must be used within CtcProvider");
  return ctx;
};