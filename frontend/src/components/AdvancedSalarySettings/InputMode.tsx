import { type FC } from 'react'
import Button from '../Button'
import { useCtc } from '../../store/ctcContext'


const InputMode: FC = () => {

  const { isPercentage, setIsPercentage } = useCtc()

  function handleSwitch(percentage: boolean) {
    if (isPercentage !== percentage) {
      setIsPercentage(percentage)
    } else {
      setIsPercentage(percentage)
    }
  }


  return (
    <div className='flex gap-x-3 items-center'>
      <span className='text-sm'>Input Mode:</span>
      <div className='flex gap-x-2 '>
        <Button className={`text-sm ${isPercentage ? "bg-blue-500 text-white " : "bg-gray-100 text-black"}  px-2 py-1 rounded-md  cursor-pointer`} onClick={() => handleSwitch(true)}>Percentage</Button>
        <Button className={` text-sm ${isPercentage ? "bg-gray-100" : "bg-blue-500 text-white"} px-2 py-1 rounded-md cursor-pointer`} onClick={() => handleSwitch(false)} >Amount</Button>
      </div>
    </div >
  )
}

export default InputMode