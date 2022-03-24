export const replaceCamelWithSpace = (colorName) => {
  if (!colorName) return ''

  const result = colorName
    .split('')
    .reduce(
      (result, letter, index) =>
        (result +=
          index > 0 && letter.toUpperCase() === letter ? ` ${letter}` : letter),
      ''
    )

  return `${result.charAt(0).toUpperCase()}${result.substring(1)}`
}
