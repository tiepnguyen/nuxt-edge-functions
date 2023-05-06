import kv from '@vercel/kv'

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
