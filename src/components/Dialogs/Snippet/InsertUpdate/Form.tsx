/* eslint-disable react/jsx-no-bind */
import {CloseIcon} from '@sanity/icons'
import {Badge, Flex, Select, Text, TextArea, TextInput} from '@sanity/ui'
import {FormEvent, useMemo} from 'react'
import GroqSnippetTag from '../../../../types/GroqSnippetTag'

interface FormProps {
  title: string | undefined
  description: string | undefined
  formTags: GroqSnippetTag[] | undefined
  onChangeTitle: (value: string) => void
  onChangeDescription: (value: string) => void
  onSelectTag: (value: string) => void
}

const Form = ({
  title,
  description,
  formTags,
  onChangeTitle,
  onChangeDescription,
  onSelectTag,
}: FormProps) => {
  const noTagsAvailable = useMemo(() => {
    if (!formTags) return true
    return formTags.every((t) => t.checked)
  }, [formTags])

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
    <Flex direction="column" margin={4} gap={4} style={{width: '100%', minWidth: '100px'}}>
      <Flex direction="column" gap={2}>
        <Text as="label" htmlFor="title" weight="semibold" size={1}>
          Title *
        </Text>
        <TextInput id="title" onChange={handleChangeTitle} defaultValue={title} />
      </Flex>
      <Flex direction="column" gap={2}>
        <Text as="label" htmlFor="description" weight="semibold" size={1}>
          Description
        </Text>
        <TextArea
          id="description"
          rows={4}
          onChange={handleChangeDescription}
          defaultValue={description}
        />
      </Flex>
      <Flex direction="column" gap={2}>
        <Text as="label" htmlFor="tags" weight="semibold" size={1}>
          Tags
        </Text>
        {formTags && (
          <>
            <Select id="tags" onChange={handleSelectTag} disabled={noTagsAvailable}>
              <option>{noTagsAvailable ? 'No tags remaining' : 'Select tag...'}</option>
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
      </Flex>
    </Flex>
  )
}

export default Form
