import React, { useState } from 'react'

import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import JoditEditor from 'jodit-react'
import Select from 'react-select'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

export const GET_CATEGORY = gql`
  query GetCategory {
    categories {
      id
      category_name
    }
  }
`

const SubCategoryForm = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORY)
  const [selectedCategory, setSelectedCategory] = useState(
    props.subCategory?.categoryId || null
  )
  const [desc, setDesc] = useState(props.subCategory?.desc || '')
  // const [extra, setExtra] = useState(props.subCategory?.extra || '')

  const onSubmit = (data) => {
    data.categoryId = selectedCategory
    data.desc = desc

    props.onSave(data, props?.subCategory?.id)
  }

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption ? selectedOption.value : null)
  }

  const categoryOptions =
    data?.categories.map((category) => ({
      value: category.id,
      label: category.category_name,
    })) || []

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="categoryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Category
        </Label>

        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error loading categories: {error.message}</p>
        ) : (
          <Select
            options={categoryOptions}
            defaultValue={categoryOptions.find(
              (option) => option.value === props.subCategory?.categoryId
            )}
            onChange={handleCategoryChange}
            className="rw-input"
            classNamePrefix="react-select"
          />
        )}

        <FieldError name="categoryId" className="rw-field-error" />

        <Label
          name="sub_category_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sub category name
        </Label>

        <TextField
          name="sub_category_name"
          defaultValue={props.subCategory?.sub_category_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="sub_category_name" className="rw-field-error" />

        <Label
          name="desc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Desc
        </Label>

        <JoditEditor
          value={desc}
          onChange={(newContent) => setDesc(newContent)}
          className="rw-input"
        />

        <FieldError name="desc" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default SubCategoryForm
