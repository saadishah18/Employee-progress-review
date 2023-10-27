import React from 'react'
import { Fragment, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/inertia-react'
import ChangePasswordModal from '@/Components/ChangePasswordModal'
import PasswordSuccessModal from '@/Components/PasswordSuccessModal'

export default function Settings(props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  let [isOpenOne, setIsOpenOne] = useState(false)

  function closeModalOne() {
    setIsOpenOne(false)
  }

  function openModalOne() {
    setIsOpenOne(true)
  }
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Settings
        </h2>
      }
    >
      <Head title="Settings" />

      <div className="at-btnbackarea flex gap-4 justify-between">
        <div className="w-full flex mb-[40px]">
          <Link
            className="flex items-center justify-center text-black text-sm font-productsans-bold gap-5"
            href="/dashboard"
          >
            <em className="flex justify-center items-center w-[44px] h-[44px] bg-white rounded-xl">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.995 4.99997H3.40501L6.70501 1.71268C6.89332 1.52453 6.9991 1.26935 6.9991 1.00326C6.9991 0.737183 6.89332 0.481998 6.70501 0.29385C6.51671 0.105701 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105701 5.28501 0.29385L0.285014 5.28973C0.193973 5.38476 0.122608 5.49681 0.0750135 5.61946C-0.0250045 5.86272 -0.0250045 6.13557 0.0750135 6.37883C0.122608 6.50149 0.193973 6.61354 0.285014 6.70856L5.28501 11.7044C5.37798 11.7981 5.48858 11.8724 5.61044 11.9232C5.7323 11.9739 5.863 12 5.99501 12C6.12703 12 6.25773 11.9739 6.37959 11.9232C6.50145 11.8724 6.61205 11.7981 6.70501 11.7044C6.79874 11.6116 6.87314 11.501 6.9239 11.3793C6.97467 11.2575 7.00081 11.1269 7.00081 10.995C7.00081 10.8631 6.97467 10.7325 6.9239 10.6108C6.87314 10.489 6.79874 10.3785 6.70501 10.2856L3.40501 6.99832H10.995C11.2602 6.99832 11.5146 6.89305 11.7021 6.70567C11.8897 6.51829 11.995 6.26415 11.995 5.99915C11.995 5.73415 11.8897 5.48001 11.7021 5.29262C11.5146 5.10524 11.2602 4.99997 10.995 4.99997Z"
                  fill="#3A3A3A"
                />
              </svg>
            </em>
            <span>Back</span>
          </Link>
        </div>
      </div>
      <div className="at-pagehead mb-6">
        <h3 className="text-black text-[1.75rem] leading-7 font-bold font-product_sansregular">
          Profile Settings
        </h3>
      </div>
      <div className="at-themebox w-full clear-both min-h-[640px]">
        <div className="at-profileimgchange w-full float-left mb-[20px]">
          <figure className="w-[128px] h-[128px] rounded-full relative">
            <div className="top-0 right-0 absolute w-[36px] h-[36px] rounded-full bg-[#fb275d] flex justify-center items-center">
              <input type="file" name="chnageimg" id="at-changeprofileimg" className="hidden"/>
              <label htmlFor="at-changeprofileimg" className="mb-0 w-full h-full flex justify-center items-center cursor-pointer">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.2919 15.033C16.6369 15.033 16.9169 15.313 16.9169 15.658C16.9169 16.003 16.6369 16.283 16.2919 16.283H10.2477C9.90273 16.283 9.62273 16.003 9.62273 15.658C9.62273 15.313 9.90273 15.033 10.2477 15.033H16.2919ZM12.4301 1.0447C12.4717 1.0772 13.8659 2.16054 13.8659 2.16054C14.3726 2.4622 14.7684 3.00137 14.9184 3.6397C15.0676 4.27137 14.9592 4.92304 14.6117 5.47387C14.6094 5.47754 14.6071 5.48117 14.5991 5.49197L14.5928 5.50032C14.5364 5.57465 14.2912 5.8847 13.0536 7.43519C13.0421 7.45551 13.0291 7.47454 13.0149 7.49304C12.994 7.5203 12.9713 7.54535 12.9471 7.56817C12.8627 7.67445 12.7735 7.78612 12.6798 7.90353L12.4898 8.14142C12.0979 8.63223 11.6331 9.21424 11.0816 9.90455L10.7985 10.2588C9.73379 11.5914 8.3702 13.2977 6.6234 15.483C6.2409 15.9597 5.66757 16.2372 5.05173 16.2447L2.01923 16.283H2.0109C1.72173 16.283 1.47007 16.0847 1.40257 15.8022L0.720066 12.9097C0.579232 12.3105 0.719232 11.6922 1.1034 11.2122L8.9534 1.39387C8.95673 1.39054 8.95923 1.38637 8.96257 1.38304C9.8234 0.353869 11.3801 0.202202 12.4301 1.0447ZM8.07817 4.48917L2.07923 11.993C1.93673 12.1714 1.88423 12.4014 1.93673 12.6222L2.50423 15.0264L5.03673 14.9947C5.27757 14.9922 5.50007 14.8847 5.64757 14.7014C6.40714 13.751 7.36178 12.5566 8.34328 11.3284L8.69053 10.8938L9.03837 10.4585C9.95885 9.30657 10.8682 8.16839 11.6291 7.21572L8.07817 4.48917ZM9.92507 2.18054L8.859 3.5125L12.4096 6.23827C13.0931 5.38225 13.5427 4.81845 13.5842 4.7647C13.7209 4.54304 13.7742 4.2297 13.7026 3.92804C13.6292 3.61887 13.4367 3.35637 13.1592 3.18887C13.1001 3.14804 11.6959 2.05804 11.6526 2.02387C11.1242 1.60054 10.3534 1.67387 9.92507 2.18054Z"
                    fill="white"
                  />
                </svg>
              </label>
            </div>
            <img
              className="w-full h-full rounded-full object-cover"
              src="/assets/images/employeeplaceholder.jpg"
              alt="User Image"
            />
          </figure>
        </div>
        <div className="w-full">
          <h6 className="text-[#fb275d] font-bold font-product_sansregular text-2xl mb-5">
            Account settings
          </h6>
          <ul className="w-full list-none">
            <li className="w-full flex items-center justify-between">
              <span className="text-black text-lg font-product_sansregular">
                Notification alerts
              </span>
              <div className="at-themetogglebutton">
                <input type="checkbox" name="notification" id="at-checkbox" />
                <label htmlFor="at-checkbox"></label>
              </div>
            </li>
            <li className="w-full flex items-center justify-between mt-5">
              <span className="text-black text-lg font-product_sansregular">
                Change Password
              </span>
              <button type="button" className="" onClick={openModal}>
                <img
                  src="/assets/images/svg/arrow-right.svg"
                  alt="Right Arrow"
                />
              </button>
            </li>
          </ul>
        </div>
        <div className="w-full mt-10">
          <h6 className="text-[#fb275d] font-bold font-product_sansregular text-2xl mb-5">
            More
          </h6>
          <ul className="w-full list-none">
            <li className="w-full flex items-center justify-between">
              <span className="text-black text-lg font-product_sansregular">
                Privacy policy
              </span>
              <button type="button" className="">
                <img
                  src="/assets/images/svg/arrow-right.svg"
                  alt="Right Arrow"
                />
              </button>
            </li>
            <li className="w-full flex items-center justify-between mt-5">
              <span className="text-black text-lg font-product_sansregular">
                Terms and conditions
              </span>
              <button type="button" className="">
                <img
                  src="/assets/images/svg/arrow-right.svg"
                  alt="Right Arrow"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <ChangePasswordModal isOpen={isOpen} closeModal={closeModal} setIsOpenOne={setIsOpenOne} />
      <PasswordSuccessModal isOpen={isOpenOne} closeModal={closeModalOne}/>
    </AuthenticatedLayout>
  )
}
