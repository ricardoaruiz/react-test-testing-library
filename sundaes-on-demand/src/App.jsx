import React from 'react'
import { Container } from 'react-bootstrap'

import { OrderDetailsProvider } from './context/OrderDetailsContext'
import { OrderConfirmation } from './pages/confirmation/OrderConfirmation'
import { OrderEntry } from './pages/entry/OrderEntry'
import { OrderSummary } from './pages/summary/OrderSummary'

import './App.css'

function App() {
  const [step, setStep] = React.useState('in-progress')

  const goToReview = React.useCallback(() => {
    setStep('review')
  }, [])

  const goToComplete = React.useCallback(() => {
    setStep('complete')
  }, [])

  const goToInProgress = React.useCallback(() => {
    setStep('in-progress')
  }, [])

  const CurrentStepComponent = React.useMemo(() => {
    switch (step) {
      case 'in-progress':
        return <OrderEntry onNextStep={goToReview} />
      case 'review':
        return <OrderSummary onNextStep={goToComplete} />
      case 'complete':
        return <OrderConfirmation onNextStep={goToInProgress} />
      default:
        break
    }
  }, [goToComplete, goToInProgress, goToReview, step])

  return (
    <OrderDetailsProvider>
      <Container>{CurrentStepComponent}</Container>
    </OrderDetailsProvider>
  )
}

export default App
