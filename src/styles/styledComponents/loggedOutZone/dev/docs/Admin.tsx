import { useRouter } from 'next/router'
import React from 'react'
import { Translate } from 'translate/translate'
import RouterDocumentation from './RouterDoc'

const AdminRouter: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "en" : router.locale
    const t = new Translate(locale)

    return (
        <div id="admin" className="p-8 max-w-6xl mx-auto bg-white rounded-2xl">
            <h1 className="text-4xl font-bold mb-6 text-ivtcolor2">{t.t("Administrator Router")}</h1>
            <div className='grid grid-cols-3 gap-8'>
                <RouterDocumentation title={'getOpenedTickets'} description={'Get all opened tickets'} requestType={'Query'} procedure={'Protected'} input={''} output={'array'} />
                <RouterDocumentation title={'getClosedTickets'} description={'Get all closed tickets'} requestType={'Query'} procedure={'Protected'} input={''} output={'array'} />
                <RouterDocumentation title={'openTicket'} description={'Opens a ticket'} requestType={'Mutation'} procedure={'Public'} input={'name, email, subject, message'} output={'Ticket'} />
                <RouterDocumentation title={'closeTicket'} description={'Closes a ticket'} requestType={'Mutation'} procedure={'Public'} input={'ticketId'} output={'Ticket'} />
                <RouterDocumentation title={'approveSchool'} description={'Approves a school'} requestType={'Mutation'} procedure={'Protected'} input={'schoolId'} output={'boolean'} />
                <RouterDocumentation title={'approveISP'} description={'Approves an ISP'} requestType={'Mutation'} procedure={'Protected'} input={'email'} output={'boolean'} />
                <RouterDocumentation title={'signTransaction'} description={'Signs a transaction'} requestType={'Mutation'} procedure={'Protected'} input={'transactionHash, privateKey'} output={'boolean'} />
                <RouterDocumentation title={'getAllTransactionsToSign'} description={'Gets all transactions that need to be signed'} requestType={'Query'} procedure={'Protected'} input={''} output={'array'} />
                <RouterDocumentation title={'authorizeUser'} description={'Authorizes a user'} requestType={'Mutation'} procedure={'Protected'} input={'email, role'} output={'boolean'} />
                <RouterDocumentation title={'createSchool'} description={'Creates a school'} requestType={'Mutation'} procedure={'Protected'} input={'name, state, city, zipCode, address, cnpj, inepCode, email, administrator'} output={'School'} />
                <RouterDocumentation title={'assignTokensToSchool'} description={'Assigns tokens to a school identified by the provided CNPJ. The user must be an admin.'} requestType={'Mutation'} procedure={'Protected'} input={'cnpj: string, tokens: string'} output={'string'} />
                <RouterDocumentation title={'registerAdmin'} description={'Registers a new admin user with the provided name and entity. The user must have an email.'} requestType={'Mutation'} procedure={'Protected'} input={'name: string, entity: string'} output={'Object'} />
                <RouterDocumentation title={'isAdmin'} description={'Checks if the current user is an admin.'} requestType={'Query'} procedure={'Protected'} input={''} output={'boolean'} />
                <RouterDocumentation title={'getAuthorizedUsers'} description={'Gets the list of all authorized users.'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of Objects'} />
                <RouterDocumentation title={'getPendingContracts'} description={'Gets all pending contracts.'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of Objects'} />
                <RouterDocumentation title={'getAllConnectivityReports'} description={'Gets all connectivity reports for a school identified by the provided CNPJ. If no CNPJ is provided, returns a default object.'} requestType={'Query'} procedure={'Protected'} input={'cnpj: string (optional)'} output={'Array of Objects'} />
                <RouterDocumentation title={'approveContract'} description={'Approves a contract identified by the provided contractId. The user must be an admin.'} requestType={'Mutation'} procedure={'Protected'} input={'contractId: string'} output={'string'} />
                <RouterDocumentation title={'denyContract'} description={'Denies a contract identified by the provided contractId. The user must be an admin.'} requestType={'Mutation'} procedure={'Protected'} input={'contractId: string'} output={'string'} />
                <RouterDocumentation title={'getAllContracts'} description={'Gets all contracts.'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of Objects'} />
            </div>
        </div>
    )
}

export default AdminRouter