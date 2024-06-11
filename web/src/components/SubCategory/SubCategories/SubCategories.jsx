import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/SubCategory/SubCategoriesCell'
import { jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_SUB_CATEGORY_MUTATION = gql`
  mutation DeleteSubCategoryMutation($id: Int!) {
    deleteSubCategory(id: $id) {
      id
    }
  }
`

const SubCategoriesList = ({ subCategories }) => {
  const [deleteSubCategory] = useMutation(DELETE_SUB_CATEGORY_MUTATION, {
    onCompleted: () => {
      toast.success('SubCategory deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete subCategory ' + id + '?')) {
      deleteSubCategory({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Sub category name</th>
            <th>Desc</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Extra</th>
            <th>Category id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {subCategories.map((subCategory) => (
            <tr key={subCategory.id}>
              <td>{truncate(subCategory.id)}</td>
              <td>{truncate(subCategory.sub_category_name)}</td>
              <td>{jsonTruncate(subCategory.desc)}</td>
              <td>{timeTag(subCategory.created_at)}</td>
              <td>{timeTag(subCategory.updated_at)}</td>
              <td>{jsonTruncate(subCategory.extra)}</td>
              <td>{truncate(subCategory.categoryId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.subCategory({ id: subCategory.id })}
                    title={'Show subCategory ' + subCategory.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editSubCategory({ id: subCategory.id })}
                    title={'Edit subCategory ' + subCategory.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete subCategory ' + subCategory.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(subCategory.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SubCategoriesList
