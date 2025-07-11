import { type ChangeEvent, type FC } from 'react'
import Button from '../Button'
import { useCtc } from '../../store/ctcContext'
import { formattedPrice } from '../../utils/ctc.util'



const CTCInput: FC = () => {
  const { ctc, setCtc, isMonthly, setIsMonthly } = useCtc()

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const numberValue = Number(value.replace(/[^\d]/g, ""))
    setCtc(isNaN(numberValue) ? 0 : numberValue)
  }

  function handleSwitch(monthly: boolean) {

    if (isMonthly !== monthly) {
      if (monthly) {

        setCtc(ctc / 12)
      } else {
        setCtc(ctc * 12)


      }
    }
    setIsMonthly(monthly)
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="text-lg sm:text-xl font-medium">Cost to Company (CTC)</h3>

      <div className="w-full">
        <div className="bg-white px-3 py-2 flex items-center gap-2 shadow-sm rounded">
          <span className="text-lg sm:text-xl text-gray-500">₹</span>
          <input
            className="flex-1 min-w-0 p-2 text-sm sm:text-base outline-none"
            type="text"
            name="ctc"
            value={formattedPrice(ctc)}
            onChange={handleInputChange}
            placeholder=''
          />
          <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">
            {isMonthly ? "monthly" : "yearly"}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Enter your {isMonthly ? "monthly" : "yearly"} Cost to Company (CTC) in Indian Rupees
        </p>
      </div>

      <div className="flex gap-2 w-full">
        <Button
          className={`flex-1 rounded-md p-2 text-sm sm:text-base transition ${isMonthly ? "bg-blue-700 text-white" : "bg-gray-100 text-black"
            }`}
          onClick={() => handleSwitch(true)}
        >
          Monthly
        </Button>
        <Button
          className={`flex-1 rounded-md p-2 text-sm sm:text-base transition ${isMonthly ? "bg-gray-100 text-black" : "bg-blue-700 text-white"
            }`}
          onClick={() => handleSwitch(false)}
        >
          Yearly
        </Button>
      </div>
    </div>

  )
}

export default CTCInput