import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import CatalogueForm from 'src/components/Catalogue/CatalogueForm'

const CREATE_CATALOGUE_MUTATION = gql`
  mutation CreateCatalogueMutation($input: CreateCatalogueInput!) {
    createCatalogue(input: $input) {
      id
    }
  }
`

const NewCatalogue = () => {
  const [createCatalogue, { loading, error }] = useMutation(
    CREATE_CATALOGUE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Catalogue created')
        navigate(routes.catalogues())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createCatalogue({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Catalogue</h2>
      </header>
      <div className="rw-segment-main">
        <CatalogueForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewCatalogue
