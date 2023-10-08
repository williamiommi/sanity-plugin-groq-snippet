import {useToast} from '@sanity/ui'
import {useEffect} from 'react'
import {useClient} from 'sanity'
import {useGroqSnippetStore} from '../zustand/store'

const useSetupTool = (): void => {
  const client = useClient({apiVersion: '2021-06-07'})
  const toast = useToast()
  const setupSanity = useGroqSnippetStore((s) => s.setupSanity)
  const fetchData = useGroqSnippetStore((s) => s.fetchData)

  useEffect(() => {
    setupSanity(client, toast)
    fetchData()
  }, [setupSanity, client, toast, fetchData])
}

export default useSetupTool
