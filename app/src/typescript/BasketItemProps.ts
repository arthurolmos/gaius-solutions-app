import ItemProps from './ItemProps'

export default interface BasketItemProps extends ItemProps { 
  qty: number,
  rawTotal: number,
  totalDiscount: number,
  totalPrice: number
}