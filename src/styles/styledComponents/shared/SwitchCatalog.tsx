import React, { useState } from 'react'
import { Switch } from '@headlessui/react'
import MiniTableIcon from '../icons/MiniTableIcon'
import MapIcon from '../icons/MapIcon'

type SwitchCatalogProps = {
  setShowMap: (setShowMap: boolean) => void
}

const SwitchCatalog: React.FC<SwitchCatalogProps> = ({ setShowMap }) => {
  const [enabled, setEnabled] = useState(false)

  const handleLanguageSwitch = (isEnabled: boolean | ((prevState: boolean) => boolean)) => {
    setEnabled(isEnabled)

    if (isEnabled) {
      setShowMap(true)
    } else {
      setShowMap(false)
    }
  }

  return (
    <div className='flex items-center'>
      <MiniTableIcon />
      <div className='mt-1 ml-1 mr-[2px]'>
        <Switch
          checked={enabled}
          onChange={handleLanguageSwitch}
          className={`${enabled ? 'bg-hover' : 'bg-ivtcolor'}
          hover:opacity-[.85] relative inline-flex h-[20px] w-[55px] shrink-0 cursor-pointer rounded-full border-2 border-xhover transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Map Catalog</span>
          <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-9 border-l-4' : 'translate-x-0 border-r-4'}
            pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-gray-200 border-xhover drop-shadow-xl ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
      <MapIcon />
    </div>
  )
}

export default SwitchCatalog