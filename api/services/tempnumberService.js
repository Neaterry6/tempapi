import axios from 'axios'
import cheerio from 'cheerio'
import tough from 'tough-cookie'
import { wrapper } from 'axios-cookiejar-support'

// Create axios instance with cookie jar support
const cookieJar = new tough.CookieJar()
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }))

export async function getTempNumber() {
  // First request: load homepage and receive cookies (PHPSESSID, etc)
  const homepageResp = await client.get('https://receive-smss.com/')
  const $ = cheerio.load(homepageResp.data)

  // Grab first temp number from the list
  const number = $('.number-box > a').first().text().trim()
  if (!number) throw new Error('Failed to get temp number')

  return number
}

export async function getSMSMessages(number) {
  if (!number) throw new Error('Number required')

  // Compose URL to fetch SMS messages
  // e.g. https://receive-smss.com/phone-number-sms/NUMBER.html
  const smsUrl = `https://receive-smss.com/phone-number-sms/${number}.html`

  // Request inbox page with cookies saved in cookieJar
  const inboxResp = await client.get(smsUrl)
  const $ = cheerio.load(inboxResp.data)

  const messages = []
  $('.sms-message').each((i, el) => {
    messages.push($(el).text().trim())
  })

  return messages.length ? messages : ['No messages found']
    }
