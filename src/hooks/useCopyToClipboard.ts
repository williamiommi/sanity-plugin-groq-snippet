import {useGroqSnippetStore} from '../zustand/store'

type useCopyToClipboardReturn = (value: string | undefined) => void

const useCopyToClipboard = (): useCopyToClipboardReturn => {
  const toastError = useGroqSnippetStore((s) => s.toastError)
  const toastSuccess = useGroqSnippetStore((s) => s.toastSuccess)

  const copy2clipboard = async (value: string | undefined) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      toastSuccess({description: 'Copied to clipboard'})
    } catch (err: unknown) {
      toastError({err})
    }
  }

  return copy2clipboard
}

export default useCopyToClipboard
