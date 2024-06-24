import { Link, routes } from '@redwoodjs/router'

import RealLayoutses from 'src/components/RealLayouts/RealLayoutses'

export const QUERY = gql`
  query FindRealLayoutses {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No realLayoutses yet. '}
      <Link to={routes.newRealLayouts()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ realLayoutses }) => {
  return <RealLayoutses realLayoutses={realLayoutses} />
}
