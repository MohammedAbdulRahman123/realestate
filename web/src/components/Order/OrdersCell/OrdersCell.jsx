import { Link, routes } from '@redwoodjs/router'

import Orders from 'src/components/Order/Orders'

export const QUERY = gql`
  query FindOrders {
    orders {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No orders yet. '}
      <Link to={routes.newOrder()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ orders }) => {
  return <Orders orders={orders} />
}
