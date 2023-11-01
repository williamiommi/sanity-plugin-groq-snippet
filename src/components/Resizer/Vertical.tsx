import {ReactNode, useEffect, useRef} from 'react'
import {verticalResizer} from '../../lib/resizerUtils'
import {LeftColumn, RightColumn, VerticalDivider, VerticalWrapper} from '../Styles'

interface VerticalProps {
  leftNode: ReactNode
  rightNode: ReactNode
  leftWidth: string | undefined
  rightWidth: string | undefined
}

const Vertical = ({leftWidth, rightWidth, leftNode, rightNode}: VerticalProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && leftRef.current && dividerRef.current && rightRef.current) {
      verticalResizer(
        wrapperRef.current,
        leftRef.current,
        dividerRef.current,
        rightRef.current,
        leftWidth,
        rightWidth,
      )
    }
  }, [])

  return (
    <VerticalWrapper ref={wrapperRef}>
      <LeftColumn ref={leftRef} customWidth={leftWidth}>
        {leftNode}
      </LeftColumn>
      <VerticalDivider ref={dividerRef} />
      <RightColumn ref={rightRef} customWidth={rightWidth}>
        {rightNode}
      </RightColumn>
    </VerticalWrapper>
  )
}

export default Vertical
