export const view = (
  state,
  {
    // props
    label, bgcolor,
    // actions
    Inc, Dec,
    // html
    html: { div, button }
  },
  _children
) => div({ style: { bgcolor } }, [
  label,
  button({ onclick: Inc }, '+'),
  state,
  button({ onclick: Dec }, '-')
])
