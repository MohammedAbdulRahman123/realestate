import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import JoditEditor from 'jodit-react'
import { MdDeleteForever } from 'react-icons/md'
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
import { toast } from '@redwoodjs/web/dist/toast'

import ImageSelector from 'src/components/ImageSelector/ImageSelector'
import { storage } from 'src/Utils/Firebase'

export const GET_CATEGORIES_AND_SUBCATEGORIES = gql`
  query GetCategoriesAndSubCategories {
    categories {
      id
      category_name
      SubCategory {
        id
        sub_category_name
      }
    }
    configurations {
      heading
    }
  }
`

const ProductForm = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_AND_SUBCATEGORIES)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState(null)
  const [shortDesc, setShortDesc] = useState(
    props.product?.desc?.shortDesc || ''
  )
  const [longDesc, setLongDesc] = useState(props.product?.desc?.longDesc || '')
  const [configurations, setConfigurations] = useState(
    props.product?.configuration || []
  )
  const [price, setPrice] = useState(props.product?.price?.actual_price || '')
  const [extra, setExtra] = useState(props.product?.extra || '')
  const [file1, setFile1] = useState(null)
  const [url1, setUrl1] = useState(
    props?.clientInfo?.details?.profileImage || ''
  )

  useEffect(() => {
    if (props.product?.subCategoryId && data) {
      const subCategoryId = props.product?.subCategoryId
      function findCategoryBySubCategoryId(subCategoryId) {
        for (const category of data.categories) {
          for (const subCategory of category.SubCategory) {
            if (subCategory.id === subCategoryId) {
              return category
            }
          }
        }
        return null // Return null if no match is found
      }
      let category = findCategoryBySubCategoryId(subCategoryId)
      // console.log('here', category)
      let obj = {
        value: category.id,
        label: category.category_name,
        subCategories: category.SubCategory.map((subCat) => ({
          value: subCat.id,
          label: subCat.sub_category_name,
        })),
      }
      let subcat = obj.subCategories?.find((val) => val.value == subCategoryId)
      // console.log(subcat)
      setSelectedCategory(obj)
      setSelectedSubCategory(subcat)
      // const subCategory = data.categories
      //   .flatMap((category) => category.SubCategory)
      //   .find((subCat) => subCat.id === props.product.subCategoryId)
      // console.log(subCategory)
      // if (subCategory) {
      //   setSelectedCategory(
      //     data.categories.find((cat) => cat.id === subCategory.categoryId)
      //   )
      //   setSelectedSubCategory(subCategory)
      // }
      console.log('hello', props.product?.subCategoryId)
    }

    // console.log(props.product, shortDesc)
  }, [props.product, data])

  const onSubmit = async (data) => {
    let url = url1
    if (url1 != '' || file1) {
      console.log('here')
      const storageRef = ref(storage, `justprint/${data['product_name']}.jpg`)
      const uploadTask = uploadBytesResumable(storageRef, file1)

      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (error) => {
            console.error(error.message)
            reject(error)
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              // console.log('here2', downloadURL)
              // setUrl1(downloadURL)
              url = downloadURL
              resolve(downloadURL)
            } catch (error) {
              console.error('Error getting download URL:', error.message)
              reject(error)
            }
          }
        )
      })

      await uploadPromise
    }
    console.log(url)

    data['image'] = url
    data.subCategoryId = selectedSubCategory?.value
    data['desc'] = {
      shortDesc,
      longDesc,
    }
    data.configuration = configurations
    data.price = {
      actual_price: parseInt(price, 10),
    }
    data.extra = {
      extra,
    }

    for (const key in data) {
      if (key.includes('waste')) {
        delete data[key]
      }
    }

    // console.log(data)
    props.onSave(data, props?.product?.id)
  }

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption)
    setSelectedSubCategory(null)
  }

  const handleSubCategoryChange = (selectedOption) => {
    setSelectedSubCategory(selectedOption)
  }

  const handleFileChange1 = (e) => {
    if (e.target.files[0]) {
      setFile1(e.target.files[0])
    }
  }

  const handleAddConfiguration = () => {
    setConfigurations([...configurations, { name: '', values: [] }])
  }

  const handleConfigurationNameChange = (index, selectedOption) => {
    const newConfigurations = [...configurations]
    newConfigurations[index].name = selectedOption.value
    setConfigurations(newConfigurations)
  }

  const handleConfigurationValuesChange = (index, values) => {
    const newConfigurations = [...configurations]
    newConfigurations[index].values = values.split(',').map((v) => v.trim())
    setConfigurations(newConfigurations)
  }

  const handleRemoveConfiguration = (index) => {
    const newConfigurations = configurations.filter((_, i) => i !== index)
    setConfigurations(newConfigurations)
  }

  const categoryOptions =
    data?.categories.map((category) => ({
      value: category.id,
      label: category.category_name,
      subCategories: category.SubCategory.map((subCat) => ({
        value: subCat.id,
        label: subCat.sub_category_name,
      })),
    })) || []

  const subCategoryOptions = selectedCategory
    ? selectedCategory.subCategories
    : []

  const configurationOptions =
    data?.configurations.map((config) => ({
      value: config.heading,
      label: config.heading,
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
          name="product_name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Product name
        </Label>

        <TextField
          name="product_name"
          defaultValue={props.product?.product_name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="product_name" className="rw-field-error" />

        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p>Error loading categories: {error.message}</p>
        ) : (
          <>
            <Label
              name="subCategoryId"
              className="rw-label"
              errorClassName="rw-label rw-label-error"
            >
              Category
            </Label>
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="rw-input"
              classNamePrefix="react-select"
            />
          </>
        )}

        <FieldError name="categoryId" className="rw-field-error" />

        <Label
          name="subCategoryId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Sub Category
        </Label>

        <Select
          options={subCategoryOptions}
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
          className="rw-input"
          classNamePrefix="react-select"
          isDisabled={!selectedCategory}
        />

        <FieldError name="subCategoryId" className="rw-field-error" />

        <Label
          name="shortDesc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Short Description
        </Label>

        <JoditEditor
          value={shortDesc}
          onBlur={(newContent) => setShortDesc(newContent)}
          className="rw-input"
        />

        <FieldError name="shortDesc" className="rw-field-error" />

        <Label
          name="longDesc"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Long Description
        </Label>

        <JoditEditor
          value={longDesc}
          onBlur={(newContent) => setLongDesc(newContent)}
          className="rw-input"
        />

        <FieldError name="longDesc" className="rw-field-error" />

        <Label
          name="configuration"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Configuration
        </Label>

        {configurations.map((config, index) => (
          <div key={index} className="mb-4">
            <Select
              options={configurationOptions}
              value={configurationOptions.find(
                (option) => option.value === config.name
              )}
              onChange={(selectedOption) =>
                handleConfigurationNameChange(index, selectedOption)
              }
              className="rw-input"
              classNamePrefix="react-select"
            />
            <TextField
              name={`waste` + index}
              placeholder="Enter values separated by commas"
              value={config.values.join(', ')}
              onChange={(e) =>
                handleConfigurationValuesChange(index, e.target.value)
              }
              className="rw-input mt-2"
            />
            <button
              type="button"
              onClick={() => handleRemoveConfiguration(index)}
              className="mt-2 text-red-600"
            >
              <MdDeleteForever size={24} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddConfiguration}
          className="rw-button rw-button-blue"
        >
          Add Configuration
        </button>

        <FieldError name="configuration" className="rw-field-error" />

        <Label
          name="price"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Price For 50 Qty
        </Label>

        <NumberField
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="price" className="rw-field-error" />

        <div className="mb-4 p-3 ">
          <ImageSelector
            id="logo"
            label="Product Image"
            allowMultiple={false}
            url={url1}
            handleFileChange={handleFileChange1}
            setUrl={setUrl1}
          />
        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProductForm
