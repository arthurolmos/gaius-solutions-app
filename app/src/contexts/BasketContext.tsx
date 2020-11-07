import React from 'react'
import ItemProps from '../typescript/ItemProps'
import BasketItemProps from '../typescript/BasketItemProps'


interface ContextProps {
  basketItems: BasketItemProps[],
  basketPriceTotal: number,
  basketDiscountTotal: number,
  basketPayableTotal: number,
  addItemToBasket: (item: ItemProps) => void,
  subItemFromBasket: (id: string) => void,
  removeItemFromBasket: (id: string) => void,
  clearBasket: () => void
};

export const BasketContext = React.createContext<ContextProps>({
  basketItems: [],
  basketPriceTotal: 0,
  basketDiscountTotal: 0,
  basketPayableTotal: 0,
  addItemToBasket: (item: ItemProps) => {
    throw new Error('addItemToBasket not implemented');
  },
  removeItemFromBasket: (id: string) => {
    throw new Error('removeItemFromBasket not implemented');
  },
  subItemFromBasket: (id: string) => {
    throw new Error('subItemFromBasket not implemented');
  },
  clearBasket: () => { 
    throw new Error('clearBasket not implemented');
  }
})

export function BasketProvider({ children }: {children: React.ReactNode }) {

  const [basketItems, setBasketItems] = React.useState<BasketItemProps[]>([])

  const [basketPriceTotal, setBasketPriceTotal] = React.useState<number>(0)
  const [basketDiscountTotal, setBasketDiscountTotal] = React.useState<number>(0)
  const [basketPayableTotal, setBasketPayableTotal] = React.useState<number>(0)

  function addItemToBasket(item: ItemProps) {
    //Copy the basketItems array
    const tempBasketItems = [...basketItems]

    const index = tempBasketItems.findIndex(basketItem => basketItem.id === item.id)
    if(index > -1) { 
      //If finds the item in the array, sums 1 to qty
      tempBasketItems[index].qty++
      tempBasketItems[index].rawTotal = tempBasketItems[index].qty * tempBasketItems[index].price
      tempBasketItems[index].totalDiscount = tempBasketItems[index].qty * tempBasketItems[index].price * (tempBasketItems[index].discount/100)
      tempBasketItems[index].totalPrice = tempBasketItems[index].rawTotal - tempBasketItems[index].totalDiscount

    } else { 
      //If don't find the item in the array, starts it with qty = 1
      const basketItem = {
        ...item,
        qty: 1,
        rawTotal: item.price,
        totalDiscount: item.price * (item.discount/100),
        totalPrice: item.price - (item.price * (item.discount/100))
      }

      tempBasketItems.push(basketItem)
    }
    setBasketItems([...tempBasketItems ])
  }
  
  function subItemFromBasket(id: string) {
    //Copy the basketItems array
    const tempBasketItems = [...basketItems]

    const index = tempBasketItems.findIndex(basketItem => basketItem.id === id)
    if(index > -1) { 
      //If finds the item in the array, removes 1 from qty
      if(tempBasketItems[index].qty > 1) { 
        tempBasketItems[index].qty --
        tempBasketItems[index].rawTotal = tempBasketItems[index].qty * tempBasketItems[index].price
        tempBasketItems[index].totalDiscount = tempBasketItems[index].qty * tempBasketItems[index].price * (tempBasketItems[index].discount/100)
        tempBasketItems[index].totalPrice = tempBasketItems[index].rawTotal - tempBasketItems[index].totalDiscount
        
        setBasketItems([...tempBasketItems ])
      } 
    } 
  }

  function removeItemFromBasket(id: string) {
    //Copy the basketItems array
    const tempBasketItems = [...basketItems]

    const index = tempBasketItems.findIndex(basketItem => basketItem.id === id)
    if(index > -1) { 
      //If finds the item, remove from basket
      tempBasketItems.splice(index, 1)
      setBasketItems([ ...tempBasketItems ])
    } 
  }

  function clearBasket() { 
    setBasketItems([])
    setBasketPriceTotal(0)
    setBasketDiscountTotal(0)
    setBasketPayableTotal(0)
  }

  function calcBasketPriceTotal(basketItems: BasketItemProps[]) { 
    //Sums the price total without discount
    const rawTotalPriceArray = basketItems.map(item => item.rawTotal)
    const basketPriceTotal = rawTotalPriceArray.length && rawTotalPriceArray.reduce((accumulator, currentValue) => accumulator + currentValue)

    return basketPriceTotal
  }

  function calcBasketDiscountTotal(basketItems: BasketItemProps[]) { 
    //Sums the total discount of all items
    const totalDiscountArray = basketItems.map(item => item.totalDiscount)
    const basketDiscountTotal = totalDiscountArray.length && totalDiscountArray.reduce((accumulator, currentValue) => accumulator + currentValue)

    return basketDiscountTotal
  }

  React.useEffect(() => { 
    const basketPriceTotal = calcBasketPriceTotal(basketItems)
    const basketDiscountTotal = calcBasketDiscountTotal(basketItems)
    const basketPayableTotal = basketPriceTotal - basketDiscountTotal

    setBasketPriceTotal(basketPriceTotal)
    setBasketDiscountTotal(basketDiscountTotal)
    setBasketPayableTotal(basketPayableTotal)

  }, [ basketItems ])

  return (
    <BasketContext.Provider
      value={{
        basketItems,
        basketPriceTotal,
        basketDiscountTotal,
        basketPayableTotal,

        addItemToBasket,
        removeItemFromBasket,
        subItemFromBasket,

        clearBasket
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}
