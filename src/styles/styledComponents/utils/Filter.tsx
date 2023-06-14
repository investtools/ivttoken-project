import { useRouter } from "next/router"
import { Translate } from "translate/translate"
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from "react"
import { CheckIcon } from "@heroicons/react/20/solid"
import SearchIcon from "../icons/SearchIcon"

type SchoolKeys = 'name' | 'state' | 'city' | 'zipCode'

type FilterProps = {
    filterOption: string
    setFilterOption: (value: SchoolKeys) => void
    search: string
    setSearch: (value: string) => void
}

function mapFilterOption(filterOption: string) {
    switch (filterOption) {
        case "name": return "School's Name"
        case "state": return "State"
        case "city": return "City"
        case "zipCode": return "Zip Code"
        default: return filterOption
    }
}

const Filter: React.FC<FilterProps> = ({ filterOption, setFilterOption, search, setSearch }) => {
    const router = useRouter()
    const locale = router.locale === undefined ? 'en' : router.locale
    const t = new Translate(locale)
    const options = ['name', 'state', 'city', 'zipCode']

    return (
        <div className="flex justify-between mb-2 text-ivtcolor2 font-bold">
            <div className="flex justify-center items-center">
                <label htmlFor="filter" className="ml-2 mr-2">{t.t("Filter by:")}</label>
                <Listbox value={filterOption} onChange={setFilterOption}>
                    <div className="relative">
                        <Listbox.Button className="relative w-full p-1 pl-3 pr-10 text-left bg-white rounded-full border cursor-default focus:outline-none sm:text-sm">
                            <span className="block truncate">{t.t(mapFilterOption(filterOption))}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                        </Listbox.Button>
                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                            <Listbox.Options className="absolute border py-1 mt-1 overflow-auto text-base bg-white rounded shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {options.map((option) => (
                                    <Listbox.Option key={option} value={option} className={({ active }) => `${active ? 'text-white bg-ivtcolor' : 'text-ivtcolor2'} cursor-default select-none relative py-2 pl-10 pr-4`}>
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`${selected ? 'font-bold' : 'font-normal'} block truncate`}>{t.t(mapFilterOption(option))}</span>
                                                {selected ? (
                                                    <span className={`${active ? 'text-white' : 'text-ivtcolor'} absolute inset-y-0 left-0 flex items-center pl-3`}>
                                                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>

            <div className="flex items-center justify-center">
                <label htmlFor="search" className="mr-2">{t.t("Search:")}</label>
                <div className="relative">
                    <input className="rounded-full border p-1 focus:outline-none focus:ring focus:ring-ivtcolor hover:drop-shadow-xl mr-2 pl-8" placeholder={t.t(mapFilterOption(filterOption))} id="search" type="text" value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none ">
                        <SearchIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter