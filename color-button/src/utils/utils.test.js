import { replaceCamelWithSpace } from './utils'

describe('testing: utils.replaceCamelWithSpace', () => {
  it('return empty string when receive empty string', () => {
    expect(replaceCamelWithSpace('')).toEqual('')
  })
  it('works for no inner capital letters', () => {
    expect(replaceCamelWithSpace('red')).toEqual('Red')
  })
  it('works for one inner capital letters', () => {
    expect(replaceCamelWithSpace('MidnightBlue')).toEqual('Midnight Blue')
  })
  it('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpace('MidiumVioletRed')).toEqual(
      'Midium Violet Red'
    )
  })
})
