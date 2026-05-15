import { useEffect, useRef } from "react"
import { Bot, ArrowUp } from "lucide-react"

type InputProps = {
    input: string
    setInput: (value: string) => void
    model: string
    setModel: (value: string) => void
    isLoading: boolean
    setIsLoading: (value: boolean) => void
    onClick: () => void
}

const Input = ({ input, setInput, model, setModel, isLoading, setIsLoading, onClick }: InputProps) => {

    const textRef = useRef(null)

    useEffect(() => {

    }, [input])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(!model.trim()) return
        if(e.key === "Enter" && !e.shiftKey){
            e.preventDefault()
            onClick()
        }
    }
    
    return (
        <div className="m-10 w-1/2 rounded-3xl bg-zinc-900 flex justify-between items-center">

            <div className="relative m-3 flex w-9 h-9 justify-start items-center">
                <Bot className='text-white' />
                <select
                    className="absolute w-full cursor-pointer opacity-0 bg-zinc-700 text-white"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                >
                    <option value="">Выберите модель</option>
                    <option value="openrouter/owl-alpha">openrouter/owl-alpha</option>
                    <option value="nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free">nvidia/nemotron-3</option>
                    <option value="nvidia/nemotron-3-super-120b-a12b:free">nvidia/nemotron-3-super</option>
                    <option value="poolside/laguna-xs.2:free">poolside/laguna-xs.2:free</option>
                    <option value="poolside/laguna-m.1:free">poolside/laguna-m.1:free</option>
                    <option value="baidu/qianfan-ocr-fast:free">baidu/qianfan-ocr-fast:free</option>
                </select>
            </div>

            <textarea className="flex-1 resize-none py-2 text-white outline-none placeholder:text-zinc-500"
                value={input}
                ref={textRef}
                rows={1}
                onKeyDown={handleKeyDown}
                placeholder="Какой вопрос сегодня?"
                onChange={(e) => setInput(e.target.value)} />
            <button
                disabled={isLoading || !input.trim() || !model}
                className={`flex justify-center items-center rounded-full h-9 w-9
                ${isLoading || !input.trim() || !model.trim()
                    ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-zinc-200'}`}
                onClick={onClick}
            >
                <ArrowUp />
            </button>
        </div>
    )
}

export default Input