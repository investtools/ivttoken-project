import { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { useRouter } from 'next/router'
import BrazilIcon from '../icons/BrazilIcon'
import USAIcon from '../icons/UsaIcon'

export default function SwitchLanguage() {
  const [enabled, setEnabled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language')
    const currentPath = router.asPath

    if (storedLanguage === 'en') {
      void router.push(currentPath, currentPath, { locale: 'en' })
      setEnabled(true)
    } else {
      void router.push(currentPath, currentPath, { locale: 'pt-br' })
      setEnabled(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLanguageSwitch = (isEnabled: boolean | ((prevState: boolean) => boolean)) => {
    setEnabled(isEnabled)

    if (isEnabled) {
      const currentPath = router.asPath
      void router.push(currentPath, currentPath, { locale: 'en' })
      localStorage.setItem('language', 'en')
    } else {
      const currentPath = router.asPath
      void router.push(currentPath, currentPath, { locale: 'pt-br' })
      localStorage.removeItem('language')
    }
  }

  return (
    <div className='flex items-center' style={{ marginTop: "0.2rem" }}>
      <BrazilIcon />
      <Switch
        checked={enabled}
        onChange={handleLanguageSwitch}
        className={`${enabled ? 'bg-hover' : 'bg-ivtcolor'}
          hover:opacity-[.85] relative inline-flex h-[28px] w-[64px] shrink-0 cursor-pointer rounded-full border-2 border-xhover transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Language setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9 border-l-4' : 'translate-x-0 border-r-4'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-gray-200 border-xhover drop-shadow-xl ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <USAIcon />
    </div>
  )
}
