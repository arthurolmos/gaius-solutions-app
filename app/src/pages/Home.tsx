import React from 'react'
import DefaultContainer from '../components/layout/DefaultContainer'
import ItemCard from '../components/cards/ItemCard'
import data from '../data/data'
import ItemProps from '../typescript/ItemProps'
import styled from 'styled-components'


export default function Home() {

  const [allItems, setAllItems] = React.useState<ItemProps[]>([])

  async function getAllItems() { 
    try { 
      const items = data
    
      console.log('ALL items', items)

      setAllItems(items)
    } catch(err) { 
      console.log('Error fetching api data!', err)
    }
  }

  React.useEffect(() => { 
    getAllItems()
  }, [])

  return (
    <DefaultContainer
      title='Products'
    >
      <CardsContainer>
        {allItems.map(item => { 
          return (
            <ItemCard 
              item={item}
              key={item.id}  
            />
          )
        })}
      </CardsContainer>
    </DefaultContainer>
  )
}

const CardsContainer = styled.div`
  display: inline-flex;
  box-sizing: border-box;
  justify-content: space-around;
  flexWrap: nowrap;
  overflow: hidden;

  @media (max-width: 600px) { 
    display: block;
  }
`

