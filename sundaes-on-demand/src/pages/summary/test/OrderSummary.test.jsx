import { render, screen } from '@testing-library/react'

import { OrderDetailsContext } from '../../../context/OrderDetailsContext'
import { OrderSummary } from '../OrderSummary'

describe('<OrderSummary />', () => {
  it('should be render correctly with context values', () => {
    const contextValue = {
      formattedScoopTotal: '$2.00',
      selectedScoops: [{ name: 'Vanilla', quantity: 1 }],
      formattedToppingsTotal: '$1.00',
      selectedToppings: ['M&Ms', 'Hot Fudge'],
      formattedTotal: '$3.00',
    }

    render(
      <OrderDetailsContext.Provider value={contextValue}>
        <OrderSummary onNextStep={jest.fn()} />
      </OrderDetailsContext.Provider>
    )

    expect(screen.getByRole('heading', { name: /order summary/i }))
    expect(screen.getByRole('heading', { name: /scoops: \$2\.00/i }))
    expect(screen.getByText(/1 vanilla/i))

    expect(screen.getByRole('heading', { name: /toppings: \$1\.00/i }))
    expect(screen.getByText(/m&ms/i))
    expect(screen.getByText(/hot fudge/i))

    expect(screen.getByRole('heading', { name: /total \$3\.00/i }))
  })

  it('should be render correctly with only scoops', () => {
    const contextValue = {
      formattedScoopTotal: '$2.00',
      selectedScoops: [{ name: 'Vanilla', quantity: 1 }],
      formattedToppingsTotal: '$0.00',
      selectedToppings: [],
      formattedTotal: '$2.00',
    }

    render(
      <OrderDetailsContext.Provider value={contextValue}>
        <OrderSummary onNextStep={jest.fn()} />
      </OrderDetailsContext.Provider>
    )

    expect(screen.getByRole('heading', { name: /order summary/i }))
    expect(screen.getByRole('heading', { name: /scoops: \$2\.00/i }))
    expect(screen.getByText(/1 vanilla/i))

    expect(
      screen.queryByRole('heading', { name: /toppings/i })
    ).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /total \$2\.00/i }))
  })

  it('should be render correctly with only toppings', () => {
    const contextValue = {
      formattedScoopTotal: '$0.00',
      selectedScoops: [],
      formattedToppingsTotal: '$1.00',
      selectedToppings: ['M&Ms', 'Hot Fudge'],
      formattedTotal: '$1.00',
    }

    render(
      <OrderDetailsContext.Provider value={contextValue}>
        <OrderSummary onNextStep={jest.fn()} />
      </OrderDetailsContext.Provider>
    )

    expect(screen.getByRole('heading', { name: /order summary/i }))

    expect(
      screen.queryByRole('heading', { name: /scoops: /i })
    ).not.toBeInTheDocument()

    expect(screen.getByRole('heading', { name: /toppings: \$1\.00/i }))
    expect(screen.getByText(/m&ms/i))
    expect(screen.getByText(/hot fudge/i))

    expect(screen.getByRole('heading', { name: /total \$1\.00/i }))
  })
})
