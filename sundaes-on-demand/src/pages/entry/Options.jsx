import React from 'react'
import { Row } from 'react-bootstrap'

import { formatCurrency } from '../../utils/number'
import { useContextSelector } from 'use-context-selector'
import { OrderDetailsContext } from '../../context/OrderDetailsContext'

import { ScoopOption } from './ScoopOption'
import { ToppingOption } from './ToppingOption'
import { AlertBanner } from '../common/AlertBanner'
import { PRICE } from '../../constants'

const Options = ({ optionType }) => {
  const formattedScoopTotal = useContextSelector(
    OrderDetailsContext,
    (state) => state.formattedScoopTotal
  )
  const formattedToppingsTotal = useContextSelector(
    OrderDetailsContext,
    (state) => state.formattedToppingsTotal
  )

  const [data, setData] = React.useState([])
  const [isLoadingData, setIsLoadingData] = React.useState(false)
  const [hasError, setHasError] = React.useState(false)

  /**
   * Load data from server
   */
  const loadData = React.useCallback(async () => {
    try {
      setIsLoadingData(true)
      const response = await fetch(`http://localhost:3030/${optionType}`)
      const data = await response.json()
      setData(data)
      setHasError(false)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoadingData(false)
    }
  }, [optionType])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const isScoop = optionType === 'scoops'
  const ItemComponent = isScoop ? ScoopOption : ToppingOption
  const product = isScoop ? 'Scoops' : 'Toppings'
  const price = isScoop
    ? formatCurrency(PRICE.SCOOPS)
    : formatCurrency(PRICE.TOPPINGS)
  const total = isScoop ? formattedScoopTotal : formattedToppingsTotal

  if (!data.length && isLoadingData && !hasError) {
    return <h4>Loading...</h4>
  }
  if (!data.length && !isLoadingData && hasError) {
    return <AlertBanner />
  }

  return (
    <div>
      <h2>{product}</h2>

      <p>
        {product} total: {total}
      </p>

      <p>{price} each</p>

      <Row>
        {data.map(({ name, imagePath }) => (
          <ItemComponent key={name} name={name} imagePath={imagePath} />
        ))}
      </Row>
    </div>
  )
}

const MemoizedOptions = React.memo(Options)
export { MemoizedOptions as Options }
