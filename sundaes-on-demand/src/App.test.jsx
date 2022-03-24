import { renderWithContext, screen } from './utils/test'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('<App />', () => {
  it('should be show in-progress step in first render', async () => {
    renderWithContext(<App />)

    const title = screen.getByRole('heading', { name: /design your sundae!/i })
    expect(title).toBeInTheDocument()

    const scoopsTitle = await screen.findByRole('heading', { name: /scoops/i })
    expect(scoopsTitle).toBeInTheDocument()

    const toppingsTitle = await screen.findByRole('heading', {
      name: /toppings/i,
    })
    expect(toppingsTitle).toBeInTheDocument()

    const orderSundaeButton = await screen.findByRole('button', {
      name: /order sundae/i,
    })
    expect(orderSundaeButton).toBeInTheDocument()
  })

  it('should be show review step when "Order Summary" button is clicked', async () => {
    renderWithContext(<App />)

    const vanillaScoop = await screen.findByRole('spinbutton', {
      name: /vanilla/i,
    })
    userEvent.clear(vanillaScoop)
    userEvent.type(vanillaScoop, '1')

    const hotFudgeCheckbox = await screen.findByRole('checkbox', {
      name: /hot fudge/i,
    })
    userEvent.click(hotFudgeCheckbox)

    const orderSundaeButton = await screen.findByRole('button', {
      name: /order sundae/i,
    })
    expect(orderSundaeButton).toBeInTheDocument()
    userEvent.click(orderSundaeButton)

    const orderSummaryTitle = await screen.findByRole('heading', {
      name: /order summary/i,
    })
    expect(orderSummaryTitle).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: /scoops: \$2\.00/i,
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /toppings: \$0\.50/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /total \$2\.50/i })
    ).toBeInTheDocument()

    expect(screen.getByText(/1 vanilla/i)).toBeInTheDocument()
    expect(screen.getByText(/hot fudge/i)).toBeInTheDocument()

    const tcCheckbox = await screen.findByRole('checkbox', {
      name: /i agree to/i,
    })
    expect(tcCheckbox).toBeInTheDocument()
    userEvent.click(tcCheckbox)

    const button = screen.getByRole('button', { name: /confirm order/i })
    userEvent.click(button)

    const completeTitle = await screen.findByRole('heading', {
      name: /thank you!/i,
    })
    expect(completeTitle).toBeInTheDocument()

    const orderNumber = await screen.findByRole('heading', {
      name: /your order number is/i,
    })
    expect(orderNumber).toBeInTheDocument()

    const createNewOrderButton = screen.getByRole('button', {
      name: /create new order/i,
    })

    userEvent.click(createNewOrderButton)

    const title = screen.getByRole('heading', { name: /design your sundae!/i })
    expect(title).toBeInTheDocument()

    const totalScoops = await screen.findByText(/scoops total: \$0\.00/i)
    expect(totalScoops).toBeInTheDocument()
    const totalToppings = await screen.findByText(/scoops total: \$0\.00/i)
    expect(totalToppings).toBeInTheDocument()
    const total = await screen.findByRole('heading', {
      name: /grand total: \$0\.00/i,
    })
    expect(total).toBeInTheDocument()

    await screen.findByRole('spinbutton', { name: /vanilla/i })
    await screen.findByRole('checkbox', { name: /hot fudge/i })
  })
})
