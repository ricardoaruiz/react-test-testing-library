import React from 'react'
import {
  Button,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Popover,
} from 'react-bootstrap'

const SummaryForm = ({ onConfirm }) => {
  const [isAgree, setIsAgree] = React.useState(false)

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault()

      onConfirm()
    },
    [onConfirm]
  )

  const renderTooltip = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  )

  const label = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={renderTooltip}>
        <span style={{ color: 'blue', cursor: 'pointer' }}>
          Terms and Conditions
        </span>
      </OverlayTrigger>
    </span>
  )

  return (
    <Form className="mt-5 mb-5" onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Check
            id="terms-check"
            type="checkbox"
            inline
            checked={isAgree}
            label={label}
            onChange={() => {
              setIsAgree((state) => !state)
            }}
          ></Form.Check>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button variant="light" disabled={!isAgree} type="submit">
            Confirm order
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

const MemoizedSummaryForm = React.memo(SummaryForm)
export { MemoizedSummaryForm as SummaryForm }
