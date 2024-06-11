import SubCategory from 'src/components/SubCategory/SubCategory'

export const QUERY = gql`
  query FindSubCategoryById($id: Int!) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>SubCategory not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ subCategory }) => {
  return <SubCategory subCategory={subCategory} />
}
