import { formattedPrice } from "../../utils/ctc.util"
import { useCtc } from "../../store/ctcContext"


const ComponentsTitle = ({ breakOutTotal }: { breakOutTotal: number }) => {
  const { isPercentage, ctc } = useCtc()

  return (
    <div className="w-full flex flex-col gap-3">
      <h1 className="text-base sm:text-lg font-medium">Customize Components</h1>

      {isPercentage ? !(breakOutTotal === 100) && < div className="text-sm text-red-500 bg-red-100/75 rounded-sm border border-red-200 p-2 w-full">Total percentage should be 100%. Current total: {breakOutTotal}%</div> : (breakOutTotal > ctc) && < div  className="text-sm text-red-500 bg-red-100/75 rounded-sm border border-red-200 p-2 w-full"> Total amount cannot exceed monthly CTC of :{formattedPrice(ctc)}</div>}

      <div className='flex justify-between '>
        <span className='text-sm  font-medium'>Component</span>
        <span className='text-sm  font-medium'>Percentage</span>
        <span className='text-sm  font-medium'>Amount</span>
      </div>

    </div>

  )
}

export default ComponentsTitle