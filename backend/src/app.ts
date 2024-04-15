import express from 'express'
import routes from './routes'
import cors from 'cors'

const app = express()
app.use(cors());

app.use(express.json())
app.use(routes.lessonRouter)
app.use(routes.userRouter)

export default app;