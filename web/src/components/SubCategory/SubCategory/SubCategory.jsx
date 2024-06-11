import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_SUB_CATEGORY_MUTATION = gql`
  mutation DeleteSubCategoryMutation($id: Int!) {
    deleteSubCategory(id: $id) {
      id
    }
  }
`

const SubCategory = ({ subCategory }) => {
  const [deleteSubCategory] = useMutation(DELETE_SUB_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('SubCategory deleted')
      navigate(routes.subCategories())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete subCategory ' + id + '?')) {
      deleteSubCategory({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            SubCategory {subCategory.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{subCategory.id}</td>
            </tr>
            <tr>
              <th>Sub category name</th>
              <td>{subCategory.sub_category_name}</td>
            </tr>
            <tr>
              <th>Desc</th>
              <td>{jsonDisplay(subCategory.desc)}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(subCategory.created_at)}</td>
            </tr>
            <tr>
              <th>Updated at</th>
              <td>{timeTag(subCategory.updated_at)}</td>
            </tr>
            <tr>
              <th>Extra</th>
              <td>{jsonDisplay(subCategory.extra)}</td>
            </tr>
            <tr>
              <th>Category id</th>
              <td>{subCategory.categoryId}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editSubCategory({ id: subCategory.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(subCategory.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default SubCategory
