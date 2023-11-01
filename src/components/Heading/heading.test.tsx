import {ThemeProvider} from '@sanity/ui'
import {render} from '@testing-library/react'
import {describe, expect, test} from 'vitest'
import Heading from '.'

describe('Heading Component', () => {
  test('it should render', () => {
    const {container} = render(<Heading />, {wrapper: ThemeProvider})
    expect(container).toBeInTheDocument()
  })
})
