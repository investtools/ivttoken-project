import React, { useState, useEffect } from 'react'
import { Translate } from 'translate/translate'
import { useRouter } from 'next/router'
import { isDeviceDesktop } from '~/utils/functions/sharedFunctions'

const sectionsId = ['overview', 'instructions', 'admin', 'schools', 'providers', 'login']

const NavbarDevDocs: React.FC = () => {
  const [activeSection, setActiveSection] = useState('')
  const router = useRouter()
  const locale = router.locale === undefined ? "pt-br" : router.locale
  const t = new Translate(locale)
  const isDesktop = isDeviceDesktop()

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: isDesktop ? 0.2 : 0.1 }
    )

    sectionsId.forEach(id => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sectionsId.forEach(id => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [isDesktop])

  const handleNavigation = (id: string) => {
    const element = document.getElementById(id)
    const headerOffset = isDesktop ? 70 : 130
    const elementPosition = element ? element.getBoundingClientRect().top + window.pageYOffset : 0
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }


  return (
    <div className="text-xs md:text-base flex justify-around md:gap-6 bg-white rounded-full p-2 px-4 text-ivtcolor2 font-bold">
      {sectionsId.map(id => (
        <span
          key={id}
          onClick={() => handleNavigation(id)}
          className={`${activeSection === id ? "border-b-2 border-ivtcolor2" : ""} hover:text-[#72A3A9] cursor-pointer`}
        >
          {t.t(id.charAt(0).toUpperCase() + id.slice(1))}
        </span>
      ))}
    </div>
  )
}

export default NavbarDevDocs
