export const QUERY = gql`
  query FindTrackOrderQuery($id: Int!) {
    trackOrder: trackOrder(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ trackOrder }) => {
  return <div>{JSON.stringify(trackOrder)}</div>
}
