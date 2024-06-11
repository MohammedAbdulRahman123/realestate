import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import OrderForm from 'src/components/Order/OrderForm'

export const QUERY = gql`
  query EditOrderById($id: String!) {
    order: order(id: $id) {
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
const UPDATE_ORDER_MUTATION = gql`
  mutation UpdateOrderMutation($id: String!, $input: UpdateOrderInput!) {
    updateOrder(id: $id, input: $input) {
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

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ order }) => {
  const [updateOrder, { loading, error }] = useMutation(UPDATE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order updated')
      navigate(routes.orders())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input, id) => {
    updateOrder({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Order {order?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <OrderForm
          order={order}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
