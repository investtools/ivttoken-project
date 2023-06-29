export const translateSchoolKey = (key: string) => {
    const translationMap = {
        Name: 'Name',
        State: 'State',
        City: 'City',
        ZipCode: 'Zip Code',
        Address: 'Address',
        CNPJ: 'Cnpj',
        InepCode: 'Inep Code',
        Admnistrator: 'Administrator',
        EMail: 'E-Mail',
        Tokens: "Tokens",
        Provider: 'Provider',
        Reports: 'Reports'
    }

    return translationMap[key as keyof typeof translationMap] || key
}

export function formatDate(dataISO: string) {
    if (dataISO === "NONE") return "-"
    if (dataISO === "-") return "-"

    const data = new Date(dataISO)
    const dia = data.getDate().toString().padStart(2, '0')
    const mes = (data.getMonth() + 1).toString().padStart(2, '0')
    const ano = data.getFullYear().toString()
    const horas = data.getHours().toString().padStart(2, '0')
    const minutos = data.getMinutes().toString().padStart(2, '0')

    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`
}

export function getTwoDigitsYear(dataISO: string) {
    if (dataISO === "NONE") return ""
    if (dataISO === "") return ""

    const data = new Date(dataISO)
    const ano = data.getFullYear().toString()
    return ano.slice(2)
}

export function getFullYear(dataISO: string) {
    if (dataISO === "NONE") return "-"
    if (dataISO === "") return ""

    const data = new Date(dataISO)
    return data.getFullYear().toString()
}

export function getMonth(dataISO: string) {
    const data = new Date(dataISO)
    return data.getMonth()
}

export function mapBenefits(benefit: string) {
    switch (benefit) {
        case "TAX_BREAK": return "Tax Break"
        default: return "-"
    }
}

export function mapBenefitPrice(benefitPrice: string) {
    if (benefitPrice === "NONE") return "-"

    return `${benefitPrice} Giga Tokens`
}

export function mapContractStatus(contractStatus: string) {
    switch (contractStatus) {
        case "PENDING": return "Pending"
        case "APPROVED": return "Approved"
        case "DENIED": return "Denied"
        default: return "-"
    }
}

export function mapUserRole(role: string) {
    role = role.toLowerCase()

    switch (role) {
        case "admin": return "Admin"
        case "isp": return "Internet Service Provider"
        case "school": return "School"
        default: return "-"
    }
}