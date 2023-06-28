import React from 'react'
import HomeIcon from '../icons/HomeIcon'
import { useRouter } from 'next/router'

const GoMainBasicButton: React.FC = () => {
  const router = useRouter()

  const handleGoHome = () => {
    void router.push('/main')
  }
  return (
    <button
      onClick={handleGoHome}
      className="border gradient-animation border-white shadow-sm text-sm text-white font-bold py-2 px-4 rounded-full flex justify-center items-center">
      Home&nbsp;&nbsp;
      <div>
        <HomeIcon iconWhite={true} />
      </div>
    </button>
  )
}

export default GoMainBasicButton
