export default defineEventHandler(async (event) => {
  const cityHeader = getHeader(event, 'x-vercel-ip-city')
  const city = cityHeader ? decodeURIComponent(cityHeader) : '-'
  const ipHeader = getHeader(event, 'x-forwarded-for')
  const ip = ipHeader ? ipHeader.split(',')[0] : '-'

  const storage = useStorage('data')
  let visits = (await storage.getItem('visits')) as number ?? 0
  await storage.setItem('visits', ++visits)

  return {
    city,
    ip,
    visits,
  }
})
