import {Flex} from '@sanity/ui'
import styled from 'styled-components'

export const VerticalWrapper = styled(Flex)`
  min-height: 50vh;
`

export const HorizontalWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`

const Column = styled(Flex)`
  width: ${(props) => (props.width ? props.width : '50%')};
  height: 100%;
  overflow-x: hidden;
`

export const LeftColumn = styled(Column)``
export const RightColumn = styled(Column)``

const Row = styled(Flex)`
  height: ${(props) => (props.height ? props.height : '50%')};
  width: 100%;
`
export const TopRow = styled(Row)``
export const BottomRow = styled(Row)``

const DividerShared = styled.span`
  background: var(--card-border-color);
  opacity: 1;
  z-index: 1;
  box-sizing: border-box;
  background-clip: padding-box;
  border: solid transparent;
  &:hover {
    border-color: var(--card-shadow-ambient-color);
  }
`

export const VerticalDivider = styled(DividerShared)`
  width: 11px;
  margin: 0 -5px;
  border-width: 0 5px;
  cursor: col-resize;
  z-index: 2;
`

export const HorizontalDivider = styled(DividerShared)`
  height: 11px;
  margin: -5px 0;
  border-width: 5px 0;
  cursor: row-resize;
  width: 100%;
  z-index: 4;
`
