import {
  configurations,
  configuration,
  createConfiguration,
  updateConfiguration,
  deleteConfiguration,
} from './configurations'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('configurations', () => {
  scenario('returns all configurations', async (scenario) => {
    const result = await configurations()

    expect(result.length).toEqual(Object.keys(scenario.configuration).length)
  })

  scenario('returns a single configuration', async (scenario) => {
    const result = await configuration({ id: scenario.configuration.one.id })

    expect(result).toEqual(scenario.configuration.one)
  })

  scenario('creates a configuration', async () => {
    const result = await createConfiguration({
      input: { heading: 'String', updated_at: '2024-06-11T12:43:43.360Z' },
    })

    expect(result.heading).toEqual('String')
    expect(result.updated_at).toEqual(new Date('2024-06-11T12:43:43.360Z'))
  })

  scenario('updates a configuration', async (scenario) => {
    const original = await configuration({
      id: scenario.configuration.one.id,
    })
    const result = await updateConfiguration({
      id: original.id,
      input: { heading: 'String2' },
    })

    expect(result.heading).toEqual('String2')
  })

  scenario('deletes a configuration', async (scenario) => {
    const original = await deleteConfiguration({
      id: scenario.configuration.one.id,
    })
    const result = await configuration({ id: original.id })

    expect(result).toEqual(null)
  })
})
