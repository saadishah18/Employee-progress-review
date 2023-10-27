import React, {useEffect, useRef, useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, Link, usePage} from '@inertiajs/inertia-react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import BusinessDevelopment from '@/Components/BusinessDevelopment'
import TeamsRatingChart from '@/Components/TeamsRatingChart'
import EmployeeWorkingChart from '@/Components/EmployeeWorkingChart'
import FullPageLoader from "@/Components/FullPageLoader";
import {Inertia} from "@inertiajs/inertia";

// import { colourOptions } from '../data';

const options = [
    {value: 'All', label: 'All'},
    {value: '2022', label: '2022'},
    {value: '2021', label: '2021'},
    {value: '2020', label: '2020'},
    {value: '2000', label: '2000'},
]
const options1 = [
    {value: 'All', label: 'All'},
    {value: '01', label: 'January'},
    {value: '02', label: 'February'},
    {value: '03', label: 'March'},
    {value: '04', label: 'April'},
    {value: '05', label: 'May'},
    {value: '06', label: 'June'},
    {value: '06', label: 'July'},
    {value: '08', label: 'August'},
    {value: '09', label: 'Sepetember'},
    {value: '10', label: 'October'},
    {value: '11', label: 'November'},
    {value: '12', label: 'December'},
]
const animatedComponents = makeAnimated()

export default function Dashboard(props) {
    const [loading, setLoading] = useState(false);

    const [team_ratings, setTeamRating] = useState([]);

    const [emp_count, setEmpCount] = useState(props.employee_count);

    const users = props.users;

    const [team_leads, setTeamLeads] = useState(props.teamleads);

    const [alert_message, setAlert] = useState(false);

    const properties = usePage();


    // to set loader and department rating chart data
    useEffect(() => {
        setLoading(true);
        setTeamRating(props.department_ratings);
        setLoading(false)
    }, [props.department_ratings]);


    const [month, setMonth] = useState('All');
    const [year, setYear] = useState('All')


    const handleChartFilter = (month ='All', year='All') => {
        setLoading(true);
        Inertia.visit(route('dashboard'), {
            preserveState: true,
            method: 'get',
            only: ['department_ratings'],
            data: {
                month: month,
                year: year
            },
            onSuccess:function () {
                setLoading(false);
            }
        })
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard"/>
            {
                loading &&
                <FullPageLoader/>
            }
            <div className="at-teamsratingworking block lg:flex gap-4 justify-between">
                <div className="at-themebox at-teamsrankingchart">
                    <div className="at-themeboxtitle block sm:flex justify-between items-center pb-7 ">
                        <h4 className=" text-black font-product_sans_mediumregular">
                            Teams Rating
                        </h4>
                        <div className="block sm:flex justify-center items-center gap-4 sm:mt-0 mt-5">
                            <Select
                                placeholder="Select year"
                                options={options}
                                className="at-chartselect sm:mb-0 mb-5"
                                onChange={async (e) => {
                                    await setYear(e.value);
                                    handleChartFilter(month, e.value)
                                }}
                                name="year_filter"
                            />
                            <Select
                                className="at-chartselect at-selectdepartment at-addemployeselect w-full"
                                classNamePrefix="select"
                                name="month_filter"
                                options={options1}
                                placeholder="Select Month"
                                onChange={async (e) => {
                                    await setMonth(e.value);
                                    handleChartFilter(e.value, year)
                                }}
                            />
                        </div>
                    </div>
                    <div className="at-teamsratingchart w-full float-left">
                        <TeamsRatingChart ratings={team_ratings}/>
                    </div>
                    {/* <figure className="m-0 w-full">
            <img className="w-full" src="/assets/images/chartplaceholder.jpg" alt="Chart Placeholder" />
          </figure> */}
                </div>
                <div className="at-themebox at-employeeworkchart">
                    <div className="at-themeboxtitle flex justify-between items-center pb-7">
                        <h4 className="text-black font-product_sans_mediumregular">
                            Employee Working
                        </h4>
                    </div>
                    <div className="at-employeechartarea w-full float-left">
                        <EmployeeWorkingChart count={emp_count}/>
                    </div>
                    {/* <figure className="m-0 w-full relative">
            <img
              className="w-full"
              src="/assets/images/roundchat-placeholder.jpg"
              alt="Chart Placeholder"
            />
            <figcaption className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex justify-center items-center flex-col">
              <h5 className="text-black font-bold text-4xl">120</h5>
              <span className="text-gray1 text-base">Total Employee</span>
            </figcaption>
          </figure> */}
                    <Link
                        href={route('users.create')}
                        className="w-full float-left flex items-center justify-between mt-16 font-medium font-sans text-black text-lg"
                    >
                        <span>Add New Employee</span>
                        <svg
                            width="19"
                            height="14"
                            viewBox="0 0 19 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M11.3997 0.46967C11.6926 0.176777 12.1675 0.176777 12.4604 0.46967L18.5304 6.53967C18.671 6.68032 18.7501 6.87109 18.7501 7.07C18.7501 7.26891 18.671 7.45968 18.5304 7.60033L12.4604 13.6703C12.1675 13.9632 11.6926 13.9632 11.3997 13.6703C11.1068 13.3774 11.1068 12.9026 11.3997 12.6097L16.1893 7.82007H1C0.585786 7.82007 0.25 7.48428 0.25 7.07007C0.25 6.65585 0.585786 6.32007 1 6.32007H16.1895L11.3997 1.53033C11.1068 1.23744 11.1068 0.762563 11.3997 0.46967Z"
                                fill="#292D32"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
            <BusinessDevelopment users={users} loader={loading} teamleads={team_leads}/>

        </AuthenticatedLayout>
    )
}
