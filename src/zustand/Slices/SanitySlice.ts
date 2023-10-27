import {ToastContextValue} from '@sanity/ui'
import {SanityClient} from 'sanity'
import {StateCreator} from 'zustand'

export interface SanitySlice {
  client?: SanityClient
  toast?: ToastContextValue
  currentUserCanEdit?: boolean
  setupSanity: (client: SanityClient, toast: ToastContextValue) => void
  setCurrentUserCanEdit: (currentUserCanEdit: boolean) => void
}

export const createSanitySlice: StateCreator<SanitySlice, [], [], SanitySlice> = (set, get) => ({
  setupSanity: (client: SanityClient, toast: ToastContextValue) => set({client, toast}),
  setCurrentUserCanEdit: (currentUserCanEdit: boolean) => set({currentUserCanEdit}),
})
