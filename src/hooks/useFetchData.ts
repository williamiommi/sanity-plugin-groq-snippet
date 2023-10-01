import {useToast} from '@sanity/ui'
import {useEffect} from 'react'
import {useClient} from 'sanity'
import {useGroqSnippetStore} from '../zustand/store'

const useFetchData = (): void => {
  const client = useClient({apiVersion: '2021-06-07'})
  const toast = useToast()
  const fetchData = useGroqSnippetStore((s) => s.fetchData)
  useEffect(() => {
    fetchData(client, toast)
  }, [client, fetchData, toast])
}

export default useFetchData
