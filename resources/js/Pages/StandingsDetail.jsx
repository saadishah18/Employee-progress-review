import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';

export default function StandingsDetail(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Standing Detail</h2>}
        >
            <Head title="Standings Detail" />

            <div className="at-btnbackarea flex gap-4 justify-between">
                <div className="w-full flex mb-[40px]">
                    <Link className="flex items-center justify-center text-black text-sm font-productsans-bold gap-5" href="/standings">
                        <em className="flex justify-center items-center w-[44px] h-[44px] bg-white rounded-xl">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.995 4.99997H3.40501L6.70501 1.71268C6.89332 1.52453 6.9991 1.26935 6.9991 1.00326C6.9991 0.737183 6.89332 0.481998 6.70501 0.29385C6.51671 0.105701 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105701 5.28501 0.29385L0.285014 5.28973C0.193973 5.38476 0.122608 5.49681 0.0750135 5.61946C-0.0250045 5.86272 -0.0250045 6.13557 0.0750135 6.37883C0.122608 6.50149 0.193973 6.61354 0.285014 6.70856L5.28501 11.7044C5.37798 11.7981 5.48858 11.8724 5.61044 11.9232C5.7323 11.9739 5.863 12 5.99501 12C6.12703 12 6.25773 11.9739 6.37959 11.9232C6.50145 11.8724 6.61205 11.7981 6.70501 11.7044C6.79874 11.6116 6.87314 11.501 6.9239 11.3793C6.97467 11.2575 7.00081 11.1269 7.00081 10.995C7.00081 10.8631 6.97467 10.7325 6.9239 10.6108C6.87314 10.489 6.79874 10.3785 6.70501 10.2856L3.40501 6.99832H10.995C11.2602 6.99832 11.5146 6.89305 11.7021 6.70567C11.8897 6.51829 11.995 6.26415 11.995 5.99915C11.995 5.73415 11.8897 5.48001 11.7021 5.29262C11.5146 5.10524 11.2602 4.99997 10.995 4.99997Z" fill="#3A3A3A" />
                            </svg>
                        </em>
                        <span>Back</span>
                    </Link>
                </div>
            </div>
            <div className="at-standingspage">
                <div className="min-h-[640px] bg-white p-10">
                    <div className="max-w-[42.813rem] min-h-[250px] rounded-[20px] py-10 px-7 mx-auto bg-themebgcolor">
                        <div className="flex justify-center items-center flex-col">
                            <img src="/assets/images/svg/like.svg" alt="Like Icon" />
                            <h3 className="text-3xl text-black font-bold font-product-sansregular mt-3 mb-3">Muhmmad Asad</h3>
                            <span className="text-3xl text-black font-bold font-product-sansregular block mb-3">4.1/5</span>
                            <time dateTime="2022-12-12" className="text-black text-2xl font-product-sansregular">August, 2022</time>
                        </div>
                        <ul className="w-full list-none m-0 mt-8 p-0">
                            <li className="w-full">
                                <p className="text-xl text-black mb-2 font-medium">He/She exhibited hight levels of commitment</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                </div>
                            </li>
                            <li className="w-full mt-5">
                                <p className="text-xl text-black mb-2 font-medium">Worked and present all the demos in a timely mananger (weekly/bi-weekly)</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                </div>
                            </li>
                            <li className="w-full mt-5">
                                <p className="text-xl text-black mb-2 font-medium">He/she is updating the board on monday.com regularly.</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                </div>
                            </li>
                            <li className="w-full mt-5">
                                <p className="text-xl text-black mb-2 font-medium">Overall adherence and response time.</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-fill.svg" alt="Start Icon" /></span>
                                    <span className="w-[20px]"><img className="w-full" src="/assets/images/svg/star-gray.svg" alt="Start Icon" /></span>
                                </div>
                            </li>
                        </ul>
                        <div className="w-full max-w-[490px] bg-white rounded-[10px] py-4 px-[16px] mt-10">
                            <h5 className="text-black font-bold text-lg font-product-sansregular">Issues observed at work if any</h5>
                            <p className="break-words text-[#777] text-base font-normal font-product-sansregular">Not particularly, I know right now we have shortage of resources so can’t evaluate on all projects.</p>
                        </div>
                        <Link>
                            <a className="inline-flex items-center mt-7 font-bold font-product-sansregular text-black gap-2" href="javascript:void(0);">
                                <img src="/assets/images/svg/sharefeedback.svg" alt="Feedback Icon"/>
                                <span>Share your feedback</span>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}