import { orders, order, createOrder, updateOrder, deleteOrder } from './orders'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('orders', () => {
  scenario('returns all orders', async (scenario) => {
    const result = await orders()

    expect(result.length).toEqual(Object.keys(scenario.order).length)
  })

  scenario('returns a single order', async (scenario) => {
    const result = await order({ id: scenario.order.one.id })

    expect(result).toEqual(scenario.order.one)
  })

  scenario('creates a order', async (scenario) => {
    const result = await createOrder({
      input: {
        order_item: { foo: 'bar' },
        total_amount: 7816235.4021055,
        status: 'String',
        delivary_date: '2024-06-11T12:42:08.030Z',
        updated_at: '2024-06-11T12:42:08.030Z',
        userId: scenario.order.two.userId,
      },
    })

    expect(result.order_item).toEqual({ foo: 'bar' })
    expect(result.total_amount).toEqual(7816235.4021055)
    expect(result.status).toEqual('String')
    expect(result.delivary_date).toEqual(new Date('2024-06-11T12:42:08.030Z'))
    expect(result.updated_at).toEqual(new Date('2024-06-11T12:42:08.030Z'))
    expect(result.userId).toEqual(scenario.order.two.userId)
  })

  scenario('updates a order', async (scenario) => {
    const original = await order({ id: scenario.order.one.id })
    const result = await updateOrder({
      id: original.id,
      input: { order_item: { foo: 'baz' } },
    })

    expect(result.order_item).toEqual({ foo: 'baz' })
  })

  scenario('deletes a order', async (scenario) => {
    const original = await deleteOrder({ id: scenario.order.one.id })
    const result = await order({ id: original.id })

    expect(result).toEqual(null)
  })
})
