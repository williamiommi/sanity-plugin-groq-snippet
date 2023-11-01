// /* eslint-disable no-negated-condition */
// import {UploadIcon} from '@sanity/icons'
// import {Button} from '@sanity/ui'
// import Papa from 'papaparse'
// import {ChangeEvent, useRef} from 'react'
// import {parseCsvFile, validateCsvHeader} from '../../lib/csvUtils'
// import {useGroqSnippetStore} from '../../zustand/store'

// export default function FileUpload() {
//   const fileRef = useRef<HTMLInputElement>(null)
//   const toastError = useGroqSnippetStore((s) => s.toastError)

//   const onCompleteCb = ({errors, data}: Papa.ParseResult<string[]>) => {
//     if (errors.length > 0)
//       toastError({description: errors.map((error) => error.message).join('<br />')})
//     else if (data.length <= 1) toastError({description: 'Csv file has a wrong format'})
//     else if (!validateCsvHeader(data[0]))
//       toastError({description: 'Csv first row has wrong headers'})
//     else {
//       // parsing data and create rows
//     }
//   }

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const uploadedFile = e.target.files && e.target.files[0]
//     if (uploadedFile) {
//       parseCsvFile<string[]>(uploadedFile, onCompleteCb)
//     }
//   }

//   return (
//     <>
//       <input
//         accept=".csc, text/csv"
//         ref={fileRef}
//         type="file"
//         autoComplete="off"
//         tabIndex={-1}
//         style={{display: 'none'}}
//         onChange={handleFileChange}
//       />
//       <Button
//         mode="ghost"
//         tone="primary"
//         fontSize={1}
//         icon={UploadIcon}
//         text="Import .csv"
//         onClick={() => fileRef.current?.click()}
//       />
//     </>
//   )
// }
