import express from "express"
import cors from "cors"
import OpenAI from "openai"
import dotenv from "dotenv"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const client = new OpenAI({
    baseURL:"https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
})