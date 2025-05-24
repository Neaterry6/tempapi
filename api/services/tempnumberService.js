import axios from 'axios'
import cheerio from 'cheerio'
import tough from 'tough-cookie'
import { wrapper } from 'axios-cookiejar-support'

const cookieJar = new tough.CookieJar()
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }))

export async function getTempNumber() {
  const homepageResp = await client.get('https://receive-smss.com/')
  const $ = cheerio.load(homepageResp.data)
  const number = $('.number-box > a').first().text().trim()
  if (!number) throw new Error('Failed to get temp number')
  return number
}

export async function getSMSMessages(number) {
  const smsUrl = `https://receive-smss.com/phone-number-sms/${number}.html`
  const inboxResp = await client.get(smsUrl)
  const $ = cheerio.load(inboxResp.data)

  const messages = []
  $('.sms-message').each((i, el) => {
    messages.push($(el).text().trim())
  })

  return messages.length ? messages : ['No messages found']
    }
