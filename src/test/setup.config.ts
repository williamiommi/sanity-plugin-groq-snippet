import '@testing-library/jest-dom'
import {RequestHandler} from 'msw'
import {setupServer} from 'msw/node'
import {afterAll, afterEach, beforeAll, beforeEach, vi} from 'vitest'
import 'whatwg-fetch'
import {useGroqSnippetStore} from '../zustand/store'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

const originalStore = useGroqSnippetStore.getState()

const requestHandlers: RequestHandler[] = []
const mswServer = setupServer(...requestHandlers)

// Start server before all tests
beforeAll(() => mswServer.listen({onUnhandledRequest: 'error'}))

// Stop server after all tests
afterAll(() => mswServer.close())

// reset zustand store on every test
beforeEach(() => useGroqSnippetStore.setState(originalStore))

// Reset handlers after each test `important for test isolation`
afterEach(() => mswServer.resetHandlers())
