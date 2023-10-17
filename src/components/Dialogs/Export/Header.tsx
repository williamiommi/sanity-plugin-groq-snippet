import {Flex} from '@sanity/ui'
import ExportIcon from '../../Icons/ExportIcon'

const Header = () => (
  <Flex align="center" gap={4}>
    <ExportIcon />
    <span>Export Snippet(s)</span>
  </Flex>
)

export default Header
