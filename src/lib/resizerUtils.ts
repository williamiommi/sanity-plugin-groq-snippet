export const verticalResizer = (
  wrapperEl: HTMLDivElement,
  leftEl: HTMLDivElement,
  dividerEl: HTMLDivElement,
  rightEl: HTMLDivElement,
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
    leftEl.style.width = '50%'
    rightEl.style.width = '50%'
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
    topEl.style.height = '50%'
    bottomEl.style.height = '50%'
  })

  wrapperEl.addEventListener('mousemove', (e) => {
    moveDivs(e)
  })
}
