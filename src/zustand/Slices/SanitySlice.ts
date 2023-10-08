import {ToastContextValue} from '@sanity/ui'
import {SanityClient} from 'sanity'
import {StateCreator} from 'zustand'

export interface SanitySlice {
  client?: SanityClient
  toast?: ToastContextValue
  setupSanity: (client: SanityClient, toast: ToastContextValue) => void
}

export const createSanitySlice: StateCreator<SanitySlice, [], [], SanitySlice> = (set, get) => ({
  setupSanity: (client: SanityClient, toast: ToastContextValue) => set({client, toast}),
})
