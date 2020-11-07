import React from 'react'
import BasketCard from '../cards/BasketCard'
import styled from 'styled-components'
import { BasketContext } from '../../contexts/BasketContext'
import convertPenniesToPounds from '../../utils/convertPenniesToPounds'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function BasketDrawer(
  { isOpen,
    setOpen,
  }: 
  { isOpen: boolean,
    setOpen: any,
  }
) {

  const { 
    basketItems, 
    basketPriceTotal, 
    basketDiscountTotal, 
    basketPayableTotal,
    clearBasket
  
  } = React.useContext(BasketContext)

  const fBasketPriceTotal = convertPenniesToPounds(basketPriceTotal)
  const fBasketDiscountTotal = convertPenniesToPounds(basketDiscountTotal)
  const fBasketPayableTotal = convertPenniesToPounds(basketPayableTotal)

  function showCheckoutAlert() { 
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='custom-ui'>
            <h1>Confirm Checkout and clear Basket?</h1>
            <Paragraph>****CHECKOUT***</Paragraph> 
            <Paragraph>Raw Total: £ ${fBasketPriceTotal}</Paragraph>
            <Paragraph>Discount Total: £ ${fBasketDiscountTotal}</Paragraph>
            <Paragraph>Payable Total: £ ${basketPayableTotal}</Paragraph>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <button 
                onClick={onClose}
                style={{ marginRight: 10}}  
              >No</button>

              <button 
                onClick={() => {
                  clearBasket()
                  onClose() 
                }}
              >
                Yes
              </button>
            </div>
          </div>
        )
      }
    })
  }

  return (
    <>
      {isOpen &&
        <Backdrop 
          onClick={() => setOpen(false)}
        />
      }

      <BasketContainer
        isOpen={isOpen}
      >

        <ItemsContainer>
          <Title>Your basket</Title>

          <TotalContainer>
            <span>Raw Total: £ {fBasketPriceTotal}</span>
            <span>Discount Total: £ {fBasketDiscountTotal}</span>
            <h4>Payable Total: £ {fBasketPayableTotal}</h4>
          </TotalContainer>

          {basketItems.map(item => { 
            return (
            <BasketCard item={item} />
            )
          })}

          <ButtonContainer>
            <Button onClick={() => showCheckoutAlert() }>Checkout</Button>
          </ButtonContainer>

        </ItemsContainer>
      </BasketContainer>
    </>
  )
}

const Paragraph = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TotalContainer = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  border-radius: 25px;
  flex-direction: column; 
  padding: 15px 0 0;
`


const ButtonContainer = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`

const ItemsContainer = styled.div`
  display: block;
  transition: 0.2s;
  padding: 15px;
`

const Title = styled.h3`
  justify-content: center;
  text-transform: uppercase;
  display: flex;
  flex: 1;
  margin: 15px auto;
`

const BasketContainer = styled.div<{isOpen: boolean}>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  background: white;
  overflow-y: auto;
  transition: all .2s ease;

  @media(max-width: 600px) {
    width: ${props => props.isOpen ? "320px" : 0 }
  }

  width: ${props => props.isOpen ? "400px" : 0 }
`
const Backdrop = styled.div`
  background: black; 
  opacity: .3;
  position: fixed; 
  top: 0; 
  right: 0; 
  left: 0; 
  bottom: 0;
`

const Button = styled.button`
  text-transform: uppercase;
  background: red;
  color: white;
  border-radius: 25px;
  border: 1px solid white;
  height: 40px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all .2s ease;
  font-weight: bold;

  &:hover { 
    color: red;
    background: white;
    border: 1px solid red;
  }

  &:focus { 
    outline: none;
  }
`