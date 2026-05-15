import { useState } from "react"
import Input from "./Input"
import axios from "axios"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"

type MessageType ={
    id: number
    text: string
}

const Chat = () => {
    const [input, setInput] = useState("")
    const [response, setResponse] = useState<MessageType[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const SendMessage = async () => {
        try {
            setIsLoading(true)
            const res = await axios.post("http://localhost:5000/api/chat", {
                input: input,
            })

            setIsLoading(false)
            setInput("")
            console.log("res",res.data.answer)
            console.log("data",res.data)
            setResponse([...response, {id: Date.now(), text:res.data.answer}])
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <div className="flex">
            <div className='flex-col flex w-full min-h-screen items-center justify-end'>

                {response && (
                    <div className='w-1/2'>

                        {response.map(r => (
                            <div key={r.id} className='text-white rounded-3xl bg-zinc-900 p-5 m-3'>
                                <h2>Мой Ответ:</h2>
                                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{r.text}</Markdown>
                            </div>
                        ))}

                        {isLoading && <div >Думаю...</div>}
                    </div>
                )}
                <Input
                    input={input}
                    setInput={setInput}
                    isLoading={isLoading}
                    onClick={SendMessage}
                />
            </div>
        </div>
    )
}
export default Chat