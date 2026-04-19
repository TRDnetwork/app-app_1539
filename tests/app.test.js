import { render, screen, fireEvent } from '@testing-library/react'
import App from '../src/App'

describe('Portfolio Pro App', () => {
  beforeEach(() => {
    render(<App />)
  })

  test('renders hero section with name and role', () => {
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
    expect(screen.getByText('Full-Stack Developer & UI Designer crafting meaningful digital experiences with code and creativity.')).toBeInTheDocument()
  })

  test('renders about section with descriptive paragraph', () => {
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText(/I'm a passionate developer with over 5 years of experience/)).toBeInTheDocument()
  })

  test('displays three project cards in responsive grid', () => {
    const projects = screen.getAllByText(/View Project/i)
    expect(projects).toHaveLength(3)
    
    const projectTitles = ['EcoTrack', 'TaskFlow', 'PaletteAI']
    projectTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  })

  test('contact form shows validation errors for empty submission', () => {
    const submitButton = screen.getByRole('button', { name: /Send Message/i })
    fireEvent.click(submitButton)
    
    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is invalid')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
  })

  test('contact form shows success toast after valid submission', () => {
    fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'This is a test message' } })
    
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }))
    
    expect(screen.getByText('Message sent successfully!')).toBeInTheDocument()
  })
})