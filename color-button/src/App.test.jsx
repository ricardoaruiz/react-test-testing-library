import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

const BUTTON_COLORS = {
  RED: {
    'background-color': '#f85656',
  },
  BLUE: {
    'background-color': '#6b6bf7',
  },
}

describe('testing: App component', () => {
  it('button has correct initial color', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: /change to light blue/i })

    expect(button).toHaveStyle(BUTTON_COLORS.RED)
  })

  it('button turns blue when clicked', async () => {
    render(<App />)
    let button = screen.getByRole('button', { name: /change to light blue/i })

    fireEvent.click(button)

    button = screen.getByRole('button', { name: /change to light red/i })
    expect(button).toHaveStyle(BUTTON_COLORS.BLUE)
    expect(button).toHaveTextContent(/change to light red/i)
  })

  it('button is enabled and checkbox is unchecked', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /change to light blue/i })
    const checkbox = screen.getByRole('checkbox', { name: /disable Button/i })

    expect(checkbox).not.toBeChecked()
    expect(button).toBeEnabled()
  })

  it('button is disabled when checkbox is checked on first click and enabled on second click', () => {
    render(<App />)

    const button = screen.getByRole('button', { name: /change to light blue/i })
    const checkbox = screen.getByRole('checkbox', { name: /disable Button/i })

    expect(checkbox).not.toBeChecked()
    expect(button).toBeEnabled()

    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(button).toBeDisabled()
    expect(button).toHaveStyle({
      opacity: '0.5',
      cursor: 'not-allowed',
    })

    fireEvent.click(checkbox)
    expect(checkbox).not.toBeChecked()
    expect(button).toBeEnabled()
  })
})
