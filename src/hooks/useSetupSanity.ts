import {useToast} from '@sanity/ui'
import {useEffect} from 'react'
import {useClient} from 'sanity'
import {useGroqSnippetStore} from '../zustand/store'

const useSetupSanity = (): void => {
  const client = useClient({apiVersion: '2021-06-07'})
  const toast = useToast()
  const setupSanity = useGroqSnippetStore((s) => s.setupSanity)

  useEffect(() => {
    setupSanity(client, toast)
  }, [setupSanity, client, toast])
}

export default useSetupSanity
