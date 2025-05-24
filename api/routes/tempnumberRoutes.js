import express from 'express'
import { getTempNumber, getSMSMessages } from '../services/tempNumberService.js'

const router = express.Router()

router.get('/generate', async (req, res) => {
  try {
    const number = await getTempNumber()
    res.json({ number })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/inbox', async (req, res) => {
  const { number } = req.query
  if (!number) return res.status(400).json({ error: 'Number is required' })

  try {
    const messages = await getSMSMessages(number)
    res.json({ messages })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
