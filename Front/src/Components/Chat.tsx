import { useState } from "react"
import Input from "./Input"
import axios from "axios"

type MessageType ={
    id: Date
    text: string
}

const Chat = () => {
    const [input, setInput] = useState("")
    const [model, setModel] = useState("")
    const [response, setResponse] = useState<MessageType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const SendMessage = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post("http://localhost:5000/api/chat", {
                answer: input,
                model: model
            })

            setIsLoading(false)
            setInput("")
            setResponse([...response, {id: new Date(), text:res.data}])
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <div className="flex flex-col">
            <div>
                {response ? (

                    response.map((msg) => (
                        <div key={msg.id.toString()}>
                            <p>Ответ:{msg.text}</p>
                            <p>модель: {model}</p>
                        </div>
                    ))
                ) : null}
            </div>
            <div className="flex w-full min-h-screen justify-center items-end">

                <Input
                    input={input}
                    setInput={setInput}
                    model={model}
                    setModel={setModel}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    onClick={SendMessage}
                />
            </div>
        </div>
    )
}
export default Chat