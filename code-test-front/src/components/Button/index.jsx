import React from 'react'

import { ButtonContainer } from './styles'

const Button = ({title, onClick , variant = 'primary'}) => {
  return (
    <ButtonContainer variant={variant} onClick={onClick}>{title}</ButtonContainer>
  )
}


export { Button };