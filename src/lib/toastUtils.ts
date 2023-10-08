/* eslint-disable no-param-reassign */
import {ToastContextValue} from '@sanity/ui'

const TOAST_TITLE = 'Groq Snippet Tool'

interface ToastObj {
  err?: any
  description?: string
}

export const toastError = (toast: ToastContextValue, {err, description}: ToastObj): void => {
  if (typeof err === 'string') {
    description = err
  } else if (err instanceof Error) {
    description = err.message
  }
  if (err) console.error(err)
  if (toast) toast.push({status: 'error', title: TOAST_TITLE, description})
}

export const toastSuccess = (toast: ToastContextValue, {description}: ToastObj): void => {
  if (toast) toast.push({status: 'success', title: TOAST_TITLE, description})
}
