import {DocumentSheetIcon} from '@sanity/icons'
import {Button, Flex, Label} from '@sanity/ui'
import {useState} from 'react'
import {CSVLink} from 'react-csv'
import {GroqSnippetExport} from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'

const headers = [
  {label: 'Id', key: '_id'},
  {label: 'Title', key: 'title'},
  {label: 'Description', key: 'description'},
  {label: 'Tags', key: 'tags'},
  {label: 'Query', key: 'query'},
  {label: 'Variables', key: 'variables'},
]

interface GenerateCsvCtaProps {
  snippetToExport?: GroqSnippetExport
}

const GenerateCsvCta = ({snippetToExport}: GenerateCsvCtaProps) => {
  const exportData = useGroqSnippetStore((s) => s.exportData)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GroqSnippetExport[]>([])
  const fileName = `groq_snippet_export_${new Date().getTime()}`

  const handleGenerateCsv = async () => {
    try {
      if (!loading) {
        setLoading(true)
        const res = await exportData()
        if (res.length > 0) {
          setData(res)
          setLoading(false)
        }
      }
    } finally {
      setLoading(false)
    }
  }

  if (!snippetToExport || data.length === 0 || loading) {
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
          <Label size={1}>{loading ? 'Loading...' : 'Generate CSV'}</Label>
        </Flex>
      </Button>
    )
  }

  return (
    <CSVLink data={[snippetToExport] || data} headers={headers} filename={fileName}>
      <Button
        mode="ghost"
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
    </CSVLink>
  )
}

export default GenerateCsvCta
