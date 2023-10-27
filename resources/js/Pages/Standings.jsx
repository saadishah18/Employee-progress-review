import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/inertia-react'
import SelectDepartment from '@/Components/SelectDepartment'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { MoreEmployeeData } from '../../Data/MoreEmployeeData'
import FullPageLoader from '@/Components/FullPageLoader'

const options = [
  { value: 'Desc', label: 'Desc' },
  { value: 'Asc', label: 'Asc' },
]
const options1 = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
  { value: 'April', label: 'April' },
  { value: 'May', label: 'May' },
  { value: 'June', label: 'June' },
  { value: 'July', label: 'July' },
  { value: 'August', label: 'August' },
  { value: 'Sepetember', label: 'Sepetember' },
  { value: 'October', label: 'October' },
  { value: 'November', label: 'November' },
  { value: 'December', label: 'December' },
]

export default function Standings(props) {
  return (
    <AuthenticatedLayout
      auth={props.auth}
      errors={props.errors}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Employee Detail
        </h2>
      }
    >
      <Head title="Standings" />
      {/* <FullPageLoader /> */}

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
      <div className="at-standingspage">
        <div className="at-standingcontentholder min-h-[640px]">
          <div className="at-standingsimages flex justify-between items-end gap-7">
            <div className="at-standoneimg relative order-2">
              <img
                className="z-[1] absolute -top-[220px] left-1/2 -translate-x-1/2 max-w-[42.813rem]"
                src="/assets/images/standing/stars.png"
                alt="Stars Image"
              />
              <figure className="at-standingimg at-standingone border-[8.5px] border-[#f6cb2b]">
                <img
                  className="at-crownimg absolute top-[-75px] left-1/2 -translate-x-1/2"
                  src="/assets/images/standing/crown.png"
                  alt="User Image"
                />
                <img
                  className="at-userstanimg w-full h-full block rounded-full"
                  src="/assets/images/standing/img1.jpg"
                  alt="User Image"
                />
                <span className="-bottom-[20px] lg:-bottom-[40px] left-1/2 absolute w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] rounded-full text-white flex items-center justify-center bg-[#f6cb2b] border-2 border-white text-base lg:text-2xl font-bold font-product-sansregular -translate-x-1/2">
                  1
                </span>
                <h4 className="absolute -bottom-[90px] left-1/2 -translate-x-1/2 font-normal font-product-sansregular text-3xl whitespace-nowrap">
                  Asad ali
                </h4>
              </figure>
            </div>
            <figure className="at-standingimg at-standingtwo border-[8.5px] border-[#FB275D] order-1 -mb-8">
              <img
                className="at-userstanimg w-full h-full block rounded-full"
                src="/assets/images/standing/img2.jpg"
                alt="User Image"
              />
              <span className="-bottom-[20px] lg:-bottom-[40px] left-1/2 absolute w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] rounded-full text-white flex items-center justify-center bg-[#FB275D] border-2 border-white text-base lg:text-2xl font-bold font-product-sansregular -translate-x-1/2">
                2
              </span>
              <h4 className="absolute -bottom-[90px] left-1/2 -translate-x-1/2 font-normal font-product-sansregular text-3xl whitespace-nowrap">
                Ali zaib
              </h4>
            </figure>
            <figure className="at-standingimg at-standingtwo border-[8.5px] border-[#4353FF] order-3 -mb-8">
              <img
                className="at-userstanimg w-full h-full block rounded-full"
                src="/assets/images/standing/img3.jpg"
                alt="User Image"
              />
              <span className="-bottom-[20px] lg:-bottom-[40px] left-1/2 absolute w-[30px] h-[30px] lg:w-[60px] lg:h-[60px] rounded-full text-white flex items-center justify-center bg-[#4353FF] border-2 border-white text-base lg:text-2xl font-bold font-product-sansregular -translate-x-1/2">
                3
              </span>
              <h4 className="absolute -bottom-[90px] left-1/2 -translate-x-1/2 font-normal font-product-sansregular text-3xl whitespace-nowrap">
                Junaid ali
              </h4>
            </figure>
          </div>
          <div className="at-moreemployees mt-24">
            <div className="at-standingfilters block md:flex justify-end items-end gap-[8px] mb-4">
              <div className="at-standingselectdept">
                <SelectDepartment />
              </div>
              <div className="at-standingselect flex justify-center items-center gap-[8px]">
                <Select
                  placeholder="Sort by"
                  options={options}
                  className="at-chartselect at-departmentselect"
                />
                <Select
                  placeholder="Select month"
                  options={options1}
                  className="at-chartselect at-departmentselect"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 at-allstandings">
              {MoreEmployeeData.map((item) => (
                <div className="w-full rounded-[20px] bg-themebgcolor min-h-[auto] lg:min-h-[365px] p-[20px] flex justify-center items-center flex-col">
                  <figure className="w-[8rem] h-[8rem] rounded-full mx-auto relative">
                    <span className="-top-0 left-0 absolute w-[30px] h-[30px] rounded-full text-white flex items-center justify-center bg-themecolor border-2 border-white text-sm font-bold font-product-sansregular">
                      {item.position}
                    </span>
                    <img
                      className="w-full h-full rounded-full object-cover"
                      src={item.employeimg}
                      alt="Employee Image"
                    />
                  </figure>
                  <div className="mt-5 w-full text-center">
                    <Link href="/standings-detail">
                      <a>
                        <h5 className="text-black leading-6 mb-3">
                          {item.empname}
                        </h5>
                      </a>
                    </Link>
                    <span className="text-lightblack text-sm font-product-sansregular">
                      {item.designation}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-5 mb-6">
                    <div className="flex items-center gap-1">
                      <span>
                        <img
                          src="/assets/images/svg/star-fill.svg"
                          alt="Start Icon"
                        />
                      </span>
                      <span>
                        <img
                          src="/assets/images/svg/star-fill.svg"
                          alt="Start Icon"
                        />
                      </span>
                      <span>
                        <img
                          src="/assets/images/svg/star-fill.svg"
                          alt="Start Icon"
                        />
                      </span>
                      <span>
                        <img
                          src="/assets/images/svg/star-fill.svg"
                          alt="Start Icon"
                        />
                      </span>
                      <span>
                        <img
                          src="/assets/images/svg/star-gray.svg"
                          alt="Start Icon"
                        />
                      </span>
                    </div>
                    <em className="not-italic text-sm leading-4 text-black font-bold">
                      {item.ratings}
                    </em>
                  </div>
                  <span
                    className={`at-empstatus flex min-w-[100px] max-w-[100px] rounded-[8px] h-10 items-center justify-center text-base leading-4 text-black font-product-sansregular border border-lightblack ${
                      item.status == 'Pending'
                        ? 'at-deptbgcolorpending'
                        : 'at-bgcolorrated'
                    }`}
                  >
                    Pending
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
