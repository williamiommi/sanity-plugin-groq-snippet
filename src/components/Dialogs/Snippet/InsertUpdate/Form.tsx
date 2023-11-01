/* eslint-disable react/jsx-no-bind */
import {CloseIcon} from '@sanity/icons'
import {Badge, Box, Flex, Select, Text, TextInput} from '@sanity/ui'
import {FormEvent, useMemo} from 'react'
import {transformToLocaleDate} from '../../../../lib/dateUtils'
import GroqSnippetTag from '../../../../types/GroqSnippetTag'
import {useGroqSnippetStore} from '../../../../zustand/store'
import {TextAreaWrapper} from '../../../Styles'

interface FormProps {
  title: string | undefined
  description: string | undefined
  formTags: GroqSnippetTag[] | undefined
  createdAt: string | undefined
  updatedAt: string | undefined
  onChangeTitle: (value: string) => void
  onChangeDescription: (value: string) => void
  onSelectTag: (value: string) => void
}

const Form = ({
  title,
  description,
  formTags,
  createdAt,
  updatedAt,
  onChangeTitle,
  onChangeDescription,
  onSelectTag,
}: FormProps) => {
  const currentUserCanEdit = useGroqSnippetStore((s) => s.currentUserCanEdit)
  const noTagsAvailable = useMemo(() => {
    if (!formTags) return true
    return formTags.every((t) => t.checked)
  }, [formTags])

  const localeCreatedAt = useMemo(() => transformToLocaleDate(createdAt), [createdAt])
  const localeUpdatedAt = useMemo(() => transformToLocaleDate(updatedAt), [updatedAt])

  const handleChangeTitle = (e: FormEvent<HTMLInputElement>) => {
    onChangeTitle(e.currentTarget.value)
  }

  const handleChangeDescription = (e: FormEvent<HTMLTextAreaElement>) => {
    onChangeDescription(e.currentTarget.value)
  }

  const handleSelectTag = (e: FormEvent<HTMLSelectElement> | string) => {
    onSelectTag(typeof e === 'string' ? e : e.currentTarget.value)
  }

  return (
    <Flex
      direction="column"
      justify="space-between"
      gap={2}
      style={{width: '100%', minWidth: '100px'}}
    >
      <Box style={{padding: '1.25rem'}}>
        <Box style={{marginBottom: '1.25rem'}}>
          <Text
            as="label"
            htmlFor="title"
            weight="semibold"
            size={1}
            style={{marginBottom: '0.5rem'}}
          >
            Title *
          </Text>
          <TextInput
            id="title"
            onChange={handleChangeTitle}
            defaultValue={title}
            disabled={!currentUserCanEdit}
          />
        </Box>
        <Box style={{marginBottom: '1.25rem'}}>
          <Text
            as="label"
            htmlFor="description"
            weight="semibold"
            size={1}
            style={{marginBottom: '0.5rem'}}
          >
            Description
          </Text>
          <TextAreaWrapper
            id="description"
            rows={7}
            onChange={handleChangeDescription}
            defaultValue={description}
            disabled={!currentUserCanEdit}
          />
        </Box>
        <Box style={{marginBottom: '1.25rem'}}>
          <Text
            as="label"
            htmlFor="description"
            weight="semibold"
            size={1}
            style={{marginBottom: '0.5rem'}}
          >
            Tags
          </Text>
          {formTags && (
            <>
              <Select
                id="tags"
                onChange={handleSelectTag}
                disabled={!currentUserCanEdit || noTagsAvailable}
              >
                <option>{noTagsAvailable ? 'No tags available' : 'Select tag...'}</option>
                {formTags
                  .filter((t) => !t.checked)
                  .map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name.current}
                    </option>
                  ))}
              </Select>
              <Flex gap={2} marginY={2} wrap="wrap">
                {formTags
                  .filter((t) => t.checked)
                  .map((t) => (
                    <Badge
                      key={t._id}
                      tone="primary"
                      tabIndex={0}
                      fontSize={0}
                      padding={2}
                      onClick={() => handleSelectTag(t._id)}
                      style={{cursor: 'pointer'}}
                    >
                      {t.name.current} <CloseIcon />
                    </Badge>
                  ))}
              </Flex>
            </>
          )}
        </Box>
      </Box>
      <Box style={{padding: '1.25rem'}}>
        <Flex direction="column" align="flex-end" gap={2}>
          {localeCreatedAt && (
            <Text size={1} muted>
              <strong>Created at:</strong> {localeCreatedAt}
            </Text>
          )}
          {localeUpdatedAt && localeCreatedAt !== localeUpdatedAt && (
            <Text size={1} muted>
              <strong>Updated at:</strong> {localeUpdatedAt}
            </Text>
          )}
        </Flex>
      </Box>
    </Flex>
  )
}

export default Form
