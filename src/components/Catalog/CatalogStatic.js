import React from 'react'
import CatalogItem from '../CatalogItem/CatalogItem'

const CatalogStatic = ({
  categories,
  items,
  storeId,
}) => {
  return (
    <>
      {categories.map((category) => (
        <div
          className='catalog__section'
          key={category.id}
        >
          <h2 className='catalog__section-title'>{category.name}</h2>

          {items.filter((item) => item.categoryId === category.id).map(item => (
            <CatalogItem
              item={item}
              storeId={storeId}
              key={item.id}
            />
          ))}
        </div>
      ))}
    </>
  )
}

export default CatalogStatic