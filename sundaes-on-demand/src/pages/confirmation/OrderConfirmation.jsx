import React from 'react'
import { useContextSelector } from 'use-context-selector'
import { Button } from 'react-bootstrap'

import { OrderDetailsContext } from '../../context/OrderDetailsContext'

export const OrderConfirmation = ({ onNextStep }) => {
  const [orderNumber, setOrderNumber] = React.useState(null)

  const reset = useContextSelector(OrderDetailsContext, (state) => state.reset)

  const loadOrderNumber = async () => {
    const response = await fetch('http://localhost:3030/order', {
      method: 'POST',
    })
    const data = await response.json()
    setOrderNumber(data.orderNumber)
  }

  const handleCreateNewOrderButtonClick = React.useCallback(() => {
    reset()
    onNextStep()
  }, [onNextStep, reset])

  React.useEffect(() => {
    loadOrderNumber()
  }, [])

  return (
    <div>
      {orderNumber && (
        <>
          <h1>Thank You!</h1>

          <h2>Your order number is {orderNumber}</h2>

          <Button variant="primary" onClick={handleCreateNewOrderButtonClick}>
            Create new order
          </Button>
        </>
      )}
      {!orderNumber && <h1>Loading...</h1>}
    </div>
  )
}
