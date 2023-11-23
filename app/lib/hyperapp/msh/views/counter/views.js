export const view = (
  state,
  {
    // props
    label, background,
    // actions
    Inc, Dec,
    // html
    html: { div, button }
  },
  _children
) => div({ style: { background } }, [
  label,
  button({ onclick: [Dec] }, '-'),
  state,
  button({ onclick: [Inc] }, '+')
])
