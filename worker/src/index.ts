import resolveAcceptLanguage from 'resolve-accept-language'

addEventListener('fetch', (event) => {
  const { url } = event.request
  const { pathname, search } = new URL(url)

  if (pathname.startsWith('/en')) {
    return fetch(event.request)
  }

  if (
    !pathname.includes('.') ||
    !pathname.endsWith('.html') ||
    !pathname.endsWith('/')
  ) {
    return fetch(event.request)
  }

  const acceptLanguage = event.request.headers.get('accept-language')
  if (!acceptLanguage) {
    return fetch(event.request)
  }
  const preferedLanguage = resolveAcceptLanguage(
    acceptLanguage,
    ['en-US', 'ja-JP'],
    'ja-JP',
  )

  if (preferedLanguage === 'en-US') {
    return Response.redirect(`https://shinyaigeek.dev/en${pathname}${search}`, 301)
  }

  return fetch(event.request)
})
