import express from 'express'
import { getTempMail, getInboxMessages } from '../services/tempMailService.js'

const router = express.Router()

router.get('/generate', async (req, res) => {
  try {
    const email = await getTempMail()
    res.json({ email })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/inbox', async (req, res) => {
  const { email } = req.query
  if (!email) return res.status(400).json({ error: 'Email is required' })

  try {
    const messages = await getInboxMessages(email)
    res.json({ messages })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
