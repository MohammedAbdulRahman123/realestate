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
      subcategory{
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
        <h2 className="text-white text-3xl">
        {showProducts.length>0 && showProducts[0].subcategory.sub_category_name} Printing

        </h2>
      </div>
      <div className="flex justify-center">
        {
          showProducts.map((item)=>{

            return(

              <div className="bg-white p-4 m-4 flex flex-col justify-center items-center hover:shadow-2xl hover:shadow-white rounded-lg space-y-3">
              <img src={item.image} alt="" />
              <div className="text-xl">
                {item.product_name}
              </div>
            </div>
            )
          })
        }
      </div>

      { showProducts.length>0 && <div className="bg-white p-4">
        <h2 className="  font-bold">
        Cheap { showProducts[0].subcategory.sub_category_name} Printing

        </h2>
        <div dangerouslySetInnerHTML={{__html:showProducts[0].subcategory.desc}}>

        </div>
      </div>
}

    </div>
   </>
  )
}
