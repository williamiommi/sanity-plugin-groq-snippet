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
    <Flex
      role="button"
      align="center"
      justify="center"
      style={{cursor: 'pointer', width: tableWidth.checkbox, height: '100%', alignSelf: 'center'}}
      onClick={handleCheckbox}
    >
      <Checkbox id={`snippet-${snippet._id}`} checked={snippet.checked} onChange={handleCheckbox} />
    </Flex>
  )
}

export default SnippetCheckbox
