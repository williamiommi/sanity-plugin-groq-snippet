/* eslint-disable no-param-reassign */
import {ToastContextValue} from '@sanity/ui'
import SimpleHtmlRenderer from '../components/SimpleHtmlRenderer'

interface ToastObj {
  err?: any
  description?: string
}

export const toastError = (
  toast: ToastContextValue,
  title: string,
  {err, description}: ToastObj,
): void => {
  if (typeof err === 'string') {
    description = err
  } else if (err instanceof Error) {
    description = err.message
  }
  if (err) console.error(err)
  if (toast)
    toast.push({
      status: 'error',
      title,
      description: SimpleHtmlRenderer({html: description}),
    })
}

export const toastSuccess = (
  toast: ToastContextValue,
  title: string,
  {description}: ToastObj,
): void => {
  if (toast)
    toast.push({
      status: 'success',
      title,
      description: SimpleHtmlRenderer({html: description}),
    })
}
