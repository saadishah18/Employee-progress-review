import React, {useState} from "react";

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import Select from 'react-select';
import EmployeeDetailLeadSelect from '@/Components/EmployeeDetailLeadSelect';
import { CurrentMonthData } from "../../../Data/CurrentMonthData";
import { PreviousMonthData } from "../../../Data/PrviousMonthData";
import PrettyRating from "pretty-rating-react";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons";
import EmployeeYearlyChart from "@/Components/EmployeeYearlyChart";

const options = [
    { value: 'Select Year', label: 'Select Year' },
    { value: '2022', label: '2022' },
    { value: '2021', label: '2021' },
    { value: '2020', label: '2020' },
    { value: '2000', label: '2000' },
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

export default function EmployeeDetail(props) {
    // console.log({props})
    const user_detail = props.user_detail;
    // console.log({user_detail});
    // debugger
    const [yearly_rating, setYearlyRating] = useState(props.yearly_feedback)
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Detail</h2>}
        >
            <Head title="Employee Detail" />
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
            <div className="at-evaluationoverview flex gap-4 justify-between">
                <div className="at-themebox at-employeoverviewchart">
                    <div className="at-themeboxtitle flex justify-between items-center pb-7">
                        <h4 className="text-[1.75rem] text-black font-product_sans_mediumregular">Evaluation Overview</h4>
                        <div className="flex justify-center items-center gap-4">
                            <Select options={options} className="at-chartselect" />
                        </div>
                    </div>
                    <figure className="m-0 w-full">
                        {/*<img className="w-full" src="/assets/images/chartplaceholder2.jpg" alt="Chart Placeholder" />*/}
                        <EmployeeYearlyChart yearly_feedback={yearly_rating} color={props.department.color} />
                    </figure>
                </div>
                <div className="at-themebox at-employshortinfo">
                    <figure className="w-[128px] h-[128px] rounded-full overflow-hidden mx-auto mb-[20px] relative">
                        <img className="top-0 left-0 w-full h-full rounded-full absolute bg-cover" src="/assets/images/employeeplaceholder.jpg" alt="Employee Image" />
                    </figure>
                    <div className="flex flex-col items-center justify-center mb-7">
                        <h4 className="font-bold text-2xl leading-6 mb-3">{user_detail.name}</h4>
                        <a href="javascript:void(0);" className="block text-lightblack text-base font-product-sansregular">{user_detail.email}</a>
                    </div>
                    <ul className="grid grid-cols-2 w-full gap-2">
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgemployeeid">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Employee ID ssad</span>
                                <h4 className="font-bold text-black text-base mb-0">{user_detail.emp_id}</h4>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgoverallrating">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Rating (Yearly AVG) </span>
                                <div className="flex items-center gap-1">
                                    <em className="not-italic text-sm leading-4 text-black font-bold">{props.yearly_avg_rating}</em>
                                    <div className="flex items-center gap-1">
                                        <div className="flex items-center gap-2 at-overallratings">
                                            <div className="flex items-center gap-1">
                                                <PrettyRating value={props.yearly_avg_rating} icons={icons.star} max={5} setColors={['#FECC00']} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgleadmanager">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Lead/Manager</span>
                                <EmployeeDetailLeadSelect lead={props.user_manager} leads_list={props.team_leads} depart_color={props.department.color} />
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgdepartment">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Department</span>
                                <h4 className="font-bold font-product_sansregular text-black text-base mb-0">{props.department.name}</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="wp-businessdevelopment">
                <div className="wp-themesectionhead mb-5 flex justify-between items-center">
                    <h2 className="text-3xl font-product_sansbold text-black">Current Month Ratings</h2>
                </div>
                <div className="at-themetablearea w-full">
                    <table className="at-themetable">
                        <thead>
                        <tr>
                            <th className="font-product_sansregular">Employee</th>
                            <th className="font-product_sansregular">Due Date</th>
                            <th className="font-product_sansregular">Rating</th>
                            <th className="text-center font-product_sansregular">Status</th>
                        </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>
                                    <div className="at-themeemployeinfo at-bdleftborder">
                                        <figure className="at-empimage"
                                                style={{backgroundColor: props.current_month_rating.department_color}}>
                                            {props.current_month_rating.image != null ? <img src={props.current_month_rating.image} alt="Employee Image"/> :
                                                <span>{props.current_month_rating.name.slice(0, 2)}</span>}
                                        </figure>
                                        <div className="at-usernameemail">
                                            <Link href={route('user-evaluation-detail',{})}>
                                                <h3 className="text-black font-product_sansregular font-bold text-base leading-4 mb-2 tracking-wide">{props.current_month_rating.name}</h3>
                                            </Link>
                                            <a className="inline-block text-lightblack text-sm leading-4 font-product-sansregular" href="/SelfEvaluation">
                                                {props.current_month_rating.email}
                                            </a>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-left">
                                        <span className="font-product-sansregular">
                                            {props.current_month_rating.due_days}
                                        </span>
                                </td>
                                <td>
                                    <div className="flex items-center gap-2">
                                        <PrettyRating value={props.current_month_rating.rating} icons={icons.star} max={5} setColors={['#FECC00']} />

                                        <em className="not-italic text-sm leading-4 text-black font-bold">{props.current_month_rating.rating}</em>
                                    </div>
                                </td>
                                <td>
                                        <span className={`at-empstatus flex min-w-[100px] max-w-[175px] rounded-[8px] h-10 items-center justify-center text-base leading-4 text-black font-product-sansregular ${props.current_month_rating.status == 'Submit Self Review' ? 'at-colorbgsubmitreview' : 'at-bgrated'}`}>
                                            {props.current_month_rating.status}
                                        </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="wp-businessdevelopment">
                <div className="wp-themesectionhead mb-5 flex justify-between items-center">
                    <h2 className="text-3xl font-product_sansbold text-black">Previous Ratings</h2>
                </div>
                <div className="at-themetablearea w-full">
                    <table className="at-themetable">
                        <thead>
                        <tr>
                            <th className="font-product_sansregular">Reviewed By</th>
                            <th className="font-product_sansregular">Date</th>
                            <th className="font-product_sansregular">Rating</th>
                            <th className="font-product_sansregular">Feedback</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.previous_months_rating_yearly.map((item) => (

                                item.feedback_id != null ?
                                    <tr>
                                        <td>
                                            <div className="at-themeemployeinfo at-bdleftborder">
                                                {/*<figure className="at-empimage">*/}
                                                {/*    <img src={item.revempimage} alt="Employee Image" />*/}
                                                {/*</figure>*/}
                                                <div className="at-usernameemail">
                                                    <Link href="/">
                                                        <h3 className="text-black font-product_sansregular font-bold text-base leading-4 mb-2 tracking-wide">{item.manager_name}</h3>
                                                    </Link>
                                                    <a className="inline-block text-lightblack text-sm leading-4 font-product-sansregular" href="#">
                                                        {item.manager_email}
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-left">
                                        <span className="font-product-sansregular">
                                            {item.date}
                                        </span>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <PrettyRating value={item.rating} icons={icons.star} max={5} setColors={['#FECC00']} />
                                                <em className="not-italic text-sm leading-4 text-black font-bold">{item.rating}</em>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="at-feedbackbtn flex items-center gap-4">
                                                <p className="mb-0 max-w-xs truncate text-[rgba(58,58,58,0.60)] text-base">{item.comment}</p>
                                                <Link href={route('user-evaluation-detail',{
                                                    feedback_to: item.feedback_to,
                                                    month:item.month,
                                                    year:'2022',
                                                })} className="text-themecolor font-bold text-base">View All</Link>
                                            </div>
                                        </td>
                                    </tr>
                                    :
                                    <tr>
                                        <td colSpan={4}>{item.month} 's record Not found</td>
                                    </tr>

                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
