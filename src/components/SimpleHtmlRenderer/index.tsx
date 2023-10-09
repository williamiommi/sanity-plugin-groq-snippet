/* eslint-disable react/no-danger */

interface SimpleHtmlRendererProps {
  html: string | undefined
}

const SimpleHtmlRenderer = ({html}: SimpleHtmlRendererProps) => {
  if (!html) return null
  return <span dangerouslySetInnerHTML={{__html: html}} />
}

export default SimpleHtmlRenderer
