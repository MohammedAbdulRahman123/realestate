import Configuration from 'src/components/Configuration/Configuration'

export const QUERY = gql`
  query FindConfigurationById($id: Int!) {
    configuration: configuration(id: $id) {
      id
      heading
      created_at
      updated_at
      extra
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Configuration not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ configuration }) => {
  return <Configuration configuration={configuration} />
}
