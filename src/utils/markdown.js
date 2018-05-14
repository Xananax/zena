import Remarkable from 'remarkable'

const md = new Remarkable({
  html: true,
  xhtmlOut: true,
  breaks: true,
  linkify: true,
  typographer: true,
  quotes: '“”‘’',
});

export const render = (text) => md.render(text)