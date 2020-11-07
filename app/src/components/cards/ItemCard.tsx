import React from 'react'
import styled from 'styled-components'
import { BasketContext } from '../../contexts/BasketContext'
import convertPenniesToPouds from '../../utils/convertPenniesToPounds'
import ItemProps from '../../typescript/ItemProps'


export default function ItemCard({ item }: { item: ItemProps }) {

  const { name, price, discount, url } = item
  const { addItemToBasket } = React.useContext(BasketContext)

  const fPrice = convertPenniesToPouds(price)
  const dPrice = convertPenniesToPouds(price - ((price * discount)/100))

  return (
    <Container onClick={() => addItemToBasket(item)}>
      {discount > 0 && 
        <DiscountStamp>
          -{discount}%
        </DiscountStamp>
      }

      <Title>{name}</Title>

      <ImageContainer>
        <HiddenText>Add to basket!</HiddenText>
        <Image src={url} alt={name}/>
      </ImageContainer>

      <PriceContainer>
        <div style={{ display: 'inline-flex', flex: 1, justifyContent: 'center'}}>
          Price:
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <span style={{ textDecoration: discount > 0 ? 'line-through' : ''}}>
            £ {fPrice}
          </span>
          {discount > 0 &&
            <span style={{ fontWeight: 'bold' }}>
              £ {dPrice}
            </span>
          }
        </div>
      </PriceContainer>
    </Container>
  )
}

const DiscountStamp = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  background: green;
  color: white;
  font-weight: bold;
  z-index: 7;
  padding: 10px 5px;
  border-radius: 50%;
`

const PriceContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  padding: 10px;
`

const ImageContainer = styled.div`
  position: relative;
  box-sizing: boder-box;
`

const Image = styled.img`
  width: 150px;
  height: 180px;
`

const Title = styled.span`
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  margin: 15px auto 15px auto;
  font-weight: bold;
`

const HiddenText = styled.span`
  visibility: hidden;
  z-index: 990;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
  justify-content: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 30px;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 170px;
  height: 300px;
  border: 1px solid black;
  border-radius: 25px;
  margin: 25px;
  padding: 5px;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px lightgray;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  background: white;

  &:hover { 
    transform: scale(1.05);
    opacity: .7;

    ${HiddenText} {
      visibility: visible;
    }
  }
`