import { h, text } from '../v2.0.22.min.js'

const cache = {}

const isTextType = child => ['string', 'number', 'bigint'].includes(typeof child)
const textify = child => isTextType(child) ? text(child) : child

// using flat() to support components without a root element by returning an array of components
const textifyChildren = ch => Array.isArray(ch) ? ch.flat(Infinity).map(textify) : textify(ch)

const targetArgs = args => args.length === 0 ? [{}] // no parameters at all
  : args.length > 1 ? [args[0], textifyChildren(args[1])] // both (or more) parameters provided
    : !Array.isArray(args[0]) && !isTextType(args[0]) ? args // the only parameter is attributes
      : [{}, textifyChildren(args[0])] // the only parameter is children

// ensure particular tag is being build multiple times
const cacheElement = (target, tag, cached = cache[tag]) => cached ? cached
  : cache[tag] = (...args) => target(tag, ...targetArgs(args))


export const html = new Proxy(h, {
  // for custom elements with cammel case generated name is "dashed" e.g. myElement to my-element
  get: (target, property) => cacheElement(target, property.replace(/([A-Z])/g, c => '-' + c.toLowerCase()))
}) 
