addEventListener('fetch', (event) => {
  const { url } = event.request;
  const pathname = new URL(url).pathname;

  return event.respondWith(new Response("hi from" + pathname));
})
