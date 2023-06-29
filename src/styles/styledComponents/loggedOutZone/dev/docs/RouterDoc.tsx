import React from 'react'

interface RouteDocProps {
    input: string
    title: string
    output: string
    procedure: string
    requestType: string
    description: string
}

const RouterDocumentation: React.FC<RouteDocProps> = ({ title, description, requestType, input, output, procedure }) => {
    return (
        <div className="mb-4 hover:scale-110 border-4 border-transparent hover:border-hover transition duration-500 grid card-shadow grid-cols-1 rounded p-6 flex-col justify-between items-start transform">
            <div className="mb-4">
                <h3 className="text-xl mb-1">{title}:</h3>
                <p className="mb-2">{description}</p>
                {requestType === 'Mutation' ? <p className="mb-2">Input: {input}</p> : ""}
                <p className="mb-2">Output: {output}</p>
                <p className="mb-2">Procedure: {procedure}</p>
                <p className="mb-2">Request Type: {requestType}</p>
            </div>
        </div>
    )
}

export default RouterDocumentation
