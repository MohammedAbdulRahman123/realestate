// web/src/components/Navbar.js
import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import {
  FaBars,
  FaTimes,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaChevronDown,
} from 'react-icons/fa'

import { Link, navigate, routes } from '@redwoodjs/router'

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
  }
`

const UserLayout = ({ children }) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES_AND_SUBCATEGORIES)
  const [category, setCategory] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState({
    ourProduct: false,
    aboutUs: false,
    browse: false,
  })

  useEffect(() => {
    if (data) {
      const subCategory = data.categories
      setCategory(subCategory)
    }
  }, [data])
  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-8 border-solid border-yellow-500"></div>
      </div>
    )
  }

  const submenuItems = {
    ourProduct: [
      { name: 'Product 1', path: '/product1' },
      { name: 'Product 2', path: '/product2' },
      { name: 'Product 3', path: '/product3' },
    ],
    aboutUs: [
      { name: 'Our Team', path: '/ourteam' },
      { name: 'Our Story', path: '/ourstory' },
    ],
    browse: [
      { name: 'Category 1', path: '/category1' },
      { name: 'Category 2', path: '/category2' },
    ],
  }

  const toggleSubmenu = (menu) => {
    setSubmenuOpen({ ...submenuOpen, [menu]: !submenuOpen[menu] })
  }

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <FaTimes className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <FaBars className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="flex h-14 w-14 flex-1 items-center justify-center sm:items-center sm:justify-start">
              <div className="flex-shrink-0">
                <img
                  className="h-14 w-14 rounded-full"
                  src="/logo.png"
                  alt="JustPrint"
                />
              </div>
              <div className="hidden  sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <div className="relative">
                    <button
                      onClick={() => toggleSubmenu('ourProduct')}
                      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Our Product
                      <FaChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {submenuOpen.ourProduct && (
                      <div className="absolute left-0 z-50 mt-2 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                        {category.map((item) => (
                          <div className='m-4'>
                            <h2 className="font-bold mb-2 text-white">{item.category_name}</h2>

                            <div className=''>
                            {
                              item.SubCategory.map((it) => (
                                <Link
                            key={it.sub_category_name}
                            to={routes.showProducts({id:it.id})}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            {it.sub_category_name}
                          </Link>
                              ))
                            }



                            </div>
                            </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => toggleSubmenu('browse')}
                      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Browse
                      <FaChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {submenuOpen.browse && (
                      <div className="absolute left-0 z-50 mt-2 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                        {submenuItems.browse.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => toggleSubmenu('aboutUs')}
                      className="inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      About Us
                      <FaChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {submenuOpen.aboutUs && (
                      <div className="absolute left-0 z-50 mt-2 w-48 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                        {submenuItems.aboutUs.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/faq"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    FAQ
                  </Link>
                  <Link
                    to="/legal"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Legal
                  </Link>
                  <Link
                    to="/contactus"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Contact Us
                  </Link>
                  {/* <span className="text-gray-300">Call us: (123) 456-7890</span> */}
                  <Link
                    to="/login"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
          <div className="space-y-1 px-2 pb-3 pt-2">
            <div className="relative">
              <button
                onClick={() => toggleSubmenu('ourProduct')}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Our Product
                <FaChevronDown className="ml-1 inline h-4 w-4" />
              </button>
              {submenuOpen.ourProduct && (
                <div className="mt-2 space-y-1 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  {submenuItems.ourProduct.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleSubmenu('browse')}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Browse
                <FaChevronDown className="ml-1 inline h-4 w-4" />
              </button>
              {submenuOpen.browse && (
                <div className="mt-2 space-y-1 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  {submenuItems.browse.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => toggleSubmenu('aboutUs')}
                className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                About Us
                <FaChevronDown className="ml-1 inline h-4 w-4" />
              </button>
              {submenuOpen.aboutUs && (
                <div className="mt-2 space-y-1 rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
                  {submenuItems.aboutUs.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/faq"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              FAQ
            </Link>
            <Link
              to="/legal"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Legal
            </Link>
            <Link
              to="/contactus"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Contact Us
            </Link>
            <span className="block rounded-md px-3 py-2 text-base font-medium text-gray-300">
              Call us: (123) 456-7890
            </span>
            <Link
              to="/login"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {children}

      <footer className="bg-gray-800 py-8 text-gray-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-300">
                Quick Links
              </h3>
              <ul>
                <li className="mb-2">
                  <Link to="/ourproduct" className="hover:text-white">
                    Our Product
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/browse" className="hover:text-white">
                    Browse
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/aboutus" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/legal" className="hover:text-white">
                    Legal
                  </Link>
                </li>
                <li className="mb-2">
                  <Link to="/contactus" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-300">
                Contact Us
              </h3>
              <p className="mb-2">123 Printing Avenue</p>
              <p className="mb-2">Print City, PC 12345</p>
              <p className="mb-2">Phone: (123) 456-7890</p>
              <p className="mb-2">Email: info@justprint.com</p>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-300">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  <FaLinkedinIn size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} JustPrint. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default UserLayout
