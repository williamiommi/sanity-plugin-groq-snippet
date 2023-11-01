/* eslint-disable react/jsx-no-bind */
import {CloseIcon, ControlsIcon, SearchIcon} from '@sanity/icons'
import {Badge, Box, Button, Flex, Menu, MenuButton, MenuItem, Text, TextInput} from '@sanity/ui'
import {FormEvent, useEffect, useState} from 'react'
import useDebounce from '../../hooks/useDebounce'
import GroqSnippetTag from '../../types/GroqSnippetTag'
import {useGroqSnippetStore} from '../../zustand/store'

const SearchInput = () => {
  const [isDirty, setIsDirty] = useState(false)
  const searchTerm = useGroqSnippetStore((s) => s.searchTerm)
  const setSearchTerm = useGroqSnippetStore((s) => s.setSearchTerm)
  const filterTags = useGroqSnippetStore((s) => s.filterTags)
  const setFilterTags = useGroqSnippetStore((s) => s.setFilterTags)
  const sortOption = useGroqSnippetStore((s) => s.sortOption)
  const debouncedTerm = useDebounce<string>(searchTerm)
  const searchSnippets = useGroqSnippetStore((s) => s.searchSnippets)
  const tags = useGroqSnippetStore((s) => s.tags)

  const handleSearch = (e: FormEvent<HTMLInputElement>) => {
    if (!isDirty) setIsDirty(true)
    setSearchTerm(e.currentTarget.value)
  }

  const handleTagFilterAdd = (tag: GroqSnippetTag) => {
    if (!isDirty) setIsDirty(true)
    const hasTag = filterTags.find((t) => t._id === tag._id)
    if (!hasTag) {
      const newState = [...filterTags, tag]
      setFilterTags(newState)
    }
  }

  const handleTagFilterRemove = (id: string) => {
    setFilterTags(filterTags.filter((curr) => curr._id !== id))
  }

  useEffect(() => {
    if (isDirty) searchSnippets(debouncedTerm, filterTags, sortOption)
  }, [debouncedTerm, searchSnippets, isDirty, filterTags, sortOption])

  return (
    <Box paddingX={3}>
      <Flex
        align="center"
        gap={2}
        paddingTop={4}
        paddingBottom={2}
        style={{width: '100%', maxWidth: '600px'}}
      >
        <TextInput
          icon={SearchIcon}
          id="search-snippet"
          placeholder="Search snippets..."
          onChange={handleSearch}
          padding={4}
          autoComplete="off"
          style={{minWidth: '500px'}}
        />
        <MenuButton
          button={
            <Button mode="bleed" tone="default" icon={<ControlsIcon />} text="Tags" fontSize={1} />
          }
          id="sorting-menu"
          menu={
            <Menu style={{maxHeight: '300px'}}>
              {tags.map((tag) => {
                return (
                  <MenuItem size={0} key={tag._id} onClick={() => handleTagFilterAdd(tag)}>
                    <Text size={1}>{tag.name.current}</Text>
                  </MenuItem>
                )
              })}
            </Menu>
          }
          popover={{portal: true, placement: 'right'}}
        />
      </Flex>
      {filterTags.length > 0 && (
        <Flex align="center" gap={2} marginY={2}>
          {filterTags.map((tag) => (
            <Badge
              key={tag._id}
              tone="default"
              tabIndex={0}
              fontSize={0}
              padding={2}
              onClick={() => handleTagFilterRemove(tag._id)}
              style={{cursor: 'pointer'}}
            >
              {tag.name.current} <CloseIcon />
            </Badge>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default SearchInput
