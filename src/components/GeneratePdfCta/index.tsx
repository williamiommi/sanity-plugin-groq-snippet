import {PDFDownloadLink} from '@react-pdf/renderer'
import {DocumentPdfIcon} from '@sanity/icons'
import {Button, Flex, Label} from '@sanity/ui'
import {useState} from 'react'
import {GroqSnippetExport} from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'
import PdfDocument from './PdfDocument'

interface GeneratePdfCtaProps {
  snippetToExport?: GroqSnippetExport
}

const GeneratePdfCta = ({snippetToExport}: GeneratePdfCtaProps) => {
  const exportData = useGroqSnippetStore((s) => s.exportData)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GroqSnippetExport[]>([])
  const fileName = `groq_snippet_export_${new Date().getTime()}`

  const handleGeneratePdf = async () => {
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
        onClick={handleGeneratePdf}
      >
        <Flex align="center" justify="center">
          <DocumentPdfIcon width={30} height={30} />
          <Label size={1}>{loading ? 'Loading...' : 'Generate PDF'}</Label>
        </Flex>
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      document={<PdfDocument snippets={[snippetToExport] || data} />}
      fileName={fileName}
    >
      <Button
        mode="ghost"
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
