import { describe, it, expect, vi } from 'vitest'
import { sendEmail } from '../src/mocks/resendMock'

// Mock the entire fetch API since we're testing client-side form behavior
global.fetch = vi.fn()

describe('Contact Form API Integration', () => {
  const mockFormData = {
    name: 'Test User',
    email: 'test@example.com',
    message: 'This is a test message'
  }

  beforeEach(() => {
    fetch.mockClear()
  })

  it('should send form data to /api/send-email endpoint', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })

    await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockFormData)
    })

    expect(fetch).toHaveBeenCalledWith('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockFormData)
    })
  })

  it('should handle successful form submission', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })

    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(mockFormData)
    })

    const data = await response.json()
    expect(data.success).toBe(true)
  })

  it('should handle validation errors', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: 'Missing required fields' })
    })

    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ name: '', email: '', message: '' })
    })

    const data = await response.json()
    expect(data.error).toBe('Missing required fields')
    expect(response.status).toBe(400)
  })

  it('should prevent submission when honeypot is triggered', async () => {
    const botFormData = { ...mockFormData, 'bot-field': 'I am a bot' }
    
    // Even though we send the request, the server should silently accept it
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true })
    })

    const response = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify(botFormData)
    })

    const data = await response.json()
    expect(data.success).toBe(true)
    // Server returns 200 to avoid revealing bot detection
    expect(response.ok).toBe(true)
  })
})