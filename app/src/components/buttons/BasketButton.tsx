import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import styled from 'styled-components';
import BasketDrawer from '../menu/BasketDrawer';
import { BasketContext } from '../../contexts/BasketContext';

export default function BasketButton() {
  const { basketItems } = React.useContext(BasketContext);

  const [isOpen, setOpen] = React.useState<boolean>(false);

  const toggleOpen = () => setOpen(!isOpen);

  return (
    <Container>
      {basketItems.length > 0
        && (
        <BasketCounter>
          {basketItems.length}
        </BasketCounter>
        )}

      <Button
        onClick={() => toggleOpen()}
      >
        <FaShoppingBasket
          style={{
            marginRight: 10,
          }}
        />
        Basket
      </Button>

      <BasketDrawer
        isOpen={isOpen}
        setOpen={setOpen}
      />
    </Container>
  );
}

const BasketCounter = styled.div`
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: 50%;
  padding: 3px 8px;
  background: green;
  color: white;
`;

const Container = styled.div`
  position: relative;
`;

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
`;
