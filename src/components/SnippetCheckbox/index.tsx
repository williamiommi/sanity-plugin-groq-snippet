/* eslint-disable react/jsx-no-bind */
import {Checkbox, Flex} from '@sanity/ui'
import GroqSnippet from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'
import {tableWidth} from '../SnippetsTable'

interface SnippetCheckboxProps {
  snippet: GroqSnippet
}

const SnippetCheckbox = ({snippet}: SnippetCheckboxProps) => {
  const snippets = useGroqSnippetStore((s) => s.snippets)
  const setSnippets = useGroqSnippetStore((s) => s.setSnippets)

  const handleCheckbox = () => {
    setSnippets(
      snippets!.map((current) => ({
        ...current,
        checked: current._id === snippet._id ? !current.checked : current.checked,
      })),
    )
  }

  return (
    <Flex align="center" justify="center" style={{width: tableWidth.checkbox}}>
      <Checkbox
        id={`snippet-${snippet._id}`}
        checked={!!snippet.checked}
        onChange={handleCheckbox}
      />
    </Flex>
  )
}

export default SnippetCheckbox
