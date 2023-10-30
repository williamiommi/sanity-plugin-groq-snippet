import {DocumentSheetIcon} from '@sanity/icons'
import {Button, Flex, Label} from '@sanity/ui'
import {useMemo, useState} from 'react'
import {unparseCsvFile} from '../../lib/csvUtils'
import sleep from '../../lib/sleep'
import {GroqSnippetExport} from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'

interface GenerateCsvCtaProps {
  snippetToExport?: GroqSnippetExport
}

const GenerateCsvCta = ({snippetToExport = undefined}: GenerateCsvCtaProps) => {
  const exportData = useGroqSnippetStore((s) => s.exportData)
  const toastError = useGroqSnippetStore((s) => s.toastError)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GroqSnippetExport[]>([])
  const fileName = `groq_snippet_export_${new Date().getTime()}`

  const csvHref = useMemo(() => {
    try {
      let output: GroqSnippetExport[] = []
      if (snippetToExport) output = [snippetToExport]
      else if (data.length > 0) output = data
      else return ''
      return `data:text/csv;charset=utf-8,${encodeURI(unparseCsvFile(output))}`
    } catch (err: any) {
      toastError({err})
      return ''
    }
  }, [snippetToExport, data, toastError])

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
