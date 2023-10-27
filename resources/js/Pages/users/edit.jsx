import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import UploadFile from '@/Components/UploadFile';
import SuccessModal from '@/Components/SuccessModal';
import InputError from "@/Components/InputError"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const options = [
    { value: 'UI UX', label: 'UI UX' },
    { value: 'Front End', label: 'Front End' },
    { value: 'Laravel', label: 'Laravel' },
    { value: 'JS', label: 'JS' },
    { value: 'iOS', label: 'iOS' },
    { value: 'Android', label: 'Android' },
    { value: 'PMO', label: 'PMO' },
]
const options1 = [
    { value: 'Bilal Khalid', label: 'Bilal Khalid' },
    { value: 'Wajeeh Hussain', label: 'Wajeeh Hussain' },
    { value: 'Irtaza Manzoor', label: 'Irtaza Manzoor' },
    { value: 'Syed Ali Zaib', label: 'Syed Ali Zaib' },
    { value: 'Zubair Riaz', label: 'Zubair Riaz' },
    { value: 'Yasir Iqbal', label: 'Yasir Iqbal' },
]




export default function EditEmployee(props) {
    let [isOpen, setIsOpen] = useState(false)
    const [lead_options, setLead] = useState([]);
    const [department_options, setDepartment] = useState([]);
    const [roles_options, setRoles] = useState([]);
    const user_detail = props.user_detail;
    const leads = props.team_leads;
    const departments = props.departments;
    const roles = props.roles;


    const [joining_date, setJoiningDate] = useState(new Date(user_detail.joining_date));
    const [dob, setDob] = useState(new Date(user_detail.dob));

    const [selected_role,setRole] = useState(roles.find((item) => item.id === props.user_role.id));

    const [selected_department,setSelectedDepartment] = useState(departments.find((item) => item.value === user_detail.department_id));

    const [selected_lead,setSelectedLead] = useState(leads.find((item) => item.id === user_detail.manager_id));

    const { data,put, setData,setDefaults, post, processing, errors, reset, setError } = useForm({
        name: user_detail.name || '', email: user_detail.email || '', dob: dob || '', joining_date: joining_date ||'',emp_id: user_detail.emp_id || '',
        designation: user_detail.designation || '',
        manager_id:user_detail.manager_id || '', department_id: user_detail.department_id || '' ,role_id: props.user_role.id || ''
    })


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        put(route("users.update",user_detail.id));
    }

    useEffect( () => {
        setSelectOptions();
    },[department_options]);


    const setSelectOptions = () => {
        for (const [i, lead] of leads.entries()) {
            lead_options.push({value:lead.id, label:lead.name});
        }
        for (const role of roles) {
            roles_options.push({value:role.name, label:role.name});
        }
        setLead(lead_options);
        setRoles(roles_options);
        setDepartment(department_options);
    }

    const onHandleChange = (event) => {
        if(event.target){
            setData(event.target.name, event.target.value);
        }else{
            setData('manager_id', event.value);
        }
    };

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Employee</h2>}
        >
            <Head title="Add Employee" />

            <div className="at-addemployeesarea max-w-[76.5rem] mx-auto pt-0 lg:pt-[7rem] xl:pt-[10rem] 2xl:pt-[13.125rem]">
                <div className="at-pagehead mb-6 block sm:flex items-center justify-between">
                    <h3 className="text-black text-3xl leading-7 font-product_sans_mediumregular">Edit empoylee</h3>
                    <div className="float-right sm:w-auto w-full sm:mt-0 mt-5">
                        <button type="button" onClick={openModal} className="flex items-center justify-center min-h-[60px]
                        min-w-full sm:min-w-[155px] max-w-[155px] border border-gray1 text-gray1 rounded-[10px] bg-white
                        font-product_sansbold text-lg cursor-pointer
                        hover:bg-themecolor hover:text-white hover:border-themecolor">Upload</button>
                    </div>
                </div>
                <form className="at-formaddemployee w-full float-left" onSubmit={handleSubmit}>
                    <fieldset className="w-full float-left">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="name"
                                    className={`block w-full ${
                                        errors.name ? 'has-error' : ''
                                    }`}
                                    placeholder="Full Name"
                                    handleChange={onHandleChange}
                                    value={data.name}
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="">
                                <TextInput
                                    type="email"
                                    name="email"
                                    className={`block w-full ${
                                        errors.email ? 'has-error' : ''
                                    }`}
                                    placeholder="Email Addres"
                                    handleChange={(e) => setData("email", e.target.value)}
                                    value={data.email}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="designation"
                                    className="block w-full"
                                    placeholder="Designation"
                                    handleChange={onHandleChange}
                                    value={data.designation}
                                />
                                <InputError message={errors.designation} className="mt-2" />
                            </div>
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="emp_id"
                                    className="block w-full"
                                    placeholder="Employee ID"
                                    handleChange={onHandleChange}
                                    value={data.emp_id}
                                />
                                <InputError message={errors.emp_id} className="mt-2" />
                            </div>
                            <div className="">
                                {/*<TextInput
                                    type="date"
                                    name="dob"
                                    className="block w-full"
                                    placeholder="Date of birth"
                                    handleChange={onHandleChange}
                                    value={user_detail.dob}
                                />*/}

                                <DatePicker
                                    selected={dob}
                                    onChange={(date) => setDob(date)}
                                    placeholderText="Date of birth"
                                    showMonthDropdown
                                    dateFormat="MM/dd"
                                    name="dob"
                                />

                                <InputError message={errors.dob} className="mt-2" />
                            </div>
                            <div className="">

                                <DatePicker
                                    selected={joining_date}
                                    onChange={(date) => setJoiningDate(date)}
                                    placeholderText="Joining Date"
                                    showYearDropdown
                                    showMonthDropdown
                                    name="joining_date"
                                />

                                <InputError message={errors.joining_date} className="mt-2" />
                            </div>
                            <div className="">
                                <Select
                                    className="at-chartselect at-selectdepartment at-addemployeselect w-full"
                                    classNamePrefix="select"
                                    name="role_id"
                                    options={roles_options}
                                    placeholder="Select Role"
                                    onChange={(e) => setData('role_id', e.value)}
                                    defaultValue={{value:selected_role.id, label:selected_role.name}}
                                />

                            </div>
                            <div className="">
                                <Select
                                    className="at-chartselect at-selectdepartment at-addemployeselect w-full"
                                    classNamePrefix="select"
                                    name="department_id"
                                    options={props.departments}
                                    placeholder="Select Department"
                                    onChange={(e) => setData('department_id', e.value)}
                                    defaultValue={{value:selected_department.value, label:selected_department.label}}
                                />

                            </div>
                            <div className="">
                                <Select
                                    className="at-chartselect at-selectdepartment at-addemployeselect w-full"
                                    classNamePrefix="select"
                                    name="manager_id"
                                    options={lead_options}
                                    placeholder="Select Manager/Lead"
                                    onChange={(e) => setData('manager_id', e.value)}
                                    defaultValue={{value:selected_lead.id, label:selected_lead.name}}
                                />

                            </div>
                            <div className="flex items-end justify-end">
                                {/*<button type="submit" className="flex items-center justify-center border-0 min-h-[60px] min-w-[170px] max-w-[70px] text-black rounded-[10px] bg-themecolor font-product_sansregular font-bold text-lg cursor-pointer " onClick={openModalOne}>*/}
                                <button type="submit" className="flex items-center justify-center border-0 min-h-[60px] min-w-[170px] max-w-[70px] text-black rounded-[10px] bg-themecolor font-product_sansregular font-bold text-lg cursor-pointer ">
                                    Update
                                </button>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
            <UploadFile isOpen = {isOpen} closeModal = {closeModal}/>
            <SuccessModal isOpen = {isOpenOne} closeModal = {closeModalOne}/>
        </AuthenticatedLayout >
    );
}
