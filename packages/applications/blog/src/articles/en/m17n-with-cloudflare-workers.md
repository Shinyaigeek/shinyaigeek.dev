---
title: m17n with cloudflare workers
tags: [Programming, CDN, CloudFlare]
description: I implemented multilingual support on my blog page. I used cloudflare workers for that, and the experience was great, so I will leave it as a note.
publishedAt: 2022/02/19
updatedAt: 2022/02/19
---

Hi there! I'm [Shinyaigeek(Shinobu Hayashi)](https://twitter.com/Shinyaigeek). I have been sending Pull Requests for OSS that I am interested in to pass the time, because I have a time till this April. As a result, I have been getting more and more Direct Messages on Twitter from the maintainers or who I have talked on issue or PR or discord, and according to cloudflare's analytics, more HTTP Request was came from foreign countries. Even if I consider about the HTTP Request from crawler bots, I think I should handle these requests. I decided to support English on my blog. I used cloudflare workers for one of the requirements, which is to sort the contents according to the "accept-language" of the HTTP Request Header. I got it right and had a good experience with just few working, so I thought I'd write this article as a note.

## shinyaigeek.dev's architecture

I start to describe shinyaigeek.dev's architecture. In shinyaigeek.dev, the components are written in JSX, and the articles are written in markdown. I used the handmade static site builder to convert JSX and markdown into HTML, and serve the output from h2o server on VPS in Japan. I don't need complex functionalities on my blog and I think there are few page transitions, so I don't use hydration of `react-dom`, so shinyaigeek.dev works without React on client. There are some parts that use JavaScript functionalities, but all of them are encapsulated in customElements.

## where sort according to the "accept-language" of the HTTP Request Header

First of all, I had the two options, to change the HTTP Response contents according to HTTP Request "accept-language" header on the same URL or to send HTTP 301 Response. I chosen the latter, redirect because I think in the former way, the shared-cache will be troublesome. If I rewrite HTTP Request's URL with cloudflare workers, we won't have to worry about it, but since it is a static blog, I did not want to send a different content for requests to the same URL, so I chose the latter. In order to redirect a client which send an HTTP Request, I need to return HTTP 301 Response, which can be returned from the origin server or cloudflare workers. Sending HTTP 301 Response from the origin server will cause delay due to geographic factors, especially I thought many of the user, the target of this multilingual support, send HTTP Request from the countries outside of Japan, so I decided to use cloudflare workers to handle this at the network edge in order to eliminate such delay.

## How to?

It was easy. There is some libraries which parses "accept-language" and determine preferred language, all I have to do is to choose the most appropriate one and use it.

-   [accept-language](https://www.npmjs.com/package/accept-language)
-   [accept-language-parser](https://www.npmjs.com/package/accept-language-parser)
-   [resolve-accept-language](https://www.npmjs.com/package/resolve-accept-language)

points to make note of:

-   Don't do anything for HTTP Requests for other than HTML file.
-   In this case, I make HTTP Request which URL ends of `.html` or `/` target of this process.
-   Be careful of infinite loop
-   If you redirect to a page for en, and the client sends an HTTP Request in response, the following cloudflare workers will be fired again, and you will be redirected to a page for en again. This can be an infinite loop.
-   In shinyaigeek.dev, pages for "en" and "ja" are on different domains, so cloudflare workers are not fired when HTTP requests are sent to those domains. This is partly to prevent the infinite loop mentioned above, but also because people who access these URLs may want to read them in that language regardless of the accept-language.
-   For example, if you are using a pathname with a prefix such as `/en/` instead of a subdomain, you should be careful.

The following is a simple code:

### コード

```typescript
import resolveAcceptLanguage from 'resolve-accept-language';

const handler = function (event: FetchEvent) {
    // get URL from HTTP Request
    const { url } = event.request;
    // get pathname and search query from HTTP Request
    const { pathname, search } = new URL(url);

    // Don't anything if the HTTP Request is not for HTML file
    if (!pathname.endsWith('.html') && !pathname.endsWith('/')) {
        return fetch(event.request);
    }

    //  get accept-language from HTTP Request Header
    const acceptLanguage = event.request.headers.get('accept-language');
    if (!acceptLanguage) {
        return fetch(event.request);
    }
    // determine preferred language
    const preferredLanguage = resolveAcceptLanguage(acceptLanguage, ['en-US', 'ja-JP'], 'ja-JP');

    // if english is prefered, return HTTP 301 response
    if (preferedLanguage === 'en-US') {
        return Response.redirect(`https://en.shinyaigeek.dev${pathname}${search}`, 301);
    }

    return fetch(event.request);
};

addEventListener('fetch', (event) => {
    event.respondWith(handler(event));
});
```

## Impressions

Since I'm making a blog without using any framework, I have to think about this kind of multi-language support by myself, but it's fun to train myself. Also, recently, cloudflare workers and Compute@Edge have made it possible for front-end engineers to quickly control things like reverse proxy using familiar JS, which is a great time. Also, since we are doing this by force without using any frameworks, we would appreciate it if you could tell us if we should actually do this or that.
