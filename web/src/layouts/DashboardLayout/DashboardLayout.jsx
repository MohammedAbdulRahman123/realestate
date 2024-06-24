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
        <div className="flex min-h-screen flex-auto flex-shrink-0 flex-col bg-gray-700 text-white antialiased">
          {/* Header */}
          <div className="fixed z-10 flex h-14 w-full items-center justify-between text-white">
            <div className="flex h-14 w-14 items-center justify-start border-none bg-gray-800 pl-3 md:w-64 md:justify-center">
              <img
                className="mr-2 h-7 w-7 overflow-hidden rounded-full md:h-10 md:w-10"
                src="https://therminic2018.eu/wp-content/uploads/2018/07/dummy-avatar.jpg"
              />
              <span className="hidden md:block"> {currentUser.email} </span>
              {/* <span className="hidden md:block"> {'hello'} </span> */}
            </div>
            <div className="flex h-14 w-full items-center justify-end bg-gray-800">
              <ul className="flex items-center">
                <li>
                  <div className="mx-3 block h-6 w-px bg-gray-700" />
                </li>
                <li>
                  <button
                    className="mr-4 flex items-center hover:text-blue-100"
                    onClick={logOut}
                  >
                    <span className="mr-1 inline-flex">
                      <svg
                        className="h-5 w-5"
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
          <div className="sidebar fixed left-0 top-14 z-10 flex h-full w-14 flex-col border-none bg-gray-900 text-white transition-all duration-300 hover:w-64 md:w-64">
            <div className="flex flex-grow flex-col justify-between overflow-y-auto overflow-x-hidden">
              <ul className="flex flex-col space-y-1 py-4">
                {/* {(currentUser.permissions?.charges?.length > 0 || isAdmin) && */}

                <>
                  <li className="hidden px-5 md:block">
                    <div className="mt-5 flex h-8 flex-row items-center">
                      <div className="text-sm font-light uppercase tracking-wide text-gray-400">
                        Studio
                      </div>
                    </div>
                  </li>

                  {
                    <>
                      <li onClick={toggleDropDown.bind(this, 'lab')}>
                        <Link
                          to={routes.realLayoutses()}
                          className="text-white-600 hover:text-white-800 relative flex h-11 flex-row items-center border-l-4 border-transparent pr-6 hover:border-gray-800 hover:bg-gray-600 focus:outline-none"
                        >
                          <span className="ml-4 inline-flex items-center justify-center">
                            <BsPersonFillAdd />
                          </span>
                          <span className="ml-2 truncate text-sm tracking-wide">
                            Manage Layout
                          </span>
                        </Link>
                      </li>
                    </>
                  }
                </>
              </ul>
              <p className="mb-14 hidden px-5 py-3 text-center text-xs md:block">
                Copyright @2024
              </p>
            </div>
          </div>
          {/* ./Sidebar */}
          <div className="mb-10 ml-14 mt-14 h-full md:ml-64">{children}</div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
