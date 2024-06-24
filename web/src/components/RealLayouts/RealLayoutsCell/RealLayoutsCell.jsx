import RealLayouts from 'src/components/RealLayouts/RealLayouts'

export const QUERY = gql`
  query FindRealLayoutsById($id: Int!) {
    realLayouts: realLayouts(id: $id) {
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

export const Empty = () => <div>RealLayouts not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ realLayouts }) => {
  return <RealLayouts realLayouts={realLayouts} />
}
