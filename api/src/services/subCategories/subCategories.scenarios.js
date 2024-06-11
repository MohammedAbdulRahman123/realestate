export const standard = defineScenario({
  subCategory: {
    one: {
      data: {
        sub_category_name: 'String',
        desc: { foo: 'bar' },
        updated_at: '2024-06-11T12:40:44.681Z',
        category: {
          create: {
            category_name: 'String',
            updated_at: '2024-06-11T12:40:44.681Z',
          },
        },
      },
    },
    two: {
      data: {
        sub_category_name: 'String',
        desc: { foo: 'bar' },
        updated_at: '2024-06-11T12:40:44.681Z',
        category: {
          create: {
            category_name: 'String',
            updated_at: '2024-06-11T12:40:44.682Z',
          },
        },
      },
    },
  },
})
