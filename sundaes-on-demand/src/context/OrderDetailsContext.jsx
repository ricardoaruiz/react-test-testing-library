import React from 'react'
import { createContext } from 'use-context-selector'

import { PRICE } from '../constants'
import { formatCurrency } from '../utils/number'

export const OrderDetailsContext = createContext({})
OrderDetailsContext.displayName = 'OrderDetailsContext'

/**
 *
 * @param {*} param0
 * @returns
 */
export const OrderDetailsProvider = ({ children }) => {
  const [selectedScoops, setSelectedScoops] = React.useState([])
  const [scoopsTotal, setScoopsTotal] = React.useState(0)

  const [selectedToppings, setSelectedToppings] = React.useState([])
  const [toppingsTotal, setToppingsTotal] = React.useState(0)

  const [total, setTotal] = React.useState(0)

  const reset = React.useCallback(() => {
    setSelectedScoops([])
    setScoopsTotal(0)
    setSelectedToppings([])
    setToppingsTotal(0)
    setTotal(0)
  }, [])

  const changeScoopQuantity = React.useCallback((name, quantity) => {
    if (quantity < 0) return

    setSelectedScoops((state) => {
      const scoop = state.find((item) => item.name === name)

      if (!scoop) {
        return [...state, { name, quantity }]
      }

      if (scoop && (quantity === '' || +quantity <= 0)) {
        return state.filter((item) => item.name !== name)
      }

      return state.map((item) => {
        if (item.name === name) {
          item.quantity = quantity
          return item
        }
        return item
      })
    })
  }, [])

  const changeToppingSelect = React.useCallback((name, selected) => {
    setSelectedToppings((state) => {
      const topping = state.find((item) => item === name)

      if (!topping && selected) {
        return [...state, name]
      }

      if (topping && !selected) {
        return state.filter((item) => item !== name)
      }

      return state
    })
  }, [])

  const formattedScoopTotal = React.useMemo(() => {
    return formatCurrency(scoopsTotal)
  }, [scoopsTotal])

  const formattedToppingsTotal = React.useMemo(() => {
    return formatCurrency(toppingsTotal)
  }, [toppingsTotal])

  const formattedTotal = React.useMemo(() => {
    return formatCurrency(total)
  }, [total])

  React.useEffect(() => {
    setScoopsTotal(() =>
      selectedScoops
        .filter((item) => item.quantity > 0)
        .reduce((total, item) => {
          total += item.quantity * PRICE.SCOOPS
          return total
        }, 0)
    )
  }, [selectedScoops])

  React.useEffect(() => {
    setToppingsTotal(() =>
      selectedToppings.reduce((total) => {
        total += PRICE.TOPPINGS
        return total
      }, 0)
    )
  }, [selectedToppings])

  React.useEffect(() => {
    setTotal(scoopsTotal + toppingsTotal)
  }, [scoopsTotal, toppingsTotal])

  const value = React.useMemo(() => {
    return {
      formattedScoopTotal,
      selectedScoops,
      formattedToppingsTotal,
      selectedToppings,
      formattedTotal,
      changeScoopQuantity,
      changeToppingSelect,
      reset,
    }
  }, [
    changeScoopQuantity,
    changeToppingSelect,
    formattedScoopTotal,
    formattedToppingsTotal,
    formattedTotal,
    selectedScoops,
    selectedToppings,
    reset,
  ])

  return (
    <OrderDetailsContext.Provider value={value}>
      {children}
    </OrderDetailsContext.Provider>
  )
}
