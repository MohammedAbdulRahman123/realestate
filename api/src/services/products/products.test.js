import {
  products,
  product,
  createProduct,
  updateProduct,
  deleteProduct,
} from './products'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('products', () => {
  scenario('returns all products', async (scenario) => {
    const result = await products()

    expect(result.length).toEqual(Object.keys(scenario.product).length)
  })

  scenario('returns a single product', async (scenario) => {
    const result = await product({ id: scenario.product.one.id })

    expect(result).toEqual(scenario.product.one)
  })

  scenario('creates a product', async (scenario) => {
    const result = await createProduct({
      input: {
        product_name: 'String',
        desc: { foo: 'bar' },
        configuration: { foo: 'bar' },
        price: { foo: 'bar' },
        image: 'String',
        updated_at: '2024-06-11T12:41:26.983Z',
        subCategoryId: scenario.product.two.subCategoryId,
      },
    })

    expect(result.product_name).toEqual('String')
    expect(result.desc).toEqual({ foo: 'bar' })
    expect(result.configuration).toEqual({ foo: 'bar' })
    expect(result.price).toEqual({ foo: 'bar' })
    expect(result.image).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-06-11T12:41:26.983Z'))
    expect(result.subCategoryId).toEqual(scenario.product.two.subCategoryId)
  })

  scenario('updates a product', async (scenario) => {
    const original = await product({ id: scenario.product.one.id })
    const result = await updateProduct({
      id: original.id,
      input: { product_name: 'String2' },
    })

    expect(result.product_name).toEqual('String2')
  })

  scenario('deletes a product', async (scenario) => {
    const original = await deleteProduct({
      id: scenario.product.one.id,
    })
    const result = await product({ id: original.id })

    expect(result).toEqual(null)
  })
})
