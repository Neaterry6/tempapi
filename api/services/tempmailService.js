import axios from 'axios'
import cheerio from 'cheerio'
import tough from 'tough-cookie'
import { wrapper } from 'axios-cookiejar-support'

const cookieJar = new tough.CookieJar()
const client = wrapper(axios.create({ jar: cookieJar, withCredentials: true }))

export async function getTempMail() {
  const res = await client.get('https://temp-mail.org/en/')
  const $ = cheerio.load(res.data)
  const email = $('#mail').val() || $('input#mail').attr('value')
  if (!email) throw new Error('Failed to get temp mail')
  return email
}

export async function getInboxMessages(email) {
  // Requires real API, so placeholder
  return [`Inbox fetch for ${email} requires API access`]
}
