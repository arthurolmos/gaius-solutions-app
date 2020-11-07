import React from 'react'
import {  FaShoppingBasket } from 'react-icons/fa'
import BasketDrawer from '../menu/BasketDrawer'
import styled from 'styled-components'

export default function BasketButton() {

  const [isOpen, setOpen] = React.useState<boolean>(false)

  const toggleOpen = () => setOpen(!isOpen)

  return (
    <Container>
      <Button 
        onClick={() => toggleOpen()}
      >
        <FaShoppingBasket
          style={{
            marginRight: 10
          }}
        />
        Basket
      </Button>
      
      <BasketDrawer 
        isOpen={isOpen}
        setOpen={setOpen}
      />

    </Container>
  )
}


const Container = styled.div`
  position: relative;
`

const Button = styled.button`
  border-radius: 25px;
  padding: 5px 10px;
  font-size: 20px;
  vertical-align: center;
  border: 1px solid gray;
  cursor: pointer;
  transition: all .2s ease;

  &:hover { 
    background: black;
    color: white;
  }

  &:active { 
    decoration: none;
  }

  &:focus { 
    outline: none;
  }
`