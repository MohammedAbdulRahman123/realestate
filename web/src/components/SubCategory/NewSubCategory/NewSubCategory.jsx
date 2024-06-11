import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SubCategoryForm from 'src/components/SubCategory/SubCategoryForm'

const CREATE_SUB_CATEGORY_MUTATION = gql`
  mutation CreateSubCategoryMutation($input: CreateSubCategoryInput!) {
    createSubCategory(input: $input) {
      id
    }
  }
`

const NewSubCategory = () => {
  const [createSubCategory, { loading, error }] = useMutation(
    CREATE_SUB_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('SubCategory created')
        navigate(routes.subCategories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createSubCategory({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New SubCategory</h2>
      </header>
      <div className="rw-segment-main">
        <SubCategoryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewSubCategory
