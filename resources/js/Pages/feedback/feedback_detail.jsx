import React, {useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/inertia-react';
import EmployeeDetailLeadSelect from '@/Components/EmployeeDetailLeadSelect';
import PrettyRating from "pretty-rating-react";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {faStar as farStar} from "@fortawesome/free-regular-svg-icons";

const icons = {
    star: {
        complete: faStar,
        half: faStarHalfAlt,
        empty: farStar,
    },
};

export default function SelfEvaluation(props) {
    console.log({props})
    const [self_feedback, setSelfFeedback] = useState(props.self_feedback)
    const [manager_feedback, setManagerFeedback] = useState(props.manager_feedback)
    const [user_detail, setUserDetail] = useState(props.user_detail);
    let back = function () {
        window.history.back();
    }
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Detail</h2>}
        >
            <Head title="Evalution Detail"/>
            <div className="at-btnbackarea flex gap-4 justify-between">
                <div className="w-full flex mb-[40px]">
                    <Link className="flex items-center justify-center text-black text-sm font-productsans-bold gap-5"
                          href="#" onClick={back}>
                        <em className="flex justify-center items-center w-[44px] h-[44px] bg-white rounded-xl">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.995 4.99997H3.40501L6.70501 1.71268C6.89332 1.52453 6.9991 1.26935 6.9991 1.00326C6.9991 0.737183 6.89332 0.481998 6.70501 0.29385C6.51671 0.105701 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105701 5.28501 0.29385L0.285014 5.28973C0.193973 5.38476 0.122608 5.49681 0.0750135 5.61946C-0.0250045 5.86272 -0.0250045 6.13557 0.0750135 6.37883C0.122608 6.50149 0.193973 6.61354 0.285014 6.70856L5.28501 11.7044C5.37798 11.7981 5.48858 11.8724 5.61044 11.9232C5.7323 11.9739 5.863 12 5.99501 12C6.12703 12 6.25773 11.9739 6.37959 11.9232C6.50145 11.8724 6.61205 11.7981 6.70501 11.7044C6.79874 11.6116 6.87314 11.501 6.9239 11.3793C6.97467 11.2575 7.00081 11.1269 7.00081 10.995C7.00081 10.8631 6.97467 10.7325 6.9239 10.6108C6.87314 10.489 6.79874 10.3785 6.70501 10.2856L3.40501 6.99832H10.995C11.2602 6.99832 11.5146 6.89305 11.7021 6.70567C11.8897 6.51829 11.995 6.26415 11.995 5.99915C11.995 5.73415 11.8897 5.48001 11.7021 5.29262C11.5146 5.10524 11.2602 4.99997 10.995 4.99997Z"
                                    fill="#3A3A3A"/>
                            </svg>
                        </em>
                        <span>Back</span>
                    </Link>
                </div>
            </div>
            <div className="at-selfavaluation flex gap-4 justify-between">
                <div className="at-selfevaluationatea">
                    {
                        self_feedback.length > 0 ?   <div className="at-evaluations">
                                    <div className="at-pagehead mb-6">
                                        <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Self Review</h3>
                                        <span className="block text-lightblack text-base font-product_sansregular">Was there any deviation on the assigned tasks</span>
                                    </div>
                                    <ul className="grid grid-cols-2 w-full list-none gap-5">
                                        {
                                            self_feedback.map((self_feed, i) => (
                                                <li className="w-full list-none" key={i + 1}>
                                                    <div className="at-themebox min-h-[240px]">
                                                        <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">{self_feed.question}</h4>
                                                        <div className="w-full pl-[65px] relative">
                                                <span
                                                    className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">{i + 1}</span>
                                                            <p className="text-black text-lg font-product_sansregular font-[500] leading-6">{self_feed.type == "Qualitative" ? self_feed.answer : self_feed.rating}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }

                                    </ul>
                                </div> :
                            <div className="at-evaluations">
                                <div className="at-pagehead mb-6">
                                    <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Self Review</h3>
                                    <span className="block text-lightblack text-base font-product_sansregular">No Self Review found</span>
                                </div>
                            </div>
                    }
                    {
                        manager_feedback.length > 0 ?
                            <div>
                            <div className="at-evaluations mt-12">
                                <div className="at-pagehead mb-6">
                                    <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Manager Review</h3>
                                </div>
                                <ul className="grid grid-cols-2 w-full list-none gap-5">
                                    {
                                        manager_feedback.map((manager_feed, i) => (
                                            manager_feed.type == "Quantitative" ?
                                                <li className="w-full list-none">
                                                    <div className="at-themebox min-h-[240px]">
                                                        <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-7 pb-6 border-b-[1px] border-themebgcolor break-words">
                                                            {manager_feed.question}
                                                        </h4>
                                                        <div className="flex items-center justify-center gap-4">
                                                            <PrettyRating value={manager_feed.rating} icons={icons.star} max={5}
                                                                          setColors={['#FECC00']}/>
                                                        </div>
                                                        <span
                                                            className="block text-black text-5xl leading-10 mt-5 font-bold font-product_sansregular text-center">{manager_feed.rating}</span>
                                                    </div>
                                                </li> : ''
                                        ))
                                    }

                                </ul>
                            </div>
                            <div className="at-evaluations mt-12">
                                <div className="at-pagehead mb-6">
                                    <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Recommendation</h3>
                                    <span className="block text-lightblack text-base font-product_sansregular">Recommend performance improvement plan</span>
                                </div>
                                <ul className="grid grid-cols-2 w-full list-none gap-5">
                                    {
                                        manager_feedback.map((recommended, i) => (
                                            recommended.type != "Quantitative" ?
                                                <li className="w-full list-none">
                                                    <div className="at-themebox min-h-[240px]">
                                                        <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">{recommended.question}</h4>
                                                        <div className="w-full pl-[65px] relative">
                                        <span
                                            className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">1</span>
                                                            <p className="text-black text-lg font-product_sansregular leading-6">{recommended.answer}</p>
                                                        </div>
                                                    </div>
                                                </li> : ''
                                        ))
                                    }
                                </ul>
                            </div>
                            </div> :
                            <div className="at-evaluations mt-12">
                                <div className="at-pagehead mb-6">
                                    <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Manager Review</h3>
                                    <span className="block text-lightblack text-base font-product_sansregular">No Manager Feedback Exists</span>
                                </div>
                            </div>
                    }

                </div>
                <div className="at-themebox at-employshortinfo">
                    <figure className="w-[128px] h-[128px] rounded-full overflow-hidden mx-auto mb-[20px] relative">
                        {user_detail.image != null ?
                            <img className="top-0 left-0 w-full h-full rounded-full absolute bg-cover"
                                 src={user_detail.image} alt="Employee Image"/>
                            :
                            <img className="top-0 left-0 w-full h-full rounded-full absolute bg-cover"
                            src="/assets/images/employeeplaceholder.jpg" alt="Employee Image"/>
                        }
                    </figure>
                    <div className="flex flex-col items-center justify-center mb-7">
                        <h4 className="font-bold text-2xl leading-6 mb-3">{user_detail.name}</h4>
                        <a href="javascript:void(0);"
                           className="block text-lightblack text-base font-product-sansregular">{user_detail.email}</a>
                    </div>
                    <ul className="grid grid-cols-2 w-full gap-2">
                        <li>
                            <div
                                className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgemployeeid">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Employee ID</span>
                                <h4 className="font-bold text-black text-base mb-0">{user_detail.emp_id}</h4>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgoverallrating">
                                <span
                                    className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Rating</span>
                                <div className="flex items-center gap-1">
                                    <em className="not-italic text-sm leading-4 text-black font-bold">{props.yearly_avg_rating}</em>
                                    <div className="flex items-center gap-1">
                                        <PrettyRating value={props.yearly_avg_rating} icons={icons.star} max={5}
                                                      setColors={['#FECC00']}/>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgleadmanager">
                                <span
                                    className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Lead/Manager</span>
                                <EmployeeDetailLeadSelect lead={props.user_manager} leads_list={props.team_leads}
                                                          depart_color={props.department.color}/>
                            </div>
                        </li>
                        <li>
                            <div
                                className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgdepartment">
                                <span
                                    className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Department</span>
                                <h4 className="font-bold font-product_sansregular text-black text-base mb-0">{props.department.name}</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
