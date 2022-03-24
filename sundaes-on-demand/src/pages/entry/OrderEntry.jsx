import React from 'react'
import { useContextSelector } from 'use-context-selector'
import { Button } from 'react-bootstrap'

import { OrderDetailsContext } from '../../context/OrderDetailsContext'
import { Options } from './Options'

const OrderEntry = ({ onNextStep }) => {
  const formattedTotal = useContextSelector(
    OrderDetailsContext,
    (state) => state.formattedTotal
  )

  return (
    <div className="mt-5 mb-5">
      <h1 className="mt-5 mb-5">Design Your Sundae!</h1>

      <Options optionType="scoops" />
      <Options optionType="toppings" />

      <h2 className="mt-5 mb-5">Grand Total: {formattedTotal}</h2>

      <Button variant="primary" onClick={onNextStep}>
        Order Sundae
      </Button>
    </div>
  )
}

const MemoizedOrderEntry = React.memo(OrderEntry)
export { MemoizedOrderEntry as OrderEntry }
