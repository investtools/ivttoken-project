import { useEffect, useState } from "react"
import { FaArrowCircleUp } from 'react-icons/fa'

const ArrowUp = () => {
    const [visible, setVisible] = useState(false)

    const checkScrollTop = () => {
        if (!visible && window.pageYOffset > 400) {
            setVisible(true)
        } else if (visible && window.pageYOffset <= 400) {
            setVisible(false)
        }
    }

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        window.addEventListener('scroll', checkScrollTop)
        return () => window.removeEventListener('scroll', checkScrollTop)
    })

    return (
        <div className={`fixed bottom-6 right-4 z-10 ${visible ? 'flex' : 'hidden'} justify-center items-center bg-ivtcolor border-2 border-ivtcolor rounded-full`}>
            <FaArrowCircleUp onClick={scrollTop} className="text-ivtcolor2 w-12 h-12 cursor-pointer" />
        </div>
    )
}

export default ArrowUp
