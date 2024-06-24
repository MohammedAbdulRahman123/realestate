// web/src/components/FeaturesSection.js
import React from 'react'

import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaClipboardList,
  FaSearch,
  FaSyncAlt,
} from 'react-icons/fa'

const features = [
  {
    icon: <FaMapMarkerAlt className="h-12 w-12 text-blue-500" />,
    title: 'Add Layouts',
    description: 'Easily add and manage your property layouts.',
  },
  {
    icon: <FaCheckCircle className="h-12 w-12 text-blue-500" />,
    title: 'Track Availability',
    description: 'See which layouts are sold or available.',
  },
  {
    icon: <FaClipboardList className="h-12 w-12 text-blue-500" />,
    title: 'Comprehensive Listings',
    description: 'View detailed information about each layout.',
  },
  {
    icon: <FaSearch className="h-12 w-12 text-blue-500" />,
    title: 'Advanced Search',
    description: 'Find layouts that match your criteria quickly.',
  },
  {
    icon: <FaSyncAlt className="h-12 w-12 text-blue-500" />,
    title: 'Real-Time Updates',
    description: 'Get real-time updates on layout status.',
  },
]

const FeaturesSection = () => {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-extrabold leading-tight text-gray-900">
          MANAGE YOUR LAYOUTS EASILY
        </h2>
        <p className="mt-4 text-center text-lg text-gray-600">
          Welcome to JustPrint, the best platform for managing your property
          layouts. Whether you are an owner looking to list your layouts or a
          user searching for available properties, we provide all the tools you
          need to stay informed and make decisions with confidence.
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
