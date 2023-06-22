import React, { useState, useEffect } from 'react'
import { Translate } from 'translate/translate'
import { useRouter } from 'next/router'

const sectionsId = ['about', 'history', 'join', 'collaboration', 'institutional', 'testimonials']

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('')
  const router = useRouter()
  const locale = router.locale === undefined ? "en" : router.locale
  const t = new Translate(locale)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
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
  }, [])

  const handleNavigation = (id: string) => {
    const element = document.getElementById(id)
    const headerOffset = 90
    const elementPosition = element ? element.getBoundingClientRect().top + window.pageYOffset : 0
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }


  return (
    <div className="flex justify-around gap-6 bg-white rounded-full p-2 px-4 text-ivtcolor2 font-bold">
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

export default Navbar
