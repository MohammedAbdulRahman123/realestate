import { Link, routes } from '@redwoodjs/router'

export const QUERY = gql`
  query ShowProductsQuery($id: Int!) {
    showProducts(id: $id) {
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
        desc
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ showProducts }) => {
  console.log(showProducts)
  return (
    <>
      <div className="bg-gray-500 p-4">
        <div>
          <h2 className="text-3xl text-white">
            {showProducts.length > 0 &&
              showProducts[0].subcategory.sub_category_name}{' '}
            Printing
          </h2>
        </div>
        <div className="flex justify-center">
          {showProducts.map((item) => {
            return (
              <Link
                className="m-4 flex flex-col items-center justify-center space-y-3 rounded-lg bg-white p-4 hover:shadow-2xl hover:shadow-white"
                to={routes.prod({ id: item.id })}
              >
                <img src={item.image} alt="" className="w-64" />
                <div className="text-xl">{item.product_name}</div>
              </Link>
            )
          })}
        </div>

        {showProducts.length > 0 && (
          <div className="bg-white p-4">
            <h2 className="  font-bold">
              Cheap {showProducts[0].subcategory.sub_category_name} Printing
            </h2>
            <div
              dangerouslySetInnerHTML={{
                __html: showProducts[0].subcategory.desc,
              }}
            ></div>
          </div>
        )}
      </div>
    </>
  )
}
