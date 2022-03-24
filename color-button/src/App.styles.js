import styled, { css } from 'styled-components'

const buttonModifiers = {
  LightRed: css`
    background-color: #f85656;
  `,
  LightBlue: css`
    background-color: #6b6bf7;
  `,
}

export const Button = styled.button`
  ${({ color }) => css`
    padding: 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    cursor: pointer;
    width: 300px;

    ${buttonModifiers[color]}

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `};
`
