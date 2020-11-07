import React from 'react'
import { BasketContext } from '../../contexts/BasketContext'
import { FaTimes } from 'react-icons/fa'
import styled from 'styled-components'
import convertPenniesToPounds from '../../utils/convertPenniesToPounds'
import BasketItemProps from '../../typescript/BasketItemProps'


export default function BasketCard({ item }: { item: BasketItemProps }) {

  const { addItemToBasket, subItemFromBasket, removeItemFromBasket } = React.useContext(BasketContext)
  const { price, rawTotal, totalDiscount, totalPrice } = item

  const fPrice = convertPenniesToPounds(price)
  const fRawTotal = convertPenniesToPounds(rawTotal)
  const fTotalDiscount = convertPenniesToPounds(totalDiscount)
  const fTotalPrice = convertPenniesToPounds(totalPrice)

  return (
    <Container>
      <CloseDiv onClick={() => removeItemFromBasket(item.id)}>
        <FaTimes />
      </CloseDiv>
        
      <ImageContainer>
        <Image src={item.url} alt={item.name} />
      </ImageContainer>

      <DataContainer>
        <Title>{item.name}</Title>
        
        <ButtonContainer>
          <button onClick={() => addItemToBasket(item)}>+</button>
          {item.qty}
          <button onClick={() => subItemFromBasket(item.id)}>-</button>
        </ButtonContainer>

        <PriceContainer>
          <PriceItem>Price unt: £ {fPrice}</PriceItem>
          <PriceItem>Raw Total: £ {fRawTotal}</PriceItem>
          <PriceItem>Discount: £ {fTotalDiscount}</PriceItem>
          <PriceItem>Total: £ {fTotalPrice}</PriceItem>
        </PriceContainer>
      </DataContainer>
    </Container>
  )
}


const PriceItem = styled.span`
  display: block;
`

const PriceContainer = styled.div`
  display: block;
`

const ButtonContainer = styled.div`
  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 15px 0;
`


const Title = styled.span`
  text-transform: uppercase;
  font-weight: bold;
`

const DataContainer = styled.div`
  display: inline-block;
  flex-direction: column;
  margin: auto;
  padding: 10px;
`


const ImageContainer = styled.div`
  display: inline-block;
  margin: auto;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 25px;
  margin: 0 10px 20px;
  border: 1px solid gray;
  border-radius: 25px;
  position: relative;
`

const Image = styled.img`
  width: 80px;
  height: 100px;
`

const CloseDiv = styled.div`
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
`