import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import { IdeasData } from '../../Data/IdeasData';
import IdeasModal from '@/Components/IdeasModal';
import SelectDepartment from '@/Components/SelectDepartment';
import SelectPerson from '@/Components/SelectPerson';

export default function Ideas(props) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ideas</h2>}
        >
            <Head title="Ideas" />
            <div className="at-btnbackarea flex gap-4 justify-between">
                <div className="w-full flex mb-[40px]">
                    <Link className="flex items-center justify-center text-black text-sm font-productsans-bold gap-5" href="/dashboard">
                        <em className="flex justify-center items-center w-[44px] h-[44px] bg-white rounded-xl">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.995 4.99997H3.40501L6.70501 1.71268C6.89332 1.52453 6.9991 1.26935 6.9991 1.00326C6.9991 0.737183 6.89332 0.481998 6.70501 0.29385C6.51671 0.105701 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105701 5.28501 0.29385L0.285014 5.28973C0.193973 5.38476 0.122608 5.49681 0.0750135 5.61946C-0.0250045 5.86272 -0.0250045 6.13557 0.0750135 6.37883C0.122608 6.50149 0.193973 6.61354 0.285014 6.70856L5.28501 11.7044C5.37798 11.7981 5.48858 11.8724 5.61044 11.9232C5.7323 11.9739 5.863 12 5.99501 12C6.12703 12 6.25773 11.9739 6.37959 11.9232C6.50145 11.8724 6.61205 11.7981 6.70501 11.7044C6.79874 11.6116 6.87314 11.501 6.9239 11.3793C6.97467 11.2575 7.00081 11.1269 7.00081 10.995C7.00081 10.8631 6.97467 10.7325 6.9239 10.6108C6.87314 10.489 6.79874 10.3785 6.70501 10.2856L3.40501 6.99832H10.995C11.2602 6.99832 11.5146 6.89305 11.7021 6.70567C11.8897 6.51829 11.995 6.26415 11.995 5.99915C11.995 5.73415 11.8897 5.48001 11.7021 5.29262C11.5146 5.10524 11.2602 4.99997 10.995 4.99997Z" fill="#3A3A3A" />
                            </svg>
                        </em>
                        <span>Back</span>
                    </Link>
                </div>
            </div>
            <div className="at-pagehead mb-6 block md:flex items-center justify-between">
                <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Ideas</h3>
                <div className="grid grid-cols-2 md:flex justify-between md:justify-center items-center gap-3 md:mt-0 mt-5 at-ideasfilters">
                    <SelectPerson/>
                    <SelectDepartment />
                </div>
            </div>
            <div className="at-ideasarea w-full">
                <div className="at-themetablearea at-ideastablearea w-full">
                    <table className="at-themetable">
                        <thead>
                            <tr>
                                <th className="font-product_sansregular">Employee</th>
                                <th className="font-product_sansregular">Designation</th>
                                <th className="font-product_sansregular">Department</th>
                                <th className="font-product_sansregular">Title</th>
                                <th className="font-product_sansregular">Date</th>
                                <th className="!text-center font-product_sansregular">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {IdeasData.map((item, i) => (
                                <tr>
                                    <td data-title="Employee">
                                        <div className="at-themeemployeinfo at-bdleftborder">
                                            <figure className="at-empimage">
                                                <img src={item.empimage} alt="Employee Image" />
                                            </figure>
                                            <div className="at-usernameemail">
                                                <h3 className="text-black font-product_sansregular font-bold text-base leading-4 mb-2 tracking-wide">{item.name}</h3>
                                                <span className="inline-block text-lightblack text-sm leading-4 font-product-sansregular">{item.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td data-title="Designation" className="text-left">
                                        <span>{item.deignation}</span>
                                    </td>
                                    <td data-title="Department">
                                        <span>{item.department}</span>
                                    </td>
                                    <td data-title="Title">
                                        <span>{item.title}</span>
                                    </td>
                                    <td data-title="Date">
                                        <span>{item.date}</span>
                                    </td>
                                    <td data-title="Action" className="px-2">
                                        <button className="bg-[#00cc6f] text-white text-base rounded-lg font-product_sansregular px-[25px] min-h-[40px] flex items-center justify-center mx-auto" type="button" onClick={openModal}>{item.action}</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <IdeasModal isOpen={isOpen} closeModal={closeModal} />
        </AuthenticatedLayout>
    );
}
