import { useRouter } from "next/router"
import CodeIcon from "../icons/CodeIcon"

const DevButton: React.FC = () => {
    const router = useRouter()

    const handleClick = () => {
        void router.push('/dev')
    }

    return (
        <>
            <button
                onClick={handleClick}
                className="border gradient-animation border-white shadow-sm text-sm text-white font-bold py-2 px-4 rounded-full flex justify-center items-center">
                Dev&nbsp;&nbsp;
                <div>
                    <CodeIcon />
                </div>
            </button>
        </>
    )
}

export default DevButton