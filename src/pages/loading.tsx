const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="card">
                <div className="card__skeleton card__title"></div>
                <div className="card__skeleton card__description"></div>
            </div>
        </div>
    )
}

export default Loading