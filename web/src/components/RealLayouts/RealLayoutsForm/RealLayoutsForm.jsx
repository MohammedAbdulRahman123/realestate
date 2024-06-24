import React, { useState, useEffect } from 'react'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { storage } from 'src/Utils/Firebase'

import ImageUploadForm from '../ImageUpload'

const RealLayoutsForm = (props) => {
  const [markers, setMarkers] = useState(props?.realLayouts?.markers || [])
  // const [file1, setFile1] = useState(null)
  const [url1, setUrl1] = useState(props?.realLayouts?.image || '')
  const [image, setImage] = useState(props?.realLayouts?.image || null)
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()

  const onSubmit = async (data) => {
    let url = url1
    if ((url1 != '' || image) && !props?.realLayouts?.id) {
      console.log('here')
      const storageRef = ref(
        storage,
        `realestate/${currentUser.email}/${data['name']}.jpg`
      )
      const uploadTask = uploadBytesResumable(storageRef, image)

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
    data['markers'] = markers
    data['image'] = url
    data['userId'] = currentUser.id
    // console.log(markers)
    props.onSave(data, props?.realLayouts?.id)
  }

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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.realLayouts?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        {/* <Label
          name="image"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Image
        </Label>

        <TextField
          name="image"
          defaultValue={props.realLayouts?.image}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="image" className="rw-field-error" /> */}

        <ImageUploadForm
          markers={markers}
          setMarkers={setMarkers}
          url1={url1}
          setUrl1={setUrl1}
          image={image}
          setImage={setImage}
          prev={url1}
        />

        {/* <Label
          name="markers"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Markers
        </Label>

        <TextAreaField
          name="markers"
          defaultValue={JSON.stringify(props.realLayouts?.markers)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="markers" className="rw-field-error" />

        <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.realLayouts?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.realLayouts?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" /> */}

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RealLayoutsForm
