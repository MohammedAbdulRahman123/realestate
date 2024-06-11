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
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Order {order.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{order.id}</td>
            </tr>
            <tr>
              <th>Order item</th>
              <td>{jsonDisplay(order.order_item)}</td>
            </tr>
            <tr>
              <th>Total amount</th>
              <td>{order.total_amount}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{order.status}</td>
            </tr>
            <tr>
              <th>Delivary date</th>
              <td>{timeTag(order.delivary_date)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(order.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(order.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(order.extra)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{order.userId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editOrder({ id: order.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(order.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Order
