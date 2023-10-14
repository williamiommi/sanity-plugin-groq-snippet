import json5 from 'json5'

const isValidJSON = (value: string): string | boolean => {
  try {
    if (value) json5.parse(value)
    return true
  } catch (err: any) {
    return `Parameters are not valid JSON:\n\n${err.message.replace('JSON5:', '')}`
  }
}

export default isValidJSON
