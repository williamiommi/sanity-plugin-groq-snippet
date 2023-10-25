/* eslint-disable react/jsx-no-bind */
import {SearchIcon} from '@sanity/icons'
import {Box, TextInput} from '@sanity/ui'
import {FormEvent, useEffect, useState} from 'react'
import useDebounce from '../../hooks/useDebounce'
import {useGroqSnippetStore} from '../../zustand/store'

const SearchInput = () => {
  const [isDirty, setIsDirty] = useState(false)
  const searchTerm = useGroqSnippetStore((s) => s.searchTerm)
  const setSearchTerm = useGroqSnippetStore((s) => s.setSearchTerm)
  const sortOption = useGroqSnippetStore((s) => s.sortOption)
  const debouncedTerm = useDebounce<string>(searchTerm)
  const searchSnippets = useGroqSnippetStore((s) => s.searchSnippets)

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    if (!isDirty) setIsDirty(true)
    setSearchTerm(e.currentTarget.value)
  }

  useEffect(() => {
    if (isDirty) searchSnippets(debouncedTerm, sortOption)
  }, [debouncedTerm, searchSnippets, isDirty, sortOption])

  return (
    <Box paddingTop={4} paddingBottom={2} paddingX={3} style={{width: '100%', maxWidth: '600px'}}>
      <TextInput
        icon={SearchIcon}
        id="search-snippet"
        placeholder="Search snippets..."
        onChange={handleSearch}
        padding={4}
      />
    </Box>
  )
}

export default SearchInput
