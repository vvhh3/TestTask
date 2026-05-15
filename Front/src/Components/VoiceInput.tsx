import { Mic } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type VoiceInputProps = {
    isLoading: boolean
    setInput: (value: string) => void

}

declare global {
    interface Window {
        webkitSpeechRecognition: any
        SpeechRecognition: any
    }
}

const VoiceInput = ({ isLoading, setInput }: VoiceInputProps) => {

    const [isListening, setIsListening] = useState(false)
    const recognitionRef = useRef<any>(null)

    useEffect(() => {
        // Берём API из браузера
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

        // Проверка поддержки
        if (!SpeechRecognition) {
            alert("Ваш браузер не поддерживает запись голоса")
            return
        }
        // Создаёт новый SpeechRecognition объект.
        const recognition = new SpeechRecognition()

        // Устанавливаем язык распознавания
        recognition.lang = "ru-RU"

        // Определяет, будут ли возвращаться непрерывные результаты для каждого распознавания или только один результат.
        // По умолчанию — один результат ( false.)
        recognition.continuous = true

        // Контроллирует, следует ли возвращать промежуточные результаты (true) или нет (false.) 
        // Промежуточные результаты это результаты которые ещё не завершены
        recognition.interimResults = true

        //Вызывается когда возвращает результат — слово или фраза были распознаны положительно,
        //и это было передано обратно в приложение.
        recognition.onresult = (e: any) => {
            let text = ''

            for (let i = 0; i < e.results.length; i++) {
                text += e.results[i][0].transcript + ''
            }

            setInput(text)
        }

        //Ошибка
        recognition.onerror = (e: any) => {
            console.log(e.error)
        }

        //Когда запись остановилась
        recognition.onend = () => {
            setIsListening(false)
        }

        recognitionRef.current = recognition

    }, [])

    const handleVoiceInput = () => {
        if (!recognitionRef.current) return
        
        if (isListening) {
            recognitionRef.current.stop()
        } else {
            recognitionRef.current.start()
            setIsListening(true)
        }
    }

    return (
        <div>
            <button
                onClick={handleVoiceInput}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition 

                ${isLoading ? 'bg-zinc-900 text-zinc-400 cursor-not-allowed'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'}`}>
                <Mic className={` w-5 h-5 ${isListening ? `text-red-600`:``}`} />
            </button>
        </div>
    )
}

export default VoiceInput