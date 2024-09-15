import { useCompletion } from "ai/react"

type Props = {
    onReset: () => void
}

const Buttons = ({onReset}:Props) => {
    const {stop} = useCompletion()

    
    return(
        <div className="fixed bottom-5 left-10">
            <button onClick={() => {stop()}} className="border p-10">Stop</button>
            <button onClick={onReset} className="border">Reset</button>
        </div>
    )
}

export {Buttons}