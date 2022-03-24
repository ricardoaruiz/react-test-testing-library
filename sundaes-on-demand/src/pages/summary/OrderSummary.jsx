import React from 'react'

import { useContextSelector } from 'use-context-selector'

import { OrderDetailsContext } from '../../context/OrderDetailsContext'
import { SummaryForm } from './SummaryForm'

export const OrderSummary = ({ onNextStep }) => {
  const formattedScoopTotal = useContextSelector(
    OrderDetailsContext,
    (state) => state.formattedScoopTotal
  )
  const selectedScoops = useContextSelector(
    OrderDetailsContext,
    (state) => state.selectedScoops
  )
  const formattedToppingsTotal = useContextSelector(
    OrderDetailsContext,
    (state) => state.formattedToppingsTotal
  )
  const selectedToppings = useContextSelector(
    OrderDetailsContext,
    (state) => state.selectedToppings
  )
  const formattedTotal = useContextSelector(
    OrderDetailsContext,
    (state) => state.formattedTotal
  )

  return (
    <div>
      <h1>Order Summary</h1>

      {!!selectedScoops.length && (
        <>
          <h2>Scoops: {formattedScoopTotal}</h2>
          <ul>
            {selectedScoops.map(({ name, quantity }) => (
              <li key={name}>{`${quantity} ${name}`}</li>
            ))}
          </ul>
        </>
      )}

      {!!selectedToppings.length && (
        <>
          <h2>Toppings: {formattedToppingsTotal}</h2>
          <ul>
            {selectedToppings.map((topping) => (
              <li key={topping}>{topping}</li>
            ))}
          </ul>
        </>
      )}

      <h2>Total {formattedTotal}</h2>

      <SummaryForm onConfirm={onNextStep} />
    </div>
  )
}
