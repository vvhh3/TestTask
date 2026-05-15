import { useState } from "react"
import Input from "./Input"

const Chat = () => {
    const [input,setInput] = useState("")
    const [model,setModel] = useState("")
    const [response,setResponse] = useState("")
    const [isLoading,setIsLoading] = useState(false)

    const SendMessage = async () => {

    }
    return(
        
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
    )
}
export default Chat