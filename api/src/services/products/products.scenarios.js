export const standard = defineScenario({
  product: {
    one: {
      data: {
        product_name: 'String',
        desc: { foo: 'bar' },
        configuration: { foo: 'bar' },
        price: { foo: 'bar' },
        image: 'String',
        updated_at: '2024-06-11T12:41:27.067Z',
        subcategory: {
          create: {
            sub_category_name: 'String',
            desc: { foo: 'bar' },
            updated_at: '2024-06-11T12:41:27.067Z',
            category: {
              create: {
                category_name: 'String',
                updated_at: '2024-06-11T12:41:27.067Z',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        product_name: 'String',
        desc: { foo: 'bar' },
        configuration: { foo: 'bar' },
        price: { foo: 'bar' },
        image: 'String',
        updated_at: '2024-06-11T12:41:27.067Z',
        subcategory: {
          create: {
            sub_category_name: 'String',
            desc: { foo: 'bar' },
            updated_at: '2024-06-11T12:41:27.067Z',
            category: {
              create: {
                category_name: 'String',
                updated_at: '2024-06-11T12:41:27.067Z',
              },
            },
          },
        },
      },
    },
  },
})
