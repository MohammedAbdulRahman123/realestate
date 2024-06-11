import {
  subCategories,
  subCategory,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from './subCategories'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('subCategories', () => {
  scenario('returns all subCategories', async (scenario) => {
    const result = await subCategories()

    expect(result.length).toEqual(Object.keys(scenario.subCategory).length)
  })

  scenario('returns a single subCategory', async (scenario) => {
    const result = await subCategory({ id: scenario.subCategory.one.id })

    expect(result).toEqual(scenario.subCategory.one)
  })

  scenario('creates a subCategory', async (scenario) => {
    const result = await createSubCategory({
      input: {
        sub_category_name: 'String',
        desc: { foo: 'bar' },
        updated_at: '2024-06-11T12:40:44.516Z',
        categoryId: scenario.subCategory.two.categoryId,
      },
    })

    expect(result.sub_category_name).toEqual('String')
    expect(result.desc).toEqual({ foo: 'bar' })
    expect(result.updated_at).toEqual(new Date('2024-06-11T12:40:44.516Z'))
    expect(result.categoryId).toEqual(scenario.subCategory.two.categoryId)
  })

  scenario('updates a subCategory', async (scenario) => {
    const original = await subCategory({
      id: scenario.subCategory.one.id,
    })
    const result = await updateSubCategory({
      id: original.id,
      input: { sub_category_name: 'String2' },
    })

    expect(result.sub_category_name).toEqual('String2')
  })

  scenario('deletes a subCategory', async (scenario) => {
    const original = await deleteSubCategory({
      id: scenario.subCategory.one.id,
    })
    const result = await subCategory({ id: original.id })

    expect(result).toEqual(null)
  })
})
