// web/src/components/FeaturesSection.js
import React from 'react'

import { FaTruck, FaThumbsUp, FaClock, FaTags, FaBox } from 'react-icons/fa'

const features = [
  {
    icon: <FaTruck className="h-12 w-12 text-blue-500" />,
    title: 'Free Delivery',
    description: 'Get free delivery on all orders.',
  },
  {
    icon: <FaThumbsUp className="h-12 w-12 text-blue-500" />,
    title: 'Complete Printing Services',
    description: 'We offer a complete range of printing services.',
  },
  {
    icon: <FaClock className="h-12 w-12 text-blue-500" />,
    title: 'Fast Order Processing',
    description: 'Quick and efficient order processing.',
  },
  {
    icon: <FaTags className="h-12 w-12 text-blue-500" />,
    title: 'Competitive Pricing',
    description: 'Get the best prices on all services.',
  },
  {
    icon: <FaBox className="h-12 w-12 text-blue-500" />,
    title: 'White Label Shipping',
    description: 'Shipping under your brand.',
  },
]

const FeaturesSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold leading-tight text-gray-900">
          LEADING IRELAND TRADE PRINTERS
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          We pride ourselves in being the best trade printers in the UK &
          Ireland. We gain a competitive edge, by ensuring we keep to our high
          standards of offering great turnaround times at unbeatable prices. If
          you find yourself looking for a trade printing partner to help grow
          your business in Ireland and the UK, then look no further. We have the
          required experience and expertise to offer you a high-quality trade
          printing service.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 flex items-center justify-center">
                <div className="rounded-full bg-gray-100 p-4">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
