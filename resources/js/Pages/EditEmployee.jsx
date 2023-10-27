import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/inertia-react';
import Select from 'react-select';
import TextInput from '@/Components/TextInput';
import UploadFile from '@/Components/UploadFile';
import SuccessModal from '@/Components/SuccessModal';

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

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Employee</h2>}
        >
            <Head title="Add Employee" />

            <div className="at-addemployeesarea max-w-[76.5rem] mx-auto pt-0 lg:pt-[7rem] xl:pt-[10rem] 2xl:pt-[13.125rem]">
                <div className="at-pagehead mb-6 flex items-center justify-between">
                    <h3 className="text-black text-3xl leading-7 font-product_sans_mediumregular">Edit empoylee</h3>
                    <div className="float-right">
                        <button type="button" onClick={openModal} className="flex items-center justify-center min-h-[60px] min-w-[155px] max-w-[155px] border border-gray1 text-gray1 rounded-[10px] bg-white font-product_sansbold text-lg cursor-pointer hover:bg-themecolor hover:text-white hover:border-themecolor">Upload</button>
                    </div>
                </div>
                <form className="at-formaddemployee w-full float-left">
                    <fieldset className="w-full float-left">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="FullName"
                                    className="block w-full"
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    type="email"
                                    name="email"
                                    className="block w-full"
                                    placeholder="Email Addres"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="Designation"
                                    className="block w-full"
                                    placeholder="Designation"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="Employee ID"
                                    className="block w-full"
                                    placeholder="Employee ID"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="dateofbirth"
                                    className="block w-full"
                                    placeholder="Date of birth"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    type="text"
                                    name="Joining Date"
                                    className="block w-full"
                                    placeholder="Joining Date"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    type="password"
                                    name="password"
                                    className="block w-full"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    type="password"
                                    name="ConfirmPassword "
                                    className="block w-full"
                                    placeholder="Confirm Password "
                                />
                            </div>

                            <div className="">
                                <Select placeholder="Select Manager/Lead" options={options} className="at-chartselect at-selectdepartment at-addemployeselect w-full" />
                            </div>
                            <div className="flex items-end justify-end">
                                <button type="button" className="flex items-center justify-center border-0 min-h-[60px] min-w-[170px] max-w-[70px] text-black rounded-[10px] bg-themecolor font-product_sansregular font-bold text-lg cursor-pointer " onClick={openModalOne}>
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