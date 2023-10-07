import {useEffect} from 'react'
import {useGroqSnippetStore} from '../zustand/store'
import useSanityInfo from './useSanityInfo'

const useFetchData = (): void => {
  const {client, toast} = useSanityInfo()
  const fetchData = useGroqSnippetStore((s) => s.fetchData)
  useEffect(() => {
    fetchData(client, toast)
  }, [client, fetchData, toast])
}

export default useFetchData
