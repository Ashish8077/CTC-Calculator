import type { SalaryKey } from "../../types/salary"
import { useCtc } from "../../store/ctcContext"





const Component = ({ label, name }: { label: string, name: SalaryKey }) => {


  const { salaryBreakout, setSalaryBreakout, isPercentage, ctc } = useCtc()







  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    const numberValue = Number(value)


    if (value === "") {
      setSalaryBreakout(prev => ({
        ...prev,
        [name]: "",
      }));
      return;
    }

    if (isNaN(numberValue)) {
      return;
    }

    if (isPercentage) {
      setSalaryBreakout(prev => ({
        ...prev,
        [name]: numberValue,
      }));
    } else {
      const percentage = (numberValue / ctc) * 100;
      if (percentage === Infinity) return
      setSalaryBreakout(prev => ({
        ...prev,
        [name]: Math.round(percentage),
      }));
    }
  }



  return (
    <div className='flex justify-between'>
      <span className='text-sm'>{label}</span>
      <input type="text" className='w-[50%] rounded-2xl shadow-md' name={name} placeholder='%' value={isPercentage ? salaryBreakout[name] : Math.round(ctc <= 0 ? 0 : ctc * (salaryBreakout[name] / 100))} onChange={handleInputChange}
      />
    </div>
  )
}

export default Component