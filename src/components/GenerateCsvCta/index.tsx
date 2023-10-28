import {DocumentSheetIcon} from '@sanity/icons'
import {Button, Flex, Label} from '@sanity/ui'
import Papa from 'papaparse'
import {useMemo, useState} from 'react'
import sleep from '../../lib/sleep'
import {GroqSnippetExport} from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'

const CsvHeader = ['Id', 'Title', 'Description', 'Tags', 'Query', 'Variables']

interface GenerateCsvCtaProps {
  snippetToExport?: GroqSnippetExport
}

const GenerateCsvCta = ({snippetToExport = undefined}: GenerateCsvCtaProps) => {
  const exportData = useGroqSnippetStore((s) => s.exportData)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GroqSnippetExport[]>([])
  const fileName = `groq_snippet_export_${new Date().getTime()}`

  const csvHref = useMemo(() => {
    let output: GroqSnippetExport[] = []
    if (snippetToExport) output = [snippetToExport]
    else if (data.length > 0) output = data
    else return ''

    const cvsOutputString = Papa.unparse({
      fields: CsvHeader,
      data: output.map((row) => [
        row._id,
        row.title,
        row.description,
        row.tags,
        row.query,
        row.variables,
      ]),
    })

    return `data:text/csv;charset=utf-8,${encodeURI(cvsOutputString)}`
  }, [snippetToExport, data])

  const handleGenerateCsv = async () => {
    try {
      if (!loading) {
        setLoading(true)
        const res = await exportData()
        if (res.length > 0) {
          setData(res)
          await sleep(2000)
          setLoading(false)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (!csvHref || loading) {
    return (
      <Button
        mode="ghost"
        paddingY={1}
        paddingX={2}
        style={{cursor: 'pointer', minWidth: '150px'}}
        onClick={handleGenerateCsv}
      >
        <Flex align="center" justify="center">
          <DocumentSheetIcon width={30} height={30} />
          <Label size={1}>{loading ? 'Cooking...' : 'Generate CSV'}</Label>
        </Flex>
      </Button>
    )
  }

  return (
    <Button
      as="a"
      href={csvHref}
      download={fileName}
      mode="bleed"
      tone="positive"
      paddingY={1}
      paddingX={2}
      style={{cursor: 'pointer', minWidth: '150px'}}
      disabled={loading}
    >
      <Flex align="center" justify="center">
        <DocumentSheetIcon width={30} height={30} />
        <Label size={1}>Download CSV</Label>
      </Flex>
    </Button>
  )
}

export default GenerateCsvCta
