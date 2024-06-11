import { navigate, routes } from '@redwoodjs/router'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import SubCategoryForm from 'src/components/SubCategory/SubCategoryForm'

export const QUERY = gql`
  query EditSubCategoryById($id: Int!) {
    subCategory: subCategory(id: $id) {
      id
      sub_category_name
      desc
      created_at
      updated_at
      extra
      categoryId
    }
  }
`
const UPDATE_SUB_CATEGORY_MUTATION = gql`
  mutation UpdateSubCategoryMutation(
    $id: Int!
    $input: UpdateSubCategoryInput!
  ) {
    updateSubCategory(id: $id, input: $input) {
      id
      sub_category_name
      desc
      created_at
      updated_at
      extra
      categoryId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subCategory }) => {
  const [updateSubCategory, { loading, error }] = useMutation(
    UPDATE_SUB_CATEGORY_MUTATION,
    {
      onCompleted: () => {
        toast.success('SubCategory updated')
        navigate(routes.subCategories())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateSubCategory({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit SubCategory {subCategory?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <SubCategoryForm
          subCategory={subCategory}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
