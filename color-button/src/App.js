import React from 'react'
import { replaceCamelWithSpace } from './utils/utils'

import * as S from './App.styles'

function App() {
  const [buttonColor, setButtonColor] = React.useState('LightRed')
  const [disabled, setDisabled] = React.useState(false)
  const newButtonColor = buttonColor === 'LightRed' ? 'LightBlue' : 'LightRed'

  return (
    <div>
      <S.Button
        type="button"
        color={buttonColor}
        disabled={disabled}
        onClick={() => setButtonColor(newButtonColor)}
      >
        Change to {replaceCamelWithSpace(newButtonColor)}
      </S.Button>

      <input
        type="checkbox"
        id="disable-button"
        checked={disabled}
        aria-checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
      />
      <label htmlFor="disable-button">Disable Button</label>
    </div>
  )
}

export default App
