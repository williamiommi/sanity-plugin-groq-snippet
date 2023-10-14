/* eslint-disable react/jsx-no-bind */
import {SearchIcon} from '@sanity/icons'
import {Box, TextInput} from '@sanity/ui'
import {FormEvent, useEffect, useState} from 'react'
import useDebounce from '../../hooks/useDebounce'
import {useGroqSnippetStore} from '../../zustand/store'

const SearchInput = () => {
  const [term, setTerm] = useState<string>('')
  const debouncedTerm = useDebounce<string>(term)
  const client = useGroqSnippetStore((s) => s.client)
  const searchSnippets = useGroqSnippetStore((s) => s.searchSnippets)

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    setTerm(e.currentTarget.value)
  }

  useEffect(() => {
    if (searchSnippets && client) searchSnippets(debouncedTerm)
  }, [debouncedTerm, searchSnippets, client])

  return (
    <Box marginY={4} style={{minWidth: '200', maxWidth: '30%'}}>
      <TextInput
        icon={SearchIcon}
        id="search-snippet"
        placeholder="Search snippets..."
        onChange={handleSearch}
      />
    </Box>
  )
}

export default SearchInput
