import React from 'react'
import { Alert } from 'react-bootstrap'

const DEFAULT_MESSAGE = 'An unexpected error ocurred. Please try again later'
const DEFAULT_VARIANT = 'danger'

export const AlertBanner = ({
  message = DEFAULT_MESSAGE,
  variant = DEFAULT_VARIANT,
}) => {
  return <Alert variant={variant}>{message}</Alert>
}
