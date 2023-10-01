import {ToastContextValue} from '@sanity/ui'

interface ToastObj {
  toast: ToastContextValue
  err?: any
  title?: string
  description?: string
}

export const toastError = (props: ToastObj): void => {
  const title = props.title || 'Something went wrong'
  let description
  if (typeof props.err === 'string') {
    description = props.err
  } else if (props.err instanceof Error) {
    description = props.err.message
  } else {
    description = props.description
  }
  if (props.err) console.error(props.err)
  if (props.toast) props.toast.push({status: 'error', title, description})
}

export const toastSuccess = (props: ToastObj): void => {
  props.toast.push({status: 'success', title: props.title, description: props.description})
}
