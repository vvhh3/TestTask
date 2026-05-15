import { Mic } from "lucide-react"
import { useState } from "react"

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

    const handleVoiceInput = () => {
        
        // Берём API из браузера
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        
        // Проверка поддержки
        if (!SpeechRecognition) {
            alert("Ваш браузер не поддерживает запись голоса")
            return
        }
        
        // Создаёт новый SpeechRecognition объект.
        const recognition = new SpeechRecognition()
        
        if(isListening) {
            setIsListening(false)
            recognition.stop()
            return
        }

        // Устанавливаем язык распознавания
        recognition.lang = "ru-RU"

        // Определяет, будут ли возвращаться непрерывные результаты для каждого распознавания или только один результат.
        // По умолчанию — один результат ( false.)
        recognition.continuous = true

        // Контроллирует, следует ли возвращать промежуточные результаты (true) или нет (false.) 
        // Промежуточные результаты это результаты которые ещё не завершены
        recognition.interimResults = false

        //Вызывается когда возвращает результат — слово или фраза были распознаны положительно,
        //и это было передано обратно в приложение.
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript

            // Подставляем текст в input
            setInput(transcript)
        }

        // Ошибка
        recognition.onerror = (event: any) => {
            console.log(event.error)
        }

        // Старт записи
        recognition.start()
        setIsListening(true)
    }

    return (
        <div>
            <button
                onClick={handleVoiceInput}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition 
            ${isLoading ? 'cursor-not-allowed'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-700'}`}>
                <Mic className=" w-5 h-5" />
            </button>
        </div>
    )
}

export default VoiceInput