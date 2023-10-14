// code taken from sanity vision plugin https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/vision/src/codemirror/VisionCodeMirror.tsx
import {useTheme} from '@sanity/ui'
import CodeMirror, {ReactCodeMirrorProps} from '@uiw/react-codemirror'
import {useCodemirrorTheme} from '../../hooks/useCodemirrorTheme'
import {CodemirrorWrapper} from '../Styles'
import {codemirrorExtensions} from './CustomExtensions'

interface CodeMirrorEditorProps
  extends Omit<ReactCodeMirrorProps, 'basicSetup' | 'theme' | 'extensions'> {}

const CodeMirrorEditor = (props: CodeMirrorEditorProps) => {
  const sanityTheme = useTheme()
  const theme = useCodemirrorTheme(sanityTheme)
  return (
    <CodemirrorWrapper>
      <CodeMirror basicSetup={false} theme={theme} extensions={codemirrorExtensions} {...props} />
    </CodemirrorWrapper>
  )
}

export default CodeMirrorEditor
