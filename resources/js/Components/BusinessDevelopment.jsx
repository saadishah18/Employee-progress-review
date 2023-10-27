import {Link} from '@inertiajs/inertia-react'
import React, {useEffect, useState} from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {UiUx} from '../../Data/UiUxData'
import DeleteModal from './DeleteModal'
import SelectSearch from './SelectSearch'
import {LeadManagerData} from "../../Data/LeadManagerData";
import {Inertia} from "@inertiajs/inertia";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrettyRating from "pretty-rating-react";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons";

const animatedComponents = makeAnimated()

const status = [
    {value: '', label: 'All' },
    {value: 'Rated', label: 'Rated'},
    {value: 'Pending', label: 'Pending'},
]

const colourOptions = [
    // { value: 'Select Lead', label: 'Select Lead' },
    {value: 'Bilal Khalid', label: 'Bilal Khalid'},
    {value: 'Wajeeh Hussain', label: 'Wajeeh Hussain'},
    {value: 'M Hamza', label: 'M Hamza'},
]


const icons = {
    star: {
        complete: faStar,
        half: faStarHalfAlt,
        empty: farStar,
    },
};
const colors = {
    star: ['#FECC00'],
};


export default function BusinessDevelopment(props) {
    let users = props.users;
    let leads = props.teamleads;
    let [isOpen, setIsOpen] = useState(false)

    const lead_options = []

    lead_options.push({value: 'All', label: 'All'});
    for (const [i, lead] of leads.entries()) {
        lead_options.push({value: lead.id, label: lead.name});
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    let [lead_id, setLeadID] = useState('')
    const handleLeadFilter = (lead_id) => {
        // props.loader(true);
        Inertia.visit(route('dashboard'), {
            preserveState: true,
            method: 'get',
            only: ['users'],
            data: {
                lead_id: lead_id,
            },
            onSuccess: function (response) {
                users = response.users
            }
        })
    }

    let [review_status, setReviewStatus] = useState('All')
    const handleStatusFilter = (review_status) => {
        // props.loader(true);
        Inertia.visit(route('dashboard'), {
            preserveState: true,
            method: 'get',
            only: ['users'],
            data: {
                review_status: review_status,
            },
            onSuccess: function (response) {
                users = response.users
            }
        })
    }

    const handleInputFilter = (search_value) => {
        if(search_value.length >= 3 || search_value.length == 0){
            Inertia.visit(route('dashboard'), {
                preserveState: true,
                preserveScroll:true,
                method: 'get',
                only: ['users'],
                data: {
                    search: search_value,
                },
                onSuccess: function (response) {
                    users = response.users
                }
            })
        }
    }

    return (
        <>
            <div className='departmentFilters'>
                <div
                    className="Atdepartmentfilters block md:flex justify-between md:justify-center items-center gap-6 mt-7 lg:mt-0">
                    <div className="flex justify-center items-center gap-4 mb-6 md:mb-0">
                        <Select
                            placeholder="Select Lead"
                            // closeMenuOnSelect={false}
                            components={animatedComponents}
                            // defaultValue={[colourOptions[4], colourOptions[5]]}
                            // isMulti
                            options={lead_options}
                            className="at-chartselect"
                            name="lead_id"
                            onChange={async (e) => {
                                await setLeadID(e.value);
                                handleLeadFilter(e.value)
                            }}
                        />
                        <Select
                            placeholder="Select Status"
                            options={status}
                            className="at-chartselect"
                            name="status"
                            onChange={async (e) => {
                                await setReviewStatus(e.value);
                                handleStatusFilter(e.value)
                            }}
                        />
                    </div>
                    <form className="at-searchform min-w-[225px] w-full" onSubmit={(e) => e.preventDefault()}>
                        <fieldset className="">
                            <div className="form-group relative">
                                <input
                                    className="h-[50px] rounded-lg border pr-[40px] border-bordercolor text-black placeholder:text-gray1 focus:border-black focus:ring-0"
                                    type="text"
                                    name="search"
                                    placeholder="Search"
                                    onChange={async (e) => {
                                        handleInputFilter(e.target.value)
                                    }}
                                />
                                <svg
                                    className="absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M9 1.75C4.99594 1.75 1.75 4.99594 1.75 9C1.75 13.0041 4.99594 16.25 9 16.25C13.0041 16.25 16.25 13.0041 16.25 9C16.25 4.99594 13.0041 1.75 9 1.75ZM0.25 9C0.25 4.16751 4.16751 0.25 9 0.25C13.8325 0.25 17.75 4.16751 17.75 9C17.75 11.1462 16.9773 13.112 15.6949 14.6342L20.5303 19.4697C20.8232 19.7626 20.8232 20.2374 20.5303 20.5303C20.2374 20.8232 19.7626 20.8232 19.4697 20.5303L14.6342 15.6949C13.112 16.9773 11.1462 17.75 9 17.75C4.16751 17.75 0.25 13.8325 0.25 9Z"
                                        fill="#C0BCBC"
                                    />
                                </svg>
                            </div>
                        </fieldset>
                    </form>
                </div>
            </div>
            {
                Object.entries(users).map(([key, user]) => (
                    <div key={key} className="wp-businessdevelopment">
                        <div className="wp-themesectionhead mb-5 block lg:flex justify-between items-center">
                            <h2 className="text-3xl font-product_sansbold text-black">
                                {key}
                            </h2>
                        </div>
                        <div className="at-themetablearea w-full">
                            <table className="at-themetable">
                                <thead>
                                <tr>
                                    <th className="font-product_sansregular">Employee</th>
                                    <th className="font-product_sansregular">Status</th>
                                    <th className="font-product_sansregular">Overall Rating</th>
                                    <th className="font-product_sansregular">Lead/Manager</th>
                                    <th className="text-center font-product_sansregular">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {user.map((item, i) => (
                                    <tr key={i}>
                                        <td data-title="Employee">
                                            <div className="at-themeemployeinfo at-bdleftborder"
                                                 style={{borderLeftColor: item.department_color}}>
                                                <figure className="at-empimage"
                                                        style={{backgroundColor: item.department_color}}>
                                                    {item.image != null ? <img src={item.image} alt="Employee Image"/> :
                                                        <span>{item.name.slice(0, 2)}</span>}
                                                </figure>
                                                <div className="at-usernameemail">
                                                    <Link  href={item.show_url}>
                                                        <h3 className="text-black font-product_sansregular font-bold text-base leading-4 mb-2 tracking-wide">
                                                            {item.name}
                                                        </h3>
                                                    </Link>
                                                    <Link href="/employeedetail" className="inline-block text-lightblack text-sm leading-4 font-product-sansregular">
                                                        {item.email}
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td data-title="Status" className="text-left">
                                            <span
                                                className={`at-empstatus flex min-w-[100px] max-w-[100px] rounded-[8px] h-10 items-center justify-center text-base leading-4 text-black font-product-sansregular ${
                                                    item.status == 'Pending'
                                                        ? 'at-bgcolorpending'
                                                        : 'at-bgrated'
                                                }`}
                                            >
                                              {item.status}
                                            </span>
                                        </td>
                                        <td data-title="Overall Rating">
                                            <div className="flex items-center gap-2 at-overallratings">
                                                <div className="flex items-center gap-1">
                                                    <PrettyRating value={item.rating} icons={icons.star} max={5} setColors={['#FECC00']} />
                                                </div>
                                                <em className="not-italic text-sm leading-4 text-black font-bold">
                                                    {item.rating}
                                                </em>
                                            </div>
                                        </td>
                                        <td data-title="Lead/Manager">
                                            <div className="at-themeemployeinfo at-padding-left-zero !border-l-0 !pl-0">
                                                <SelectSearch user={item} LeadManagerData={props.teamleads}/>
                                            </div>
                                        </td>
                                        <td data-title="Action">
                                            <ul className="at-themeactions flex list-none items-center gap-[10px]">
                                                <li className="list-none">
                                                    <Link
                                                        href={item.edit_url}
                                                        className="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] bg-themecolor bg-opacity-10"
                                                    >
                                                        <span className="at-themetoolip">Edit</span>
                                                        <img src='/assets/images/svg/edit.svg' alt="Edit Icon"/>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <button
                                                        type="button"
                                                        className="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] bg-deletecolor bg-opacity-10"
                                                        onClick={openModal}
                                                    >
                                                        <span className="at-themetoolip">Delete</span>
                                                        <img src='/assets/images/svg/delete.svg' alt="Delete Icon"/>
                                                    </button>
                                                </li>
                                            </ul>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }
            <DeleteModal isOpen={isOpen} closeModal={closeModal}/>
        </>
    )
}
