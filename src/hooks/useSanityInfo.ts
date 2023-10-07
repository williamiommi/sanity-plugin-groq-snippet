import {ToastContextValue, useToast} from '@sanity/ui'
import {SanityClient, useClient} from 'sanity'

type useSanityInfoProps = {
  client: SanityClient
  toast: ToastContextValue
}

const useSanityInfo = (): useSanityInfoProps => {
  const client = useClient({apiVersion: '2021-06-07'})
  const toast = useToast()
  return {client, toast}
}

export default useSanityInfo
