import {useTheme} from '@sanity/ui'
import CodeMirror, {ReactCodeMirrorProps} from '@uiw/react-codemirror'
import {memo} from 'react'
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

export default memo(CodeMirrorEditor)
