import {ToastContextValue} from '@sanity/ui'
import {SanityClient} from 'sanity'
import {StateCreator} from 'zustand'
import {TOOL_TITLE} from '../../lib/constants'

export interface SanitySlice {
  client?: SanityClient
  toast?: ToastContextValue
  currentUserCanEdit?: boolean
  toolName: string
  setupSanity: (client: SanityClient, toast: ToastContextValue) => void
  setToolName: (toolName: string) => void
  setCurrentUserCanEdit: (currentUserCanEdit: boolean) => void
}

export const createSanitySlice: StateCreator<SanitySlice, [], [], SanitySlice> = (set, get) => ({
  toolName: TOOL_TITLE,
  setupSanity: (client: SanityClient, toast: ToastContextValue) => set({client, toast}),
  setToolName: (toolName: string) => set({toolName}),
  setCurrentUserCanEdit: (currentUserCanEdit: boolean) => set({currentUserCanEdit}),
})
