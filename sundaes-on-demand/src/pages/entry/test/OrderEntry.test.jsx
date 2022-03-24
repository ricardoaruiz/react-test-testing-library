import { renderWithContext, screen, waitFor } from '../../../utils/test'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { server } from '../../../mocks/server'

import { OrderEntry } from '../OrderEntry'

import {
  URLS,
  SCOOPS_RESOLVER_WITH_SERVER_ERROR,
  TOPPINGS_RESOLVER_WITH_SERVER_ERROR,
} from '../../../mocks'

describe('<OrderEntry /> alerts', () => {
  it('should be display two alerts when server throws error on data fetching', async () => {
    // Override resolver for this specific test
    server.resetHandlers(
      rest.get(URLS.SCOOPS, SCOOPS_RESOLVER_WITH_SERVER_ERROR),
      rest.get(URLS.TOPPINGS, TOPPINGS_RESOLVER_WITH_SERVER_ERROR)
    )

    renderWithContext(<OrderEntry onNextStep={jest.fn()} />)

    const errors = await waitFor(async () => {
      const errors = await screen.findAllByRole('alert')
      expect(errors).toHaveLength(2)
      return errors
    })

    const errorsMessages = errors.map((error) =>
      error.textContent.toLocaleLowerCase()
    )

    const expectedErrorsMessages = Array.from(
      { length: 2 },
      () => 'an unexpected error ocurred. please try again later'
    )

    expect(errorsMessages).toEqual(expectedErrorsMessages)
  })
})

describe('<OrderEntry /> update grand total', () => {
  it('should grand total updates properly if scoop is added first', async () => {
    renderWithContext(<OrderEntry onNextStep={jest.fn()} />)

    const grandtTotal = screen.getByRole('heading', {
      name: /grand total/i,
    })
    expect(grandtTotal).toHaveTextContent('0.00')

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    userEvent.clear(chocolateScoopInput)
    userEvent.type(chocolateScoopInput, '1')
    expect(grandtTotal).toHaveTextContent('2.00')

    const mmToppingCheckbox = await screen.findByRole('checkbox', {
      name: /m&ms/i,
    })

    userEvent.click(mmToppingCheckbox)
    expect(grandtTotal).toHaveTextContent('2.50')
  })

  it('should grand total updates properly if topping is added first', async () => {
    renderWithContext(<OrderEntry onNextStep={jest.fn()} />)

    const grandtTotal = screen.getByRole('heading', {
      name: /grand total/i,
    })
    expect(grandtTotal).toHaveTextContent('0.00')

    const mmToppingCheckbox = await screen.findByRole('checkbox', {
      name: /m&ms/i,
    })

    userEvent.click(mmToppingCheckbox)
    expect(grandtTotal).toHaveTextContent('0.50')

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    userEvent.clear(chocolateScoopInput)
    userEvent.type(chocolateScoopInput, '1')
    expect(grandtTotal).toHaveTextContent('2.50')
  })

  it('should grand total updates properly if item is removed', async () => {
    renderWithContext(<OrderEntry onNextStep={jest.fn()} />)

    const grandtTotal = screen.getByRole('heading', {
      name: /grand total/i,
    })
    expect(grandtTotal).toHaveTextContent('0.00')

    const chocolateScoopInput = await screen.findByRole('spinbutton', {
      name: /chocolate/i,
    })
    const mmToppingCheckbox = await screen.findByRole('checkbox', {
      name: /m&ms/i,
    })

    userEvent.clear(chocolateScoopInput)
    userEvent.type(chocolateScoopInput, '2')
    expect(grandtTotal).toHaveTextContent('4.00')

    userEvent.click(mmToppingCheckbox)
    expect(grandtTotal).toHaveTextContent('4.50')

    // Removing items
    userEvent.type(chocolateScoopInput, '1')
    expect(grandtTotal).toHaveTextContent('2.50')

    userEvent.type(chocolateScoopInput, '0')
    expect(grandtTotal).toHaveTextContent('0.50')

    userEvent.click(mmToppingCheckbox)
    expect(grandtTotal).toHaveTextContent('0.00')
  })

  it('should call callback function when "Order Sundae" button is clicked', () => {
    const mockedOnNextStep = jest.fn()
    renderWithContext(<OrderEntry onNextStep={mockedOnNextStep} />)

    const button = screen.getByRole('button', { name: /order sundae/i })
    userEvent.click(button)
    expect(mockedOnNextStep).toHaveBeenCalledTimes(1)
  })
})
