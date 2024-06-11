import { useState } from 'react'

import {
  BsPersonFillAdd,
  BsFillArrowRightCircleFill,
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs'
import { FaBed } from 'react-icons/fa'
import { MdLocalPharmacy, MdPayments } from 'react-icons/md'
import { TbReportMedical } from 'react-icons/tb'

import { Link, routes } from '@redwoodjs/router'
// import { FaPersonCirclePlus } from "react-icons/fi";
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const DashboardLayout = ({ children }) => {
  const { isAuthenticated, currentUser, logOut, hasRole } = useAuth()
  const [dropDownOpen, setDropDownOpen] = useState('')
  const [prevtext, setPrevText] = useState('')
  const isAdmin = currentUser?.roles == 'admin'
  console.log(currentUser)

  const toggleDropDown = (text) => {
    if (prevtext == text) {
      setDropDownOpen('')
      setPrevText('')
      return
    }
    setDropDownOpen(text)
    setPrevText(text)
  }
  return (
    <>
      <div
        x-data="setup()"
        //  :class="{'dark': isDark }"
      >
        <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
        <div className="flex flex-col flex-auto flex-shrink-0 min-h-screen antialiased text-white bg-gray-700">
          {/* Header */}
          <div className="fixed z-10 flex items-center justify-between w-full text-white h-14">
            <div className="flex items-center justify-start pl-3 bg-gray-800 border-none h-14 w-14 md:w-64 md:justify-center">
              <img
                className="mr-2 overflow-hidden rounded-full h-7 w-7 md:h-10 md:w-10"
                src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
              />
              <span className="hidden md:block"> {currentUser.email} </span>
              {/* <span className="hidden md:block"> {'hello'} </span> */}
            </div>
            <div className="flex items-center justify-end w-full bg-gray-800 h-14">
              <ul className="flex items-center">
                <li>
                  <div className="block w-px h-6 mx-3 bg-gray-700" />
                </li>
                <li>
                  <button
                    className="flex items-center mr-4 hover:text-blue-100"
                    onClick={logOut}
                  >
                    <span className="inline-flex mr-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </span>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          {/* ./Header */}
          {/* Sidebar */}
          <div className="fixed left-0 z-10 flex flex-col h-full text-white transition-all duration-300 bg-gray-900 border-none sidebar top-14 w-14 hover:w-64 md:w-64">
            <div className="flex flex-col justify-between flex-grow overflow-x-hidden overflow-y-auto">
              <ul className="flex flex-col py-4 space-y-1">
                {/* {(currentUser.permissions?.charges?.length > 0 || isAdmin) && */}

                <>
                  <li className="hidden px-5 md:block">
                    <div className="flex flex-row items-center h-8 mt-5">
                      <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                        Studio
                      </div>
                    </div>
                  </li>

                  {
                    <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link
                          to={routes.categories()}
                          className="relative flex flex-row items-center pr-6 border-l-4 border-transparent text-white-600 hover:text-white-800 h-11 hover:border-gray-800 hover:bg-gray-600 focus:outline-none"
                        >
                          <span className="inline-flex items-center justify-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Category
                          </span>
                        </Link>
                      </li>
                    </>
                  }
                  {
                    <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link
                          to={routes.subCategories()}
                          className="relative flex flex-row items-center pr-6 border-l-4 border-transparent text-white-600 hover:text-white-800 h-11 hover:border-gray-800 hover:bg-gray-600 focus:outline-none"
                        >
                          <span className="inline-flex items-center justify-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Sub Category
                          </span>
                        </Link>
                      </li>
                    </>
                  }
                  {
                    <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link
                          to={routes.configurations()}
                          className="relative flex flex-row items-center pr-6 border-l-4 border-transparent text-white-600 hover:text-white-800 h-11 hover:border-gray-800 hover:bg-gray-600 focus:outline-none"
                        >
                          <span className="inline-flex items-center justify-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Configuration
                          </span>
                        </Link>
                      </li>
                    </>
                  }
                  {
                    <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link
                          to={routes.products()}
                          className="relative flex flex-row items-center pr-6 border-l-4 border-transparent text-white-600 hover:text-white-800 h-11 hover:border-gray-800 hover:bg-gray-600 focus:outline-none"
                        >
                          <span className="inline-flex items-center justify-center ml-4">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 text-sm tracking-wide truncate">
                            Product
                          </span>
                        </Link>
                      </li>
                    </>
                  }
                </>
              </ul>
              <p className="hidden px-5 py-3 text-xs text-center mb-14 md:block">
                Copyright @2024
              </p>
            </div>
          </div>
          {/* ./Sidebar */}
          <div className="h-full mb-10 ml-14 mt-14 md:ml-64">{children}</div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
