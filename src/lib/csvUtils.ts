import Papa from 'papaparse'
import {GroqSnippetExport} from '../types/GroqSnippet'

export const CsvHeader = ['Id', 'Title', 'Description', 'Tags', 'Query', 'Variables']
const CsvHeaderAlternative = ['Title', 'Description', 'Tags', 'Query', 'Variables']

export const validateCsvHeader = (data: string[]): boolean => {
  return data.every((item) => CsvHeader.includes(item) || CsvHeaderAlternative.includes(item))
}

export const parseCsvFile = <T>(
  file: File,
  completeCb: (result: Papa.ParseResult<T>) => void,
): void => {
  Papa.parse<T>(file, {
    complete: completeCb,
  })
}

export const unparseCsvFile = (rows: GroqSnippetExport[]): string => {
  return Papa.unparse({
    fields: CsvHeader,
    data: rows.map((row) => [
      row._id,
      row.title,
      row.description,
      row.tags,
      row.query,
      row.variables,
    ]),
  })
}
