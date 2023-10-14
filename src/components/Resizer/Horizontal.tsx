import {ReactNode, useEffect, useRef} from 'react'
import {horizontalResizer} from '../../lib/resizerUtils'
import {BottomRow, HorizontalDivider, HorizontalWrapper, TopRow} from '../Styles'

interface HorizontalProps {
  topNode: ReactNode
  bottomNode: ReactNode
  topHeight: string | undefined
  bottomHeight: string | undefined
}

const Horizontal = ({topHeight, bottomHeight, topNode, bottomNode}: HorizontalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const topRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && topRef.current && dividerRef.current && bottomRef.current) {
      horizontalResizer(
        wrapperRef.current,
        topRef.current,
        dividerRef.current,
        bottomRef.current,
        topHeight,
        bottomHeight,
      )
    }
  }, [])

  return (
    <HorizontalWrapper ref={wrapperRef}>
      <TopRow ref={topRef} customHeight={topHeight}>
        {topNode}
      </TopRow>
      <HorizontalDivider ref={dividerRef} />
      <BottomRow ref={bottomRef} customHeight={bottomHeight}>
        {bottomNode}
      </BottomRow>
    </HorizontalWrapper>
  )
}

export default Horizontal
