export const registerPrefetch = () => {
  // TODO polyfill
  const observer = new IntersectionObserver((entries, obs) => {
    console.log(entries, obs);
  }, {});

  const linkTags = document.querySelectorAll("a");
  Array.from(linkTags).forEach(link => {
      observer.observe(link)
  })
};
