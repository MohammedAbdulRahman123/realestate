import {
  realLayoutses,
  realLayouts,
  createRealLayouts,
  updateRealLayouts,
  deleteRealLayouts,
} from './realLayoutses'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('realLayoutses', () => {
  scenario('returns all realLayoutses', async (scenario) => {
    const result = await realLayoutses()

    expect(result.length).toEqual(Object.keys(scenario.realLayouts).length)
  })

  scenario('returns a single realLayouts', async (scenario) => {
    const result = await realLayouts({ id: scenario.realLayouts.one.id })

    expect(result).toEqual(scenario.realLayouts.one)
  })

  scenario('creates a realLayouts', async (scenario) => {
    const result = await createRealLayouts({
      input: {
        name: 'String',
        image: 'String',
        markers: { foo: 'bar' },
        updated_at: '2024-06-24T10:17:05.921Z',
        userId: scenario.realLayouts.two.userId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.image).toEqual('String')
    expect(result.markers).toEqual({ foo: 'bar' })
    expect(result.updated_at).toEqual(new Date('2024-06-24T10:17:05.921Z'))
    expect(result.userId).toEqual(scenario.realLayouts.two.userId)
  })

  scenario('updates a realLayouts', async (scenario) => {
    const original = await realLayouts({
      id: scenario.realLayouts.one.id,
    })
    const result = await updateRealLayouts({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a realLayouts', async (scenario) => {
    const original = await deleteRealLayouts({
      id: scenario.realLayouts.one.id,
    })
    const result = await realLayouts({ id: original.id })

    expect(result).toEqual(null)
  })
})
