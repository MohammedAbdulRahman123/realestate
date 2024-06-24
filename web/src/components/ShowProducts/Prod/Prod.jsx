import React, { useEffect, useState } from 'react'

import { FaStar, FaCheckCircle } from 'react-icons/fa'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { formatDateByDay } from 'src/Utils/Utils'

const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrderMutation($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
    }
  }
`

const Prod = ({ product }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const [createOrder, { loading, error }] = useMutation(CREATE_ORDER_MUTATION, {
    onCompleted: () => {
      toast.success('Order Placed')
      navigate(routes.home())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const [selectedConfig, setSelectedConfig] = useState({})
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phoneNumber: '',
    paymentMethod: 'COD',
  })
  let dd = new Date()
  dd.setDate(dd.getDate() + 3)
  let rd = new Date()
  rd.setDate(rd.getDate() + 1)

  useEffect(() => {
    const initialConfig = {}
    product.configuration.forEach((item) => {
      initialConfig[item.name.toLowerCase()] = item.values[0]
    })
    initialConfig.quantity = 250 // Default quantity
    setSelectedConfig(initialConfig)
  }, [product.configuration])

  const handleConfigChange = (type, value) => {
    setSelectedConfig({ ...selectedConfig, [type]: value })
  }

  const handleOrderNowClick = () => {
    setShowOrderForm(true)
  }

  const handleBackClick = () => {
    setShowOrderForm(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const placeOrder = () => {
    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === ''
    )
    if (!isAuthenticated) {
      toast.error('Login To Proceed')
      return
    }

    if (isAnyFieldEmpty) {
      toast.error('Fill Up The form')
      return
    }

    console.log('Order placed with the following details:', {
      ...selectedConfig,
      ...formData,
    })
    let order_item = {
      ...selectedConfig,
      ...formData,
    }

    let input = {
      order_item,
      total_amount: 250,
      status: 'Under Process',
      delivary_date: new Date(rd),
      userId: currentUser.id,
    }
    createOrder({ variables: { input } })
    // Here you can add the functionality to submit the order details to your backend
  }

  const quantities = [250, 500, 1000, 2000, 3000, 4000, 5000, 10000]

  return (
    <div className="container mx-auto rounded-md bg-white px-5 py-12">
      {!showOrderForm ? (
        <>
          {/* Product Overview */}
          <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-1/3">
              <img
                src={product.image}
                alt={product.product_name}
                className="h-auto w-96 w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="lg:w-2/3">
              <h1 className="text-3xl font-bold">{product.product_name}</h1>
              <div
                className="mt-4 text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.desc.shortDesc }}
              ></div>
              <div className="mt-4">
                <span className="block font-semibold">Product:</span>{' '}
                {product.product_name}
              </div>
              <div className="mt-1">
                <span className="block font-semibold">Material:</span> 130-170
                Silk
              </div>
              <div className="mt-1">
                <span className="block font-semibold">Price:</span> from £123
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="mt-12">
            {product.configuration.map((config, index) => (
              <div key={index} className="mt-4">
                <h2 className="font-semibold">{config.name}</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {config.values.map((value, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleConfigChange(config.name.toLowerCase(), value)
                      }
                      className={`rounded-lg border px-4 py-2 ${
                        selectedConfig[config.name.toLowerCase()] === value
                          ? 'bg-red-500 text-white'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Quantity */}
          <div className="mt-12">
            <h2 className="font-semibold">Select Your Quantity</h2>
            <div className="mt-2 flex flex-col space-y-2">
              {quantities.map((quantity, index) => (
                <button
                  key={index}
                  onClick={() => handleConfigChange('quantity', quantity)}
                  className={`flex justify-between rounded-lg border px-4 py-2 ${
                    selectedConfig.quantity === quantity
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-700'
                  }`}
                >
                  <span>Quantity: {quantity}</span>
                  <span>
                    Price: £
                    {((quantity * product.price.actual_price) / 250).toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Details */}
          <div className="flex flex-wrap p-5">
            <div className="w-full p-4 lg:w-2/3">
              <h2 className="mb-4 text-2xl font-bold">Order Details</h2>
              <div className="rounded border p-4">
                <div className="mb-4 flex justify-center">
                  <img src={product.image} alt="Product" className="w-1/3" />
                </div>
                <table className="w-full border-collapse text-left">
                  <tbody>
                    <tr className="border-b">
                      <th className="py-2">Product</th>
                      <td className="py-2">
                        {product.subcategory.sub_category_name}
                      </td>
                    </tr>
                    {Object.entries(selectedConfig).map(([key, value]) => {
                      let title = key
                      title = title.replaceAll('your', '')
                      title = title.replaceAll('select', '')
                      title = title.replaceAll('Your', '')
                      title = title.replaceAll('Select', '')
                      title = title.trim()

                      return (
                        <tr className="border-b" key={key}>
                          <th className="py-2">{title}</th>
                          <td className="py-2">{value}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full p-4 lg:w-1/3">
              {/* <div className="mb-4 rounded bg-red-600 p-4 text-white">
                <div className="mb-2 font-bold">
                  ORDER AND APPROVE WITHIN THE NEXT
                </div>
                <div className="flex justify-between text-3xl">
                  <div>
                    <span>09</span>
                    <span className="block text-sm">HRS</span>
                  </div>
                  <div>
                    <span>13</span>
                    <span className="block text-sm">MINS</span>
                  </div>
                  <div>
                    <span>47</span>
                    <span className="block text-sm">SECS</span>
                  </div>
                </div>
              </div> */}
              <div className="mb-4 rounded bg-red-700 p-4 text-white">
                <div className="mb-2 font-bold">
                  YOUR ORDER WILL BE DISPATCHED ON
                </div>
                {/* <div className="text-2xl">Friday 21st June</div> */}
                <div className="text-2xl">{formatDateByDay(dd)}</div>
              </div>
              <div className="rounded bg-red-800 p-4 text-white">
                <div className="mb-2 font-bold">RECEIVE YOUR ORDER ON</div>
                <div className="text-2xl">{formatDateByDay(rd)}</div>
              </div>
            </div>
          </div>

          {/* Order Buttons */}
          <div className="mt-8 flex space-x-4">
            <button
              className="rounded-lg bg-green-500 px-4 py-2 text-white"
              onClick={handleOrderNowClick}
            >
              Proceed To Checkout
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold">Shipping Details</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="Your address"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="Your city"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="Your postal code"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="Your email"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                placeholder="Your phone number"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 p-4 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
              >
                <option value="COD">Cash on Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                className="rounded-lg bg-green-500 px-4 py-2 text-white"
                onClick={placeOrder}
              >
                PLACE ORDER
              </button>
              <button
                type="button"
                className="rounded-lg bg-gray-500 px-4 py-2 text-white"
                onClick={handleBackClick}
              >
                BACK
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}

export default Prod
