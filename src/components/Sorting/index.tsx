/* eslint-disable react/jsx-no-bind */
import {SortIcon} from '@sanity/icons'
import {Button, Menu, MenuButton, MenuDivider, MenuItem, Text} from '@sanity/ui'
import {Fragment} from 'react'
import {useGroqSnippetStore} from '../../zustand/store'

export type SortOption = {
  value: string
  label: string
}

export const sortingOptions: SortOption[] = [
  {
    value: 'order(lower(title) asc)',
    label: 'Snippet title: A-Z',
  },
  {
    value: 'order(lower(title) desc)',
    label: 'Snippet title: Z-A',
  },
  {
    value: 'order(lower(description) asc)',
    label: 'Snippet description: A-Z',
  },
  {
    value: 'order(lower(description) desc)',
    label: 'Snippet description: Z-A',
  },
  {
    value: 'order(_createdAt desc)',
    label: 'Last created: Newest first',
  },
  {
    value: 'order(_createdAt asc)',
    label: 'Last created: Oldest first',
  },
  {
    value: 'order(_updatedAt desc)',
    label: 'Last updated: Newest first',
  },
  {
    value: 'order(_updatedAt asc)',
    label: 'Last updated: Oldest first',
  },
]

const Sorting = () => {
  const searchTerm = useGroqSnippetStore((s) => s.searchTerm)
  const filterTags = useGroqSnippetStore((s) => s.filterTags)
  const sortOption = useGroqSnippetStore((s) => s.sortOption)
  const setSortOption = useGroqSnippetStore((s) => s.setSortOption)
  const searchSnippets = useGroqSnippetStore((s) => s.searchSnippets)

  const handleSort = (option: SortOption) => {
    if (sortOption.value === option.value) return
    setSortOption(option)
    searchSnippets(searchTerm, filterTags, option)
  }

  return (
    <MenuButton
      button={
        <Button
          mode="bleed"
          tone="default"
          text={sortOption.label}
          icon={<SortIcon />}
          fontSize={1}
          paddingY={2}
        />
      }
      id="sorting-menu"
      menu={
        <Menu>
          {sortingOptions.map((option, index) => {
            return (
              <Fragment key={option.value}>
                <MenuItem size={0} onClick={() => handleSort(option)}>
                  <Text
                    size={1}
                    style={{fontWeight: sortOption.value === option.value ? 'bold' : 'normal'}}
                  >
                    {option.label}
                  </Text>
                </MenuItem>
                {index % 2 === 1 && index > 0 && index + 1 !== sortingOptions.length ? (
                  <MenuDivider />
                ) : null}
              </Fragment>
            )
          })}
        </Menu>
      }
      popover={{portal: true, placement: 'bottom'}}
    />
  )
}

export default Sorting
