import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import EmployeeDetailLeadSelect from '@/Components/EmployeeDetailLeadSelect';

export default function SelfEvaluation(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Employee Detail</h2>}
        >
            <Head title="Evalution Detail" />

            <div className="at-btnbackarea flex gap-4 justify-between">
                <div className="w-full flex mb-[40px]">
                    <Link className="flex items-center justify-center text-black text-sm font-productsans-bold gap-5" href="/employeedetail">
                        <em className="flex justify-center items-center w-[44px] h-[44px] bg-white rounded-xl">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.995 4.99997H3.40501L6.70501 1.71268C6.89332 1.52453 6.9991 1.26935 6.9991 1.00326C6.9991 0.737183 6.89332 0.481998 6.70501 0.29385C6.51671 0.105701 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105701 5.28501 0.29385L0.285014 5.28973C0.193973 5.38476 0.122608 5.49681 0.0750135 5.61946C-0.0250045 5.86272 -0.0250045 6.13557 0.0750135 6.37883C0.122608 6.50149 0.193973 6.61354 0.285014 6.70856L5.28501 11.7044C5.37798 11.7981 5.48858 11.8724 5.61044 11.9232C5.7323 11.9739 5.863 12 5.99501 12C6.12703 12 6.25773 11.9739 6.37959 11.9232C6.50145 11.8724 6.61205 11.7981 6.70501 11.7044C6.79874 11.6116 6.87314 11.501 6.9239 11.3793C6.97467 11.2575 7.00081 11.1269 7.00081 10.995C7.00081 10.8631 6.97467 10.7325 6.9239 10.6108C6.87314 10.489 6.79874 10.3785 6.70501 10.2856L3.40501 6.99832H10.995C11.2602 6.99832 11.5146 6.89305 11.7021 6.70567C11.8897 6.51829 11.995 6.26415 11.995 5.99915C11.995 5.73415 11.8897 5.48001 11.7021 5.29262C11.5146 5.10524 11.2602 4.99997 10.995 4.99997Z" fill="#3A3A3A" />
                            </svg>
                        </em>
                        <span>Back</span>
                    </Link>
                </div>
            </div>
            <div className="at-selfavaluation flex gap-4 justify-between">
                <div className="at-selfevaluationatea">
                    <div className="at-evaluations">
                        <div className="at-pagehead mb-6">
                            <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Self Review</h3>
                            <span className="block text-lightblack text-base font-product_sansregular">Was there any deviation on the assigned tasks</span>
                        </div>
                        <ul className="grid grid-cols-2 w-full list-none gap-5">
                            <li className="w-full list-none">
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">Challenges I've faced at work</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">1</span>
                                        <p className="text-black text-lg font-product_sansregular font-[500] leading-6">Fifth, fowl also from. Kind dry seasons Cattle sixth spirit you'll you're isn't third seas, don't light.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">How can your manager / team help you in the next month?</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">2</span>
                                        <p className="text-black text-lg font-product_sansregular font-[500] leading-6">For and that evening after won't. Fish divided divide divide fish all light gathered dry man lights herb a two shall Two under. Firmament creature multiply living fifth had. Have. Thing.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">Any other comments</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">3</span>
                                        <p className="text-black text-lg font-product_sansregular leading-6">His life tree appear dominion, bearing subdue good herb very creeping which them they're, isn't him divided said open he saw made dry their us, dominion us.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">Key accomplishments in the last month</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">4</span>
                                        <p className="text-black text-lg font-product-sansregular leading-6">Had every, gathering wherein brought is over is. Light under beast man thing saying moved firmament waters forth dry over. Place two there living dry.</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="at-evaluations mt-12">
                        <div className="at-pagehead mb-6">
                            <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Manager Review</h3>
                        </div>
                        <ul className="grid grid-cols-2 w-full list-none gap-5">
                            <li className="w-full list-none">
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-7 pb-6 border-b-[1px] border-themebgcolor break-words">He/She has consistently delivered high-quality results on time</h4>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                    </div>
                                    <span className="block text-black text-5xl leading-10 mt-5 font-bold font-product_sansregular text-center">4.0</span>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-7 pb-6 border-b-[1px] border-themebgcolor break-words">He/She exhibited high levels of commitment</h4>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                    </div>
                                    <span className="block text-black text-5xl leading-10 mt-5 font-bold font-product_sansregular text-center">4.0</span>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-7 pb-6 border-b-[1px] border-themebgcolor break-words">He/She has enjoyed collaborating with and supporting the team whenever needed</h4>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                    </div>
                                    <span className="block text-black text-5xl leading-10 mt-5 font-bold font-product_sansregular text-center">4.0</span>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-7 pb-6 border-b-[1px] border-themebgcolor break-words">I am confident of him/her delivering a high level of performance next month</h4>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                    </div>
                                    <span className="block text-black text-5xl leading-10 mt-5 font-bold font-product_sansregular text-center">4.0</span>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-7 pb-6 border-b-[1px] border-themebgcolor break-words">He/She is updating the board on monday.com regularly.</h4>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                    </div>
                                    <span className="block text-black text-5xl leading-10 mt-5 font-bold font-product_sansregular text-center">4.0</span>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-7 pb-6 border-b-[1px] border-themebgcolor break-words">Worked and presented demos as per client expectations</h4>
                                    <div className="flex items-center justify-center gap-4">
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span className="w-[42px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                    </div>
                                    <span className="block text-black text-5xl leading-10 mt-5 font-bold font-product_sansregular text-center">4.0</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="at-evaluations mt-12">
                        <div className="at-pagehead mb-6">
                            <h3 className="text-black text-[1.75rem] leading-7 font-product_sans_mediumregular">Recommendation</h3>
                            <span className="block text-lightblack text-base font-product_sansregular">Recommend performance improvement plan</span>
                        </div>
                        <ul className="grid grid-cols-2 w-full list-none gap-5">
                            <li className="w-full list-none">
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">Key accomplishments of the team member in the last month.</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">1</span>
                                        <p className="text-black text-lg font-product_sansregular leading-6">Fifth, fowl also from. Kind dry seasons Cattle sixth spirit you'll you're isn't third seas, don't light.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">Issues observed at work if any</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">2</span>
                                        <p className="text-black text-lg font-product_sansregular leading-6">For and that evening after won't. Fish divided divide divide fish all light gathered dry man lights herb a two shall Two under. Firmament creature multiply living fifth had. Have. Thing.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">What can he/she work on to perform well in the next month.</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">3</span>
                                        <p className="text-black text-lg font-product_sansregular leading-6">Fifth, fowl also from. Kind dry seasons Cattle sixth spirit you'll you're isn't third seas, don't light.</p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="at-themebox min-h-[240px]">
                                    <h4 className="text-lightblack text-base font-bold font-product_sansregular tracking-wider mb-6">Any other comments?</h4>
                                    <div className="w-full pl-[65px] relative">
                                        <span className="top-0 left-0 absolute text-white rounded-full bg-themecolor w-[40px] h-[40px] flex items-center justify-center">4</span>
                                        <p className="text-black text-lg font-product_sansregular leading-6">For and that evening after won't. Fish divided divide divide fish all light gathered dry man lights herb a two shall Two under. Firmament creature multiply living fifth had. Have. Thing.</p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="at-themebox at-employshortinfo">
                    <figure className="w-[128px] h-[128px] rounded-full overflow-hidden mx-auto mb-[20px] relative">
                        <img className="top-0 left-0 w-full h-full rounded-full absolute bg-cover" src="/assets/images/employeeplaceholder.jpg" alt="Employee Image" />
                    </figure>
                    <div className="flex flex-col items-center justify-center mb-7">
                        <h4 className="font-bold text-2xl leading-6 mb-3">Zain Mughal</h4>
                        <a href="javascript:void(0);" className="block text-lightblack text-base font-product-sansregular">zainanwar@renesistech.com</a>
                    </div>
                    <ul className="grid grid-cols-2 w-full gap-2">
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgemployeeid">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Employee ID</span>
                                <h4 className="font-bold text-black text-base mb-0">100060</h4>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgoverallrating">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Employee ID</span>
                                <div className="flex items-center gap-1">
                                    <em className="not-italic text-sm leading-4 text-black font-bold">4.0</em>
                                    <div className="flex items-center gap-1">
                                        <span><img src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span><img src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span><img src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span><img src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                        <span><img src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgleadmanager">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Lead/Manager</span>
                                {/*<EmployeeDetailLeadSelect />*/}
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center flex-col justify-center min-h-[84px] rounded-lg at-bgdepartment">
                                <span className="block text-lightblack text-sm font-product-sansregular mb-[5px]">Department</span>
                                <h4 className="font-bold text-black text-base mb-0">UI/UX Design</h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
