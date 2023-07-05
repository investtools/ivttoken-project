import React from 'react'
import Overview from '~/styles/styledComponents/loggedOutZone/dev/docs/Overview'
import AdminRouter from '~/styles/styledComponents/loggedOutZone/dev/docs/Admin'
import ProvidersRouter from '~/styles/styledComponents/loggedOutZone/dev/docs/ISP'
import SchoolsRouter from '~/styles/styledComponents/loggedOutZone/dev/docs/Schools'
import LoginRouter from '~/styles/styledComponents/loggedOutZone/dev/docs/LoginRouter'
import HeaderDevDocs from '~/styles/styledComponents/loggedOutZone/dev/docs/HeaderDevDocs'
import ArrowUp from '~/styles/styledComponents/shared/ArrowUp'
import Instructions from '~/styles/styledComponents/loggedOutZone/dev/docs/Instructions'

const Documentation: React.FC = () => {
    return (
        <>
            <HeaderDevDocs />
            <div className='space-y-10 md:mt-10 mt-24'>
                <Overview />
                <Instructions />
                <AdminRouter />
                <SchoolsRouter />
                <ProvidersRouter />
                <LoginRouter />
                <div />
                <ArrowUp />
            </div>
        </>
    )
}

export default Documentation