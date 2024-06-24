import React from 'react'

import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_ORDER_MUTATION = gql`
  mutation DeleteOrderMutation($id: String!) {
    deleteOrder(id: $id) {
      id
    }
  }
`

const Order = ({ order }) => {
  const [deleteOrder] = useMutation(DELETE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order deleted')
      navigate(routes.orders())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete order ' + id + '?')) {
      deleteOrder({ variables: { id } })
    }
  }

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-4 shadow-lg">
      <header className="flex items-center justify-between rounded-t-lg bg-gray-800 px-6 py-4 text-white">
        <h2 className="text-lg font-semibold">Order {order.id} Detail</h2>
      </header>
      <div className="space-y-4 p-6">
        {Object.entries(order?.order_item).map(([key, value]) => {
          let title = key
          title = title.replaceAll('your', '')
          title = title.replaceAll('select', '')
          title = title.replaceAll('Your', '')
          title = title.replaceAll('Select', '')
          title = title.trim()
          return (
            <div
              key={key}
              className="mb-4 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="font-semibold text-gray-700">{title}</div>
              <div className="text-gray-600">{value}</div>
            </div>
          )
        })}
        <div className="mb-4 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-gray-700">Total Amount</div>
          <div className="text-gray-600">{order.total_amount}</div>
        </div>
        <div className="mb-4 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-gray-700">Status</div>
          <div className="text-gray-600">{order.status}</div>
        </div>
        <div className="mb-4 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-gray-700">Delivery Date</div>
          <div className="text-gray-600">{timeTag(order.delivary_date)}</div>
        </div>
        <div className="mb-4 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-gray-700">Order Created At</div>
          <div className="text-gray-600">{timeTag(order.created_at)}</div>
        </div>
        <div className="mb-4 flex flex-col border-b pb-4 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-gray-700">Status Updated At</div>
          <div className="text-gray-600">{timeTag(order.updated_at)}</div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-gray-700">User Name</div>
          <div className="text-gray-600">{order.user?.email}</div>
        </div>
      </div>
      <div className="flex justify-end space-x-2 rounded-b-lg bg-gray-100 p-6">
        <Link
          to={routes.editOrder({ id: order.id })}
          className="flex items-center space-x-1 rounded-lg bg-blue-500 px-4 py-2 text-white shadow transition duration-150 hover:bg-blue-600"
        >
          <FaEdit />
          <span>Edit</span>
        </Link>
        <button
          type="button"
          className="flex items-center space-x-1 rounded-lg bg-red-500 px-4 py-2 text-white shadow transition duration-150 hover:bg-red-600"
          onClick={() => onDeleteClick(order.id)}
        >
          <FaTrashAlt />
          <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default Order
