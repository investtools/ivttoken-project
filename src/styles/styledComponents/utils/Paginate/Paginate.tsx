import { useRouter } from "next/router"
import { Translate } from "translate/translate"

type PaginateProps = {
    totalPage: number
    itemsPerPage: number
    currentPage: number
    goToPage: (number: number) => void
    previousPage: () => void
    nextPage: () => void
    handleItemsPerPageChange: (event: React.ChangeEvent<{
        value: unknown
    }>) => void
}

const Paginate: React.FC<PaginateProps> = ({ totalPage, itemsPerPage, currentPage, goToPage, previousPage, nextPage, handleItemsPerPageChange }) => {
    const router = useRouter()
    const locale = router.locale === undefined ? 'en' : router.locale
    const t = new Translate(locale)

    return (
        <div className="flex justify-between items-center mt-5">
            <button onClick={() => goToPage(1)} disabled={currentPage === 1}>
                {t.t("First")}
            </button>
            <button onClick={previousPage} disabled={currentPage === 1}>
                {t.t("Previous")}
            </button>
            <span>{t.t("Page")} {currentPage} {t.t("of")} {totalPage}</span>
            <button onClick={nextPage} disabled={currentPage === totalPage}>
                {t.t("Next")}
            </button>
            <button onClick={() => goToPage(totalPage)} disabled={currentPage === totalPage}>
                {t.t("Last")}
            </button>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                {[5, 10, 20, 50].map((value) => (
                    <option key={value} value={value}>
                        {value} {t.t("items per page")}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Paginate