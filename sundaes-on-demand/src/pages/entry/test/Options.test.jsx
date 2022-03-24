import { renderWithContext, screen } from '../../../utils/test'
import userEvent from '@testing-library/user-event'

import { Options } from '../Options'

describe('<Options /> display images', () => {
  it('displays image for each scoop from the server', async () => {
    renderWithContext(<Options optionType="scoops" />)

    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
    expect(scoopImages).toHaveLength(2)

    const altText = scoopImages.map((element) => element.alt.toLowerCase())
    expect(altText).toEqual(['chocolate scoop', 'vanilla scoop'])
  })

  it('displays image for each topping from the server', async () => {
    renderWithContext(<Options optionType="toppings" />)

    const scoopImages = await screen.findAllByRole('img', {
      name: /topping$/i,
    })
    expect(scoopImages).toHaveLength(3)

    const altText = scoopImages.map((element) => element.alt.toLowerCase())
    expect(altText).toEqual([
      'cherries topping',
      'm&ms topping',
      'hot fudge topping',
    ])
  })
})

describe('<Options /> update subtotals (scoop and toppings)', () => {
  it('update scoop subtotal when scoops change', async () => {
    renderWithContext(<Options optionType="scoops" />)

    const scoopsSubtotal = await screen.findByText('Scoops total:', {
      exact: false,
    })
    expect(scoopsSubtotal).toHaveTextContent('0.00')

    const vanillaInput = screen.getByRole('spinbutton', { name: /vanilla/i })
    const chocolateInput = screen.getByRole('spinbutton', {
      name: /chocolate/i,
    })

    // Adding scoops
    userEvent.clear(vanillaInput)
    userEvent.type(vanillaInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')

    userEvent.clear(chocolateInput)
    userEvent.type(chocolateInput, '2')
    expect(scoopsSubtotal).toHaveTextContent('6.00')

    // Removing scoops
    userEvent.type(vanillaInput, '0')
    expect(scoopsSubtotal).toHaveTextContent('4.00')
    userEvent.type(chocolateInput, '1')
    expect(scoopsSubtotal).toHaveTextContent('2.00')
    userEvent.type(chocolateInput, '0')
    expect(scoopsSubtotal).toHaveTextContent('0.00')
  })

  it('update toppings subtotal when toppings have been selected and deselected', async () => {
    renderWithContext(<Options optionType="toppings" />)

    const toppingsSubtotal = await screen.findByText('Toppings total:', {
      exact: false,
    })
    expect(toppingsSubtotal).toHaveTextContent('0.00')

    const mmCheckbox = screen.getByRole('checkbox', {
      name: /m&ms/i,
    })
    const hotFudge = screen.getByRole('checkbox', {
      name: /hot fudge/i,
    })

    // Adding toppings
    userEvent.click(mmCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('0.50')
    userEvent.click(hotFudge)
    expect(toppingsSubtotal).toHaveTextContent('1.00')

    // Removind toppings
    userEvent.click(hotFudge)
    expect(toppingsSubtotal).toHaveTextContent('0.50')
    userEvent.click(mmCheckbox)
    expect(toppingsSubtotal).toHaveTextContent('0.00')
  })
})
