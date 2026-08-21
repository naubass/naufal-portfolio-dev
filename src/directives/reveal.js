const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)

export const reveal = {
  mounted(el) {
    el.classList.add('reveal')
    observer.observe(el)
  },
}
