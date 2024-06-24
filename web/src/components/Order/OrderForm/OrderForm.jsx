import {
  Form,
  FormError,
  FieldError,
  Label,
  TextAreaField,
  TextField,
  DatetimeLocalField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const OrderForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.order?.id)
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

        {/* <Label
          name="order_item"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Order item
        </Label>

        <TextAreaField
          name="order_item"
          defaultValue={JSON.stringify(props.order?.order_item)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="order_item" className="rw-field-error" /> */}

        {/* <Label
          name="total_amount"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Total amount
        </Label>

        <TextField
          name="total_amount"
          defaultValue={props.order?.total_amount}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsNumber: true, required: true }}
        />

        <FieldError name="total_amount" className="rw-field-error" /> */}

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <TextField
          name="status"
          defaultValue={props.order?.status}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="delivary_date"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Delivary date
        </Label>

        <DatetimeLocalField
          name="delivary_date"
          defaultValue={formatDatetime(props.order?.delivary_date)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="delivary_date" className="rw-field-error" />

        {/* <Label
          name="extra"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Extra
        </Label>

        <TextAreaField
          name="extra"
          defaultValue={JSON.stringify(props.order?.extra)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true }}
        />

        <FieldError name="extra" className="rw-field-error" /> */}

        {/* <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.order?.userId}
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

export default OrderForm
