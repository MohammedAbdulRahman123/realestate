import { useState } from 'react'

import { useLazyQuery, gql } from '@apollo/client'

import { Metadata } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const GET_ORDER_BY_ID = gql`
  query OrderById($id: String!) {
    orderById(id: $id) {
      id
      order_item
      total_amount
      status
      delivary_date
      created_at
      updated_at
      extra
      userId
    }
  }
`

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('')
  const [getOrder, { loading, data, error }] = useLazyQuery(GET_ORDER_BY_ID, {
    onCompleted: () => {
      if (!data.orderById) {
        toast.error('Order not found')
      }
    },
  })

  const handleGetStatus = () => {
    if (orderId.trim() === '') {
      toast.error('Please enter a valid order ID')
      return
    }
    getOrder({ variables: { id: orderId } })
  }

  return (
    <>
      <Metadata title="TrackOrder" description="TrackOrder page" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
            Track Your Order
          </h1>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID"
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleGetStatus}
              className="w-full rounded-lg bg-red-500 px-4 py-2 text-white shadow-lg transition duration-150 hover:bg-red-600"
            >
              Get Status
            </button>
            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && (
              <p className="text-center text-red-500">Error: {error.message}</p>
            )}
            {data && data.orderById && (
              <div className="mx-auto mt-8 w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
                <header className="flex items-center justify-between rounded-t-lg bg-gray-800 px-6 py-4 text-white">
                  <h2 className="text-lg font-semibold">
                    Order {data.orderById.id} Detail
                  </h2>
                </header>
                <div className="space-y-4 p-6">
                  {Object.entries(data.orderById?.order_item).map(
                    ([key, value]) => {
                      let title = key
                      title = title.replaceAll('your', '')
                      title = title.replaceAll('select', '')
                      title = title.replaceAll('Your', '')
                      title = title.replaceAll('Select', '')
                      title = title.trim()
                      return (
                        <div
                          key={key}
                          className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between"
                        >
                          <div className="font-semibold text-gray-700">
                            {title}
                          </div>
                          <div className="text-gray-600">{value}</div>
                        </div>
                      )
                    }
                  )}
                  <div className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-gray-700">
                      Total Amount
                    </div>
                    <div className="text-gray-600">
                      £{data.orderById.total_amount}
                    </div>
                  </div>
                  <div className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-gray-700">Status</div>
                    <div className="text-gray-600">{data.orderById.status}</div>
                  </div>
                  <div className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-gray-700">
                      Delivery Date
                    </div>
                    <div className="text-gray-600">
                      {timeTag(data.orderById.delivary_date)}
                    </div>
                  </div>
                  <div className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-gray-700">
                      Ordered At
                    </div>
                    <div className="text-gray-600">
                      {timeTag(data.orderById.created_at)}
                    </div>
                  </div>
                  <div className="flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
                    <div className="font-semibold text-gray-700">
                      Status Updated At
                    </div>
                    <div className="text-gray-600">
                      {timeTag(data.orderById.updated_at)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackOrderPage
