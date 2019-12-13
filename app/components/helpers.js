import { h } from 'https://unpkg.com/hyperapp@2.0.3/src/index.js'

export const Body = (...content) => h('body', { style: { 'font-family': 'sans-serif' } }, content)

export const Div = (...content) => h('div', {}, content)

export const Separator = h('hr')

export const AppTitle = (title) => h('h2', {}, title)

export const ButtonLink = (label, onclick) => h('button', { onclick }, label)

export const TextLink = (label, onclick) => h('span', { style: { cursor: 'pointer', 'text-decoration': 'underline' }, onclick }, label)

const BorderedPanel = (...content) => h('div', { style: { border: '1px solid black', width: 'fit-content', padding: '4px', margin: '6px' } }, ...content)

const ModuleHeader = name => h('div', { style: { 'border-bottom': '1px solid black', 'margin-bottom': '4px' } }, 'Module: ', name)

const CounterName = name => name && h('div', {}, 'Name: ', name)

export const BorderedModule = (module, name, ...content) => BorderedPanel(ModuleHeader(module), CounterName(name), ...content)
