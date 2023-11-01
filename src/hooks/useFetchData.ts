import {useEffect} from 'react'
import {useGroqSnippetStore} from '../zustand/store'

const useFetchData = (): void => {
  const fetchData = useGroqSnippetStore((s) => s.fetchData)
  useEffect(() => {
    fetchData()
  }, [fetchData])
}

export default useFetchData
