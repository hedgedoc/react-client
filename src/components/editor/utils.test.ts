import { removeHTMLTag, removeMarkdownSyntax } from './utils'

describe('removeHTMLTag', () => {
  test('one simple tag', () => {
    expect(removeHTMLTag('<b>bold</b>')).toBe('bold')
  })

  test('two simple tags', () => {
    expect(removeHTMLTag('<small><b>bold & small</b></small>')).toBe('bold & small')
  })

  test('complexer tags', () => {
    expect(removeHTMLTag('<b style="font-size: 10px">bold</b>')).toBe('bold')
  })
})

describe('removeMarkdownSyntax', () => {
  test('italic highlight', () => {
    expect(removeMarkdownSyntax('*italic*')).toBe('italic')
  })

  test('bold highlight', () => {
    expect(removeMarkdownSyntax('**bold**')).toBe('bold')
  })

  test('underline highlight', () => {
    expect(removeMarkdownSyntax('++underline++')).toBe('underline')
  })

  test('subscript highlight', () => {
    expect(removeMarkdownSyntax('~subscript~')).toBe('subscript')
  })

  test('strikethrough highlight', () => {
    expect(removeMarkdownSyntax('~~strikethrough~~')).toBe('strikethrough')
  })

  test('superscript highlight', () => {
    expect(removeMarkdownSyntax('^superscript^')).toBe('superscript')
  })

  test('code highlight', () => {
    expect(removeMarkdownSyntax('`code`')).toBe('code')
  })

  test('link highlight', () => {
    expect(removeMarkdownSyntax('[HedgeDoc](https://hedgedoc.net)')).toBe('HedgeDoc')
  })

  test('image highlight', () => {
    expect(removeMarkdownSyntax('![HedgeDoc](https://demo.codimd.org/screenshot.png)')).toBe('HedgeDoc')
  })
})
