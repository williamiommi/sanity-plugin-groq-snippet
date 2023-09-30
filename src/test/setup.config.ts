import '@testing-library/jest-dom'
import {RequestHandler} from 'msw'
import {setupServer} from 'msw/node'
import 'node-fetch'
import {afterAll, afterEach, beforeAll} from 'vitest'

const requestHandlers: RequestHandler[] = []
const mswServer = setupServer(...requestHandlers)

// Start server before all tests
beforeAll(() => mswServer.listen())

// Stop server after all tests
afterAll(() => mswServer.close())

// Reset handlers after each test `important for test isolation`
afterEach(() => mswServer.resetHandlers())
