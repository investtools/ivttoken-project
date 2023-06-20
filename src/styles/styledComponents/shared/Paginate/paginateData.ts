export const paginateData = (data: unknown[], itemsPerPage: number, currentPage: number, setCurrentPage: (n: number) => void, setItemsPerPage: (n: number) => void) => {
    const totalPage = Math.ceil(data.length / itemsPerPage)
  
    const nextPage = () => {
      const newPage = Math.min(currentPage + 1, totalPage)
      setCurrentPage(newPage)
    }
  
    const previousPage = () => {
      const newPage = Math.max(currentPage - 1, 1)
      setCurrentPage(newPage)
    }
  
  
    const goToPage = (number: number) => {
      const safeNumber = Math.max(1, Math.min(number, totalPage))
      setCurrentPage(safeNumber)
    }
  
    const handleItemsPerPageChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setItemsPerPage(event.target.value as number)
      setCurrentPage(1)
    }
  
    return { nextPage, previousPage, goToPage, handleItemsPerPageChange, totalPage }
  }