import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import RealLayoutsForm from 'src/components/RealLayouts/RealLayoutsForm'

const CREATE_REAL_LAYOUTS_MUTATION = gql`
  mutation CreateRealLayoutsMutation($input: CreateRealLayoutsInput!) {
    createRealLayouts(input: $input) {
      id
    }
  }
`

const NewRealLayouts = () => {
  const [createRealLayouts, { loading, error }] = useMutation(
    CREATE_REAL_LAYOUTS_MUTATION,
    {
      onCompleted: () => {
        toast.success('RealLayouts created')
        navigate(routes.realLayoutses())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createRealLayouts({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New RealLayouts</h2>
      </header>
      <div className="rw-segment-main">
        <RealLayoutsForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewRealLayouts
