import {Popover, Transition} from '@headlessui/react'
import React, {Fragment} from 'react'
import {SearchSelectLeadData} from '../../Data/SearchSelectLeadData'
import {LeadManagerData} from '../../Data/LeadManagerData'


export default function EmployeeDetailLeadSelect(props) {
    return (
        <div className="flex min-h-0">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={`
                ${open ? '' : 'text-opacity-90'} focus:outline-none focus:ring-0`}
                        >
                            <div className="at-themeemployeinfo !border-l-0 !pl-0 !min-h-fit">
                                <div className="at-usernameemail">
                                    <h3 className="text-black font-product_sansregular font-bold text-base leading-4 mb-0 tracking-wide">{props.lead.name}</h3>
                                </div>
                            </div>
                        </Popover.Button>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="at-leaddropdown absolute left-1/2 top-7 z-10 w-[320px] -translate-x-1/2 transform px-0">
                                <div className="overflow-hidden rounded-lg shadow-lg p-[16px] bg-white w-full">
                                    <h4 className="text-base font-product-sansregular text-left mb-4 font-bold">Select
                                        Lead/Manager</h4>
                                    <form className="at-searchform w-full mb-[20px]">
                                        <fieldset className="">
                                            <div className="form-group relative">
                                                <input
                                                    className="h-[40px] w-full rounded-lg border pr-[40px] border-bordercolor text-black placeholder:text-gray1 focus:border-black focus:ring-0"
                                                    type="search" name="search" placeholder="Search"/>
                                                <svg
                                                    className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
                                                    width="20" height="20" viewBox="0 0 21 21" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                          d="M9 1.75C4.99594 1.75 1.75 4.99594 1.75 9C1.75 13.0041 4.99594 16.25 9 16.25C13.0041 16.25 16.25 13.0041 16.25 9C16.25 4.99594 13.0041 1.75 9 1.75ZM0.25 9C0.25 4.16751 4.16751 0.25 9 0.25C13.8325 0.25 17.75 4.16751 17.75 9C17.75 11.1462 16.9773 13.112 15.6949 14.6342L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2374 20.8232 19.7626 20.8232 19.4697 20.5303L14.6342 15.6949C13.112 16.9773 11.1462 17.75 9 17.75C4.16751 17.75 0.25 13.8325 0.25 9Z"
                                                          fill="#C0BCBC"/>
                                                </svg>

                                            </div>
                                        </fieldset>
                                    </form>
                                    <div className="relative">
                                        <ul className="w-full m-0 p-0 max-h-[180px] overflow-auto at-themescrollhide">
                                            {props.leads_list.map((item) => (
                                                <li className="w-full flex items-center gap-2 py-3 cursor-pointer"  style={{borderLeftColor: props.depart_color}}>
                                                    <figure className="at-empimage"
                                                            style={{backgroundColor: props.depart_color}}>
                                                        {item.image != null ? <img src={item.image} alt="Employee Image"/> :
                                                            <span>{item.name.slice(0, 2)}</span>}
                                                    </figure>
                                                    <div className="flex items-center">
                                                        <h5 className="text-base font-product-sansregular text-black">{item.name}
                                                            <span className="text-gray1 "> {item.designation}</span></h5>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>
        </div>
    )
}

function IconOne() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#FFEDD5"/>
            <path
                d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
                stroke="#FB923C"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
        </svg>
    )
}

function IconTwo() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#FFEDD5"/>
            <path
                d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
                stroke="#FB923C"
                strokeWidth="2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
                stroke="#FDBA74"
                strokeWidth="2"
            />
        </svg>
    )
}

function IconThree() {
    return (
        <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect width="48" height="48" rx="8" fill="#FFEDD5"/>
            <rect x="13" y="32" width="2" height="4" fill="#FDBA74"/>
            <rect x="17" y="28" width="2" height="8" fill="#FDBA74"/>
            <rect x="21" y="24" width="2" height="12" fill="#FDBA74"/>
            <rect x="25" y="20" width="2" height="16" fill="#FDBA74"/>
            <rect x="29" y="16" width="2" height="20" fill="#FB923C"/>
            <rect x="33" y="12" width="2" height="24" fill="#FB923C"/>
        </svg>
    )
}
