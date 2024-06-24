// web/src/components/PopularProducts.js
import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'

import { Link, routes } from '@redwoodjs/router'

// const products = [
//   {
//     id: 1,
//     name: 'Leaflets (Folded)',
//     price: '£27',
//     imageUrl: '/path/to/leaflets.jpg',
//     link: '/product/leaflets-folded',
//   },
//   {
//     id: 2,
//     name: 'Roller Banners',
//     price: '£65',
//     imageUrl: '/path/to/roller-banners.jpg',
//     link: '/product/roller-banners',
//   },
//   {
//     id: 3,
//     name: 'Flyers (Flat)',
//     price: '£27',
//     imageUrl: '/path/to/flyers.jpg',
//     link: '/product/flyers-flat',
//   },
//   {
//     id: 4,
//     name: 'Business Cards',
//     price: '£13',
//     imageUrl: '/path/to/business-cards.jpg',
//     link: '/product/business-cards',
//   },
// ]
export const GET_LAYOUTS = gql`
  query GetLayouts {
    realLayoutses {
      id
      name
      image
      markers
      created_at
      updated_at
      extra
      userId
    }
  }
`

const PopularProducts = () => {
  const { loading, error, data } = useQuery(GET_LAYOUTS)
  const [products, setProduct] = useState([])
  useEffect(() => {
    if (data) {
      setProduct(data.realLayoutses)
    }
  }, [data])

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-8 border-solid border-yellow-500"></div>
      </div>
    )
  }
  return (
    <section className="bg-gray-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold leading-tight text-gray-900">
          POPULAR LAYOUTS
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-lg bg-white p-4 shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full rounded-t-lg object-cover"
              />
              <div className="mt-4 text-center">
                <span className="block text-xl font-bold text-blue-500">
                  From {product.price}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  {product.name}
                </h3>
                <Link
                  // href={product.link}
                  to={routes.viewLayout({ id: product.id })}
                  className="mt-4 inline-block rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  BUY NOW
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PopularProducts
