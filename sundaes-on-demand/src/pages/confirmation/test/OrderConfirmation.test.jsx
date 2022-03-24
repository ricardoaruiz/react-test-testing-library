import { render, renderWithContext, screen } from '../../../utils/test'
import userEvent from '@testing-library/user-event'

import { OrderConfirmation } from '../OrderConfirmation'

describe('<OrderConfirmation />', () => {
  it('should be render successfuly with order number received from server', async () => {
    render(<OrderConfirmation onNextStep={jest.fn()} />)

    const title = await screen.findByRole('heading', { name: /thank you!/i })
    expect(title).toBeInTheDocument()

    const orderNumber = await screen.findByRole('heading', {
      name: /your order number is 8759015682/i,
    })
    expect(orderNumber).toBeInTheDocument()

    const button = await screen.findByRole('button', {
      name: /create new order/i,
    })
    expect(button).toBeInTheDocument()
  })

  it('should be call callback function when "Create new order" button is clicked', async () => {
    const mockedOnNextStep = jest.fn()
    renderWithContext(<OrderConfirmation onNextStep={mockedOnNextStep} />)

    const button = await screen.findByRole('button', {
      name: /create new order/i,
    })
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    expect(mockedOnNextStep).toHaveBeenCalledTimes(1)
  })
})
