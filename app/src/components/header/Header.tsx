import React from 'react'
import styled from 'styled-components'
import BasketButton from '../buttons/BasketButton'

export default function Header() {
  return (
    <Container>
      <Logo>
        Developed by Arthur Olmos Wosniaki!
      </Logo>
      
      <BasketButton />
    </Container>
  )
}


const Container = styled.div`
  padding: 15px 30px;
  max-height: 100px;
  background: lightblue;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex: 1;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 8;
`

const Logo = styled.div`
  display: inline-flex;
  box-sizing: border-box;
`
