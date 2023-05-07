import {createClient} from '@vercel/kv'

const kv = createClient({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN
})

export default defineEventHandler(async (event) => {
  const cityHeader = getHeader(event, 'x-vercel-ip-city')
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  const ipHeader = getHeader(event, 'x-forwarded-for')
  const ip = ipHeader ? ipHeader.split(',')[0] : '-'

  let visits = (await kv.get('visits')) as number ?? 0
  await kv.set('visits', ++visits)

  return {
    city,
    ip,
    visits,
  }
})
