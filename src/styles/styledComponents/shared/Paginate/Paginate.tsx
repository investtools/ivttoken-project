import { useRouter } from "next/router"
import { Listbox } from '@headlessui/react'
import { Translate } from "translate/translate"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid"

type PaginateProps = {
    totalPage: number
    itemsPerPage: number
    currentPage: number
    goToPage: (number: number) => void
    previousPage: () => void
    nextPage: () => void
    setCurrentPage: (n: number) => void
    setItemsPerPage: (n: number) => void
}

const Paginate: React.FC<PaginateProps> = ({ totalPage, itemsPerPage, currentPage, goToPage, previousPage, nextPage, setItemsPerPage, setCurrentPage }) => {
    const handleItemsPerPageChange = (itemsPerPage: number) => {
        setItemsPerPage(itemsPerPage)
        setCurrentPage(1)
    }

    const router = useRouter()
    const locale = router.locale === undefined ? 'pt-br' : router.locale
    const t = new Translate(locale)

    return (
        <div className="md:flex md:justify-between items-center p-3 rounded-b flex-row grid md:grid-cols-1 grid-cols-2 gap-2">
            <button className="md:order-1 order-5 bg-ivtcolor hover:bg-hover text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-full" onClick={() => goToPage(1)} disabled={currentPage === 1}>
                {t.t("First")}
            </button>

            <button className="md:order-2 order-3 bg-ivtcolor hover:bg-hover text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-full" onClick={previousPage} disabled={currentPage === 1}>
                {t.t("Previous")}
            </button>

            <span className="text-ivtcolor2 font-bold text-center order-1 md:order-3 md:text-base text-sm">- {t.t("Page")} {currentPage} {t.t("of")} {totalPage} -</span>

            <div className="text-center md:order-4 order-2">
                <Listbox value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <Listbox.Button className="rounded-full p-2 text-ivtcolor2 font-bold">
                        <div className="flex justify-between">
                            <span className="md:text-base text-sm">{itemsPerPage} {t.t("items per page")}</span>
                            <ChevronUpDownIcon className="w-5 h-5 text-gray-400 mt-[3px]" aria-hidden="true" />
                        </div>
                    </Listbox.Button>
                    <Listbox.Options className="border rounded absolute z-10 mt-1 bg-white shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 overflow-auto">
                        {[5, 10, 20, 50].map((value) => (
                            <Listbox.Option
                                key={value}
                                value={value}
                                className={({ active }) =>
                                    `${active ? 'text-white bg-ivtcolor' : 'text-ivtcolor2'}
                    cursor-default select-none relative py-2 pl-10 pr-4 `}
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`${selected ? 'font-bold' : 'font-normal'} block truncate`}>
                                            {value} {t.t("items per page")}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`${active ? 'text-white' : 'text-ivtcolor'
                                                    } absolute inset-y-0 left-0 flex items-center pl-3`}
                                            >
                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Listbox>
            </div>

            <button className="md:order-5 order-4 bg-ivtcolor hover:bg-hover text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-full" onClick={nextPage} disabled={currentPage === totalPage}>
                {t.t("Next")}
            </button>

            <button className="order-6 bg-ivtcolor hover:bg-hover text-white font-bold md:py-2 md:px-4 py-1 px-2 rounded-full" onClick={() => goToPage(totalPage)} disabled={currentPage === totalPage}>
                {t.t("Last")}
            </button>
        </div>
    )
}

export default Paginate
