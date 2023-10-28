import {toastError, toastSuccess} from '../lib/toastUtils'
import {useGroqSnippetStore} from '../zustand/store'

type useCopyToClipboardReturn = (value: string | undefined) => void

const useCopyToClipboard = (): useCopyToClipboardReturn => {
  const toast = useGroqSnippetStore((s) => s.toast)
  const toolName = useGroqSnippetStore((s) => s.toolName)

  const copy2clipboard = async (value: string | undefined) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      toastSuccess(toast!, toolName, {description: 'Copied to clipboard'})
    } catch (err: unknown) {
      toastError(toast!, toolName, {err})
    }
  }

  return copy2clipboard
}

export default useCopyToClipboard
