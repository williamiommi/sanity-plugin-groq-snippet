import {Flex, rem} from '@sanity/ui'
import styled from 'styled-components'

export const CodemirrorWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  overflow: clip;
  position: relative;
  display: flex;

  & .cm-theme {
    width: 100%;
  }

  & .cm-editor {
    height: 100%;

    font-size: 0.875rem;
    line-height: 21px;
  }

  & .cm-line {
    padding-left: ${({theme}) => rem(theme.sanity.space[3])};
  }

  & .cm-content {
    border-right-width: ${({theme}) => rem(theme.sanity.space[4])} !important;
    padding-top: 0;
  }
`

export const VerticalWrapper = styled(Flex)`
  min-height: 70vh;
  max-height: 70vh;
  height: 100%;
`

export const HorizontalWrapper = styled(Flex)`
  width: 100%;
  height: 100%;
  flex-direction: column;
`

const Column = styled(Flex)<{customWidth: string | undefined}>`
  width: ${(props) => (props.customWidth ? props.customWidth : '50%')};
  height: 100%;
  overflow-x: hidden;
`

export const LeftColumn = styled(Column)``
export const RightColumn = styled(Column)``

const Row = styled(Flex)<{customHeight: string | undefined}>`
  height: ${(props) => (props.customHeight ? props.customHeight : '50%')};
  width: 100%;
  overflow-y: hidden;
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
