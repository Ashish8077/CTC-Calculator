import { type FC } from 'react'


import CTCInput from './CTCInput'
import AdvancedSalarySettings from '../AdvancedSalarySettings/AdvancedSalarySettings'


const CTCInputPanel: FC = () => {
  return (
    <div className={`w-full max-w-[600px] sm:p-4 px-2 mx-auto`}>
      <CTCInput />
      <AdvancedSalarySettings />
    </div>
  )
}

export default CTCInputPanel