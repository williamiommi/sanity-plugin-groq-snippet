// import {Box, Dialog, Flex, Text} from '@sanity/ui'
// import {useGroqSnippetStore} from '../../../zustand/store'
// import GenerateCsvCta from '../../GenerateCsvCta'
// import Header from './Header'

// const DialogExport = () => {
//   const isExportDialogOpen = useGroqSnippetStore((s) => s.isExportDialogOpen)
//   const closeExportDialog = useGroqSnippetStore((s) => s.closeExportDialog)

//   if (!isExportDialogOpen) return null

//   return (
//     <Dialog id="export-dialog" header={<Header />} onClose={closeExportDialog}>
//       <Box margin={4}>
//         <Text size={1}>Generate export data of the selected snippets</Text>
//       </Box>
//       <Flex margin={4} direction="column" align="center" justify="center" gap={3}>
//         <GenerateCsvCta />
//       </Flex>
//     </Dialog>
//   )
// }

// export default DialogExport
