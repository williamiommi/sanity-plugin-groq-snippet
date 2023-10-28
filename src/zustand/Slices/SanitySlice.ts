/* eslint-disable no-param-reassign */
import {ToastContextValue} from '@sanity/ui'
import {SanityClient} from 'sanity'
import {StateCreator} from 'zustand'
import SimpleHtmlRenderer from '../../components/SimpleHtmlRenderer'
import {TOOL_TITLE} from '../../lib/constants'
import ToastMessage from '../../types/ToastMessage'

export interface SanitySlice {
  client?: SanityClient
  toast?: ToastContextValue
  currentUserCanEdit?: boolean
  toolName: string
  setupSanity: (client: SanityClient, toast: ToastContextValue) => void
  setToolName: (toolName: string) => void
  setCurrentUserCanEdit: (currentUserCanEdit: boolean) => void
  toastError: (toastMessage: ToastMessage) => void
  toastSuccess: (toastMessage: ToastMessage) => void
}

export const createSanitySlice: StateCreator<SanitySlice, [], [], SanitySlice> = (set, get) => ({
  toolName: TOOL_TITLE,
  setupSanity: (client: SanityClient, toast: ToastContextValue) => set({client, toast}),
  setToolName: (toolName: string) => set({toolName}),
  setCurrentUserCanEdit: (currentUserCanEdit: boolean) => set({currentUserCanEdit}),
  toastError: ({err, description}: ToastMessage) => {
    const toast = get().toast
    if (typeof err === 'string') {
      description = err
    } else if (err instanceof Error) {
      description = err.message
    }
    if (err) console.error(err)
    if (toast)
      toast.push({
        status: 'error',
        title: get().toolName,
        description: SimpleHtmlRenderer({html: description}),
      })
  },
  toastSuccess: ({description}: ToastMessage) => {
    const toast = get().toast
    if (toast)
      toast.push({
        status: 'success',
        title: get().toolName,
        description: SimpleHtmlRenderer({html: description}),
      })
  },
})
