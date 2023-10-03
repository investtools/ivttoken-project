import { useRouter } from 'next/router'
import React from 'react'
import { Translate } from 'translate/translate'
import RouterDocumentation from './RouterDoc'

const AdminRouter: React.FC = () => {
    const router = useRouter()
    const locale = router.locale === undefined ? "pt-br" : router.locale
    const t = new Translate(locale)

    return (
        <div id="admin" className="border-2 border-ivtcolor2 p-8 max-w-6xl mx-auto bg-white rounded-2xl">
            <h1 className="md:text-4xl text-3xl font-bold mb-6 text-ivtcolor2">{t.t("Administrator Router")}</h1>
            <div className='grid md:grid-cols-3 gap-8'>
                <RouterDocumentation title={'getOpenedTickets'} description={'get all opened tickets'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of tickets'} />
                <RouterDocumentation title={'getClosedTickets'} description={'get all closed tickets'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of tickets'} />
                <RouterDocumentation title={'openTicket'} description={'opens a ticket'} requestType={'Mutation'} procedure={'Public'} input={'Name, Email, Subject, Message'} output={''} />
                <RouterDocumentation title={'closeTicket'} description={'closes a ticket'} requestType={'Mutation'} procedure={'Public'} input={'Ticket Id'} output={''} />
                <RouterDocumentation title={'approveSchool'} description={'approves a pending school'} requestType={'Mutation'} procedure={'Protected'} input={'School Id'} output={''} />
                <RouterDocumentation title={'approveISP'} description={'approves an ISP'} requestType={'Mutation'} procedure={'Protected'} input={'Email'} output={''} />
                <RouterDocumentation title={'signTransaction'} description={'signs a transaction'} requestType={'Mutation'} procedure={'Protected'} input={'Transaction Hash, Private Key'} output={''} />
                <RouterDocumentation title={'getAllTransactionsToSign'} description={'gets all transactions that need to be signed'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of transactions'} />
                <RouterDocumentation title={'authorizeUser'} description={'authorizes a user'} requestType={'Mutation'} procedure={'Protected'} input={'Email, Role'} output={''} />
                <RouterDocumentation title={'createSchool'} description={'creates a school'} requestType={'Mutation'} procedure={'Protected'} input={'Name, State, City, Zip Code, Address, CNPJ, Inep Code, Email, Administrator'} output={''} />
                <RouterDocumentation title={'assignTokensToSchool'} description={'assigns tokens to a school'} requestType={'Mutation'} procedure={'Protected'} input={'School CNPJ, Tokens'} output={''} />
                <RouterDocumentation title={'registerAdmin'} description={'registers a new admin user'} requestType={'Mutation'} procedure={'Protected'} input={'Name, Entity'} output={''} />
                <RouterDocumentation title={'isAdmin'} description={'checks if the current user is an admin'} requestType={'Query'} procedure={'Protected'} input={''} output={'Boolean'} />
                <RouterDocumentation title={'getAuthorizedUsers'} description={'gets the list of all authorized users'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of Users'} />
                <RouterDocumentation title={'getPendingContracts'} description={'gets all pending contracts'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of Contracts'} />
                <RouterDocumentation title={'getAllConnectivityReports'} description={'gets all connectivity reports for a school'} requestType={'Query'} procedure={'Protected'} input={'School CNPJ'} output={'Array of Connectivity Reports'} />
                <RouterDocumentation title={'approveContract'} description={'approves a contract between ISP and School'} requestType={'Mutation'} procedure={'Protected'} input={'Contract Id'} output={''} />
                <RouterDocumentation title={'denyContract'} description={'denies a contract between ISP and School'} requestType={'Mutation'} procedure={'Protected'} input={'Contract Id'} output={''} />
                <RouterDocumentation title={'getAllContracts'} description={'gets all contracts'} requestType={'Query'} procedure={'Protected'} input={''} output={'Array of Contracts'} />
            </div>
        </div>
    )
}

export default AdminRouter
