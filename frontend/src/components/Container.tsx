import { type FC, type ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className='mt-5 w-[90%] m-auto bg-white shadow-md rounded-xl lg:flex p-5 '>
      {children}
    </div>
  )
}

export default Container