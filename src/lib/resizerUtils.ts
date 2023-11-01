/* eslint-disable max-params */
export const verticalResizer = (
  wrapperEl: HTMLDivElement,
  leftEl: HTMLDivElement,
  dividerEl: HTMLDivElement,
  rightEl: HTMLDivElement,
  initialLeftWidth: string = '50%',
  initialRightWidth: string = '50%',
): void => {
  let condition = 'off'
  let pageX: number
  let leftWidth: number
  let rightWidth: number

  const moveDivs = (event: MouseEvent) => {
    if (condition === 'on') {
      const newPx = parseInt(`${event.pageX - pageX}`, 10)
      const newLeftWidth = parseInt(`${leftWidth + newPx}`, 10)
      const newRightWidth = parseInt(`${rightWidth - newPx}`, 10)
      leftEl.style.width = `${newLeftWidth <= 10 ? 10 : newLeftWidth}px`
      rightEl.style.width = `${newRightWidth <= 10 ? 10 : newRightWidth}px`
    }
  }

  wrapperEl.addEventListener('mouseup', () => {
    condition = 'off'
  })

  wrapperEl.addEventListener('mouseleave', () => {
    condition = 'off'
  })

  dividerEl.addEventListener('mousedown', (e) => {
    condition = 'on'
    pageX = e.pageX
    leftWidth = leftEl.offsetWidth
    rightWidth = rightEl.offsetWidth
  })

  dividerEl.addEventListener('dblclick', () => {
    leftEl.style.width = initialLeftWidth
    rightEl.style.width = initialRightWidth
  })

  wrapperEl.addEventListener('mousemove', (e) => {
    moveDivs(e)
  })
}

export const horizontalResizer = (
  wrapperEl: HTMLElement,
  topEl: HTMLElement,
  dividerEl: HTMLElement,
  bottomEl: HTMLElement,
  initialTopHeight: string = '50%',
  initialBottomHeight: string = '50%',
): void => {
  let condition = 'off'
  let pageY: number
  let topHeight: number
  let bottomHeight: number

  const moveDivs = (event: MouseEvent) => {
    if (condition === 'on') {
      const newPageY = parseInt(`${event.pageY - pageY}`, 10)
      const newtopHeight = parseInt(`${topHeight + newPageY}`, 10)
      const newRightHeight = parseInt(`${bottomHeight - newPageY}`, 10)
      topEl.style.height = `${newtopHeight <= 10 ? 10 : newtopHeight}px`
      bottomEl.style.height = `${newRightHeight <= 10 ? 10 : newRightHeight}px`
    }
  }

  wrapperEl.addEventListener('mouseup', () => {
    condition = 'off'
  })

  wrapperEl.addEventListener('mouseleave', () => {
    condition = 'off'
  })

  dividerEl.addEventListener('mousedown', (e) => {
    condition = 'on'
    pageY = e.pageY
    topHeight = topEl.offsetHeight
    bottomHeight = bottomEl.offsetHeight
  })

  dividerEl.addEventListener('dblclick', () => {
    topEl.style.height = initialTopHeight
    bottomEl.style.height = initialBottomHeight
  })

  wrapperEl.addEventListener('mousemove', (e) => {
    moveDivs(e)
  })
}
