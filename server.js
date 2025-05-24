import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import tempMailRoutes from './api/routes/tempMailRoutes.js'
import tempNumberRoutes from './api/routes/tempNumberRoutes.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/tempmail', tempMailRoutes)
app.use('/api/tempnumber', tempNumberRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
