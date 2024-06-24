import { format } from 'date-fns'
import { FaCheckCircle, FaTimesCircle, FaCopy } from 'react-icons/fa'

import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query FindYourOrderQuery {
    yourOrder: yourOrder {
      id
      total_amount
      delivary_date
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No orders found</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ yourOrder }) => {
  const handleCopyToClipboard = (id) => {
    navigator.clipboard.writeText(id)
    toast.success('Order ID copied to clipboard')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-2xl font-bold">Your Orders</h1>
      <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {yourOrder.map((order) => (
          <div
            key={order.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Order ID: {order.id}</h2>
              <button
                onClick={() => handleCopyToClipboard(order.id)}
                className="ml-2 text-gray-500 transition duration-150 hover:text-gray-700"
                title="Copy Order ID"
              >
                <FaCopy />
              </button>
            </div>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Total Amount: </span>£
              {order.total_amount}
            </p>
            <p className="mt-2 text-gray-600">
              <span className="font-semibold">Delivery Date: </span>
              {format(new Date(order.delivary_date), 'PPP')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
