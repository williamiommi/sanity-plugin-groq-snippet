/* eslint-disable camelcase */
import {js_beautify, JSBeautifyOptions} from 'js-beautify'

const optionsJS: JSBeautifyOptions = {
  indent_size: 2,
  space_in_empty_paren: true,
  max_preserve_newlines: 2,
}

const beautify = (value: string | undefined): string | undefined => {
  try {
    if (!value) return value
    const output = js_beautify(value, optionsJS)
    // special ovverrides for special groq combinations
    return output.replaceAll('- >', '->')
  } catch (e: any) {
    return value
  }
}

export default beautify
