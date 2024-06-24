import Prod from 'src/components/ShowProducts/Prod'

export const QUERY = gql`
  query FindProdQuery($id: Int!) {
    product: product(id: $id) {
      id
      product_name
      desc
      configuration
      price
      image
      created_at
      updated_at
      extra
      subCategoryId
      subcategory {
        sub_category_name
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ product }) => {
  return (
    <div className="bg-gray-500 p-4">
      <Prod product={product} />
    </div>
  )
}
