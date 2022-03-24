import React from 'react'
import { Form, Col } from 'react-bootstrap'

import { useContextSelector } from 'use-context-selector'
import { OrderDetailsContext } from '../../context/OrderDetailsContext'

const ToppingOption = ({ name, imagePath }) => {
  const changeToppingSelect = useContextSelector(
    OrderDetailsContext,
    (value) => value.changeToppingSelect
  )

  const handleChangeToppingQuantity = React.useCallback(
    (name, event) => {
      changeToppingSelect(name, event.target.checked)
    },
    [changeToppingSelect]
  )

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
        style={{ width: '75%' }}
      />

      <Form className="mt-2 mb-5">
        <Form.Check
          id={`topping-check-${name}`}
          type="checkbox"
          inline
          label={name}
          onChange={(event) => handleChangeToppingQuantity(name, event)}
        ></Form.Check>
      </Form>
    </Col>
  )
}

const MemoizedToppingOption = React.memo(ToppingOption)
export { MemoizedToppingOption as ToppingOption }
