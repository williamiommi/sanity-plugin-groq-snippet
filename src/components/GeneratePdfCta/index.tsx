import {PDFDownloadLink} from '@react-pdf/renderer'
import {DocumentPdfIcon} from '@sanity/icons'
import {Button, Flex, Label} from '@sanity/ui'
import {useMemo, useState} from 'react'
import sleep from '../../lib/sleep'
import {GroqSnippetExport} from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'
import PdfDocument from './PdfDocument'

export interface GeneratePdfCtaProps {
  snippetToExport?: GroqSnippetExport
}

const GeneratePdfCta = ({snippetToExport = undefined}: GeneratePdfCtaProps) => {
  const exportData = useGroqSnippetStore((s) => s.exportData)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GroqSnippetExport[]>([])
  const fileName = `groq_snippet_export_${new Date().getTime()}`

  const pdfData = useMemo(() => {
    if (snippetToExport) return [snippetToExport]
    if (data) return data
    return []
  }, [snippetToExport, data])

  const handleGeneratePdf = async () => {
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

  if (pdfData.length === 0 || loading) {
    return (
      <Button
        mode="ghost"
        paddingY={1}
        paddingX={2}
        style={{cursor: 'pointer', minWidth: '150px'}}
        onClick={handleGeneratePdf}
      >
        <Flex align="center" justify="center">
          <DocumentPdfIcon width={30} height={30} />
          <Label size={1}>{loading ? 'Cooking...' : 'Generate PDF'}</Label>
        </Flex>
      </Button>
    )
  }

  return (
    <PDFDownloadLink document={<PdfDocument snippets={pdfData} />} fileName={fileName}>
      <Button
        mode="default"
        tone="positive"
        paddingY={1}
        paddingX={2}
        style={{cursor: 'pointer', minWidth: '150px'}}
        disabled={loading}
      >
        <Flex align="center" justify="center">
          <DocumentPdfIcon width={30} height={30} />
          <Label size={1}>Download PDF</Label>
        </Flex>
      </Button>
    </PDFDownloadLink>
  )
}

export default GeneratePdfCta
