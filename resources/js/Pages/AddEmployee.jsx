import React, {useEffect, useState} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import UploadFile from '@/Components/UploadFile';
import SuccessModal from '@/Components/SuccessModal';
import InputError from "@/Components/InputError";

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




export default function AddEmployee(props) {
    let [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [isVisible, setIsVisible] = useState(false);
    const [alert, setAlert] = useState(false);

    const [lead_options, setLead] = useState([]);
    const [department_options, setDepartment] = useState([]);
    const [roles_options, setRoles] = useState([]);

    const { data, setData, post, processing, errors, reset, setError } = useForm({
        name: '', email: '', dob:'', joining_date:'',emp_id:'',designation:'',
        password: '', c_password:'',manager_id:'',department_id:'',role_id:''
    })

    const leads = props.teamleads;

    const departments = props.departments;
    const roles = props.roles;

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
        setLoading(true)
        e.preventDefault();
        post(route("users.store"),{
            preserveScroll: true,
            onError:function (error) {
                setLoading(false);
            },
            onSuccess:function (response) {
                setLoading(false);
                // openModal()
            }
        });
    }

    useEffect( () => {
        setSelectOptions();
    },[department_options]);


    const setSelectOptions = () =>{
        for (const [i, lead] of leads.entries()) {
            lead_options.push({value:lead.id, label:lead.name});
        }
        for (const dep of departments) {
            department_options.push({value:dep.id, label:dep.name});
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Employee</h2>}
        >
            <Head title="Add Employee" />

            <div className="at-addemployeesarea max-w-[76.5rem] mx-auto pt-0 lg:pt-[7rem] xl:pt-[10rem] 2xl:pt-[13.125rem]">
                <div className="at-pagehead mb-6 block sm:flex items-center justify-between">
                    <h3 className="text-black text-3xl leading-7 font-product_sans_mediumregular">Add empoylee</h3>
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
                                />
                                <InputError message={errors.emp_id} className="mt-2" />
                            </div>
                            <div className="">
                                <TextInput
                                    type="date"
                                    name="dob"
                                    className="block w-full"
                                    placeholder="Date of birth"
                                    handleChange={onHandleChange}
                                />
                                <InputError message={errors.dob} className="mt-2" />
                            </div>
                            <div className="">
                                <TextInput
                                    type="date"
                                    name="joining_date"
                                    className="block w-full"
                                    placeholder="Joining Date"
                                    handleChange={onHandleChange}
                                />
                                <InputError message={errors.joining_date} className="mt-2" />
                            </div>
                            <div className="">
                                <TextInput
                                    type="password"
                                    name="password"
                                    className="block w-full"
                                    placeholder="Password"
                                    handleChange={onHandleChange}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="">
                                <TextInput
                                    type="password"
                                    name="password_confirmation"
                                    className="block w-full"
                                    placeholder="Confirm Password "
                                    handleChange={onHandleChange}
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                            <div className="">
                                <Select
                                    className="at-chartselect at-selectdepartment at-addemployeselect w-full"
                                    classNamePrefix="select"
                                    name="role_id"
                                    options={roles_options}
                                    placeholder="Select Role"
                                    onChange={(e) => setData('role_id', e.value)}
                                />

                            </div>
                            <div className="">
                                <Select
                                    className="at-chartselect at-selectdepartment at-addemployeselect w-full"
                                    classNamePrefix="select"
                                    name="department_id"
                                    options={department_options}
                                    placeholder="Select Department"
                                    onChange={(e) => setData('department_id', e.value)}
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
                                />

                            </div>
                            <div className="flex items-end justify-end">
                                {/*<button type="submit" className="flex items-center justify-center border-0 min-h-[60px] min-w-[170px] max-w-[70px] text-black rounded-[10px] bg-themecolor font-product_sansregular font-bold text-lg cursor-pointer " onClick={openModalOne}>*/}
                                <button type="submit" className="flex items-center justify-center border-0 min-h-[60px] min-w-[170px] max-w-[70px] text-black rounded-[10px] bg-themecolor font-product_sansregular font-bold text-lg cursor-pointer ">
                                    Save
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
