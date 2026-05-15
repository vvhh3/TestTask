import { useEffect, useRef } from "react"
import { ArrowUp } from "lucide-react"
import VoiceInput from "./VoiceInput"

type InputProps = {
    input: string
    setInput: (value: string) => void
    isLoading: boolean
    onClick: () => void
}

const Input = ({ input, setInput, isLoading, onClick }: InputProps) => {

    const textRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const textArea = textRef.current

        if (!textArea) return

        textArea.style.height = "auto"
        textArea.style.height = `${Math.min(textArea.scrollHeight, 150)}px`

    }, [input])

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            onClick()
        }
    }

    return (
        <div className="m-5 flex w-1/2 items-end gap-3 rounded-3xl border border-zinc-700 bg-zinc-900 px-4 py-3 shadow-lg shadow-black/20">
            <div >
                <VoiceInput isLoading={isLoading} setInput={setInput} />
            </div>
            <textarea
                ref={textRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Какой вопрос сегодня?"
                className="flex-1 resize-none py-2 text-white outline-none placeholder:text-zinc-500"
            />

            <button
                type="button"
                onClick={onClick}
                disabled={isLoading || !input.trim()}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${isLoading || !input.trim()
                    ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-zinc-200'
                    }`}
            >
                <ArrowUp />
            </button>
        </div>
    )
}

export default Input