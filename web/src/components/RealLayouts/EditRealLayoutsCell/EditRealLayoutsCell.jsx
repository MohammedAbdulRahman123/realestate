import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RealLayoutsForm from 'src/components/RealLayouts/RealLayoutsForm'

export const QUERY = gql`
  query EditRealLayoutsById($id: Int!) {
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
const UPDATE_REAL_LAYOUTS_MUTATION = gql`
  mutation UpdateRealLayoutsMutation(
    $id: Int!
    $input: UpdateRealLayoutsInput!
  ) {
    updateRealLayouts(id: $id, input: $input) {
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

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ realLayouts }) => {
  const [updateRealLayouts, { loading, error }] = useMutation(
    UPDATE_REAL_LAYOUTS_MUTATION,
    {
      onCompleted: () => {
        toast.success('RealLayouts updated')
        navigate(routes.realLayoutses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateRealLayouts({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit RealLayouts {realLayouts?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RealLayoutsForm
          realLayouts={realLayouts}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
