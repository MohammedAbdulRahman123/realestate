import { Link, routes } from '@redwoodjs/router'

import Configurations from 'src/components/Configuration/Configurations'

export const QUERY = gql`
  query FindConfigurations {
    configurations {
      id
      heading
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No configurations yet. '}
      <Link to={routes.newConfiguration()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ configurations }) => {
  return <Configurations configurations={configurations} />
}
