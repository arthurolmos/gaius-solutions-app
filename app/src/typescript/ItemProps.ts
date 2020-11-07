export default interface ItemProps { 
  id: string,
  name: string,
  price: number,
  discount: number,
  url: string
}

interface BasketItemProps extends ItemProps { 
  qty: number,
  rawTotal: number,
  totalDiscount: number,
  totalPrice: number
}