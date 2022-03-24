import React from 'react'
import { Form, Col, Row } from 'react-bootstrap'

import { useContextSelector } from 'use-context-selector'
import { OrderDetailsContext } from '../../context/OrderDetailsContext'

const ScoopOption = ({ name, imagePath }) => {
  const changeScoopQuantity = useContextSelector(
    OrderDetailsContext,
    (state) => state.changeScoopQuantity
  )

  const handleChangeScoopQuantity = React.useCallback(
    (name, event) => {
      const quantity = event.target.value
      if (quantity < 0) {
        event.preventDefault()
        return
      }
      changeScoopQuantity(name, event.target.value)
    },
    [changeScoopQuantity]
  )

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
        style={{ width: '75%' }}
      />

      <Form className="mt-3 mb-5">
        <Form.Group as={Row}>
          <Col xs={6}>
            <Form.Label htmlFor={`input-scoop-${name}`}>{name}</Form.Label>
          </Col>
          <Col xs={5}>
            <Form.Control
              type="number"
              defaultValue={0}
              min="0"
              id={`input-scoop-${name}`}
              onChange={(event) => handleChangeScoopQuantity(name, event)}
              style={{ maxWidth: '80px' }}
            />
          </Col>
        </Form.Group>
      </Form>
    </Col>
  )
}

const MemoizedScoopOption = React.memo(ScoopOption)
export { MemoizedScoopOption as ScoopOption }
