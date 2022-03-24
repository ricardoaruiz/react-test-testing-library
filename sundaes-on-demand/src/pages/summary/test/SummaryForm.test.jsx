import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { SummaryForm } from '../SummaryForm'
import userEvent from '@testing-library/user-event'

describe('<SummaryForm />', () => {
  it('should checkbox is unchecked by default', () => {
    render(<SummaryForm onNextStep={jest.fn()} />)
    const check = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    })
    const button = screen.getByRole('button', { name: /confirm order/i })

    expect(check).toBeInTheDocument()
    expect(check).not.toBeChecked()
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('should enable button when checkbox is checked', () => {
    render(<SummaryForm />)
    const check = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    })
    const button = screen.getByRole('button', { name: /confirm order/i })

    expect(check).not.toBeChecked()
    expect(button).toBeDisabled()

    userEvent.click(check)
    expect(check).toBeChecked()
    expect(button).toBeEnabled()
  })

  it('should diable button when checkbox is unchecked', () => {
    render(<SummaryForm onNextStep={jest.fn()} />)
    const check = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    })
    const button = screen.getByRole('button', { name: /confirm order/i })

    userEvent.click(check)
    expect(check).toBeChecked()
    expect(button).toBeEnabled()

    userEvent.click(check)
    expect(check).not.toBeChecked()
    expect(button).toBeDisabled()
  })

  it('should show popover when "Terms and Conditions" is hovered', async () => {
    render(<SummaryForm onNextStep={jest.fn()} />)

    const termsAndConditions = screen.getByText(/terms and conditions/i)

    expect(
      screen.queryByText(/no ice cream will actually be delivered/i)
    ).not.toBeInTheDocument()

    userEvent.hover(termsAndConditions)

    await waitFor(() => {
      expect(
        screen.getByText(/no ice cream will actually be delivered/i)
      ).toBeInTheDocument()
    })

    userEvent.unhover(termsAndConditions)
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    )
  })

  it('should not call callback function when "Corfirm Order" is disabled and is clicked', () => {
    const mockedOnConfirm = jest.fn()
    render(<SummaryForm onConfirm={mockedOnConfirm} />)
    const check = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    })
    const button = screen.getByRole('button', { name: /confirm order/i })

    expect(check).not.toBeChecked()
    expect(button).toBeDisabled()

    userEvent.click(button)
    expect(mockedOnConfirm).not.toBeCalledTimes(1)
  })

  it('should call callback function when "Corfirm Order" button is clicked', () => {
    const mockedOnConfirm = jest.fn()
    render(<SummaryForm onConfirm={mockedOnConfirm} />)
    const check = screen.getByRole('checkbox', {
      name: /i agree to terms and conditions/i,
    })
    const button = screen.getByRole('button', { name: /confirm order/i })

    expect(check).not.toBeChecked()
    expect(button).toBeDisabled()

    userEvent.click(check)
    expect(check).toBeChecked()
    expect(button).toBeEnabled()

    userEvent.click(button)
    expect(mockedOnConfirm).toBeCalledTimes(1)
  })
})
