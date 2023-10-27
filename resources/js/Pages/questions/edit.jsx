import React, {useEffect, useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, useForm, usePage} from '@inertiajs/inertia-react'
import Select from 'react-select'
import InputError from "@/Components/InputError";
import {toast} from "react-toastify";


const type = [
    {value: 'Quantitative', label: 'Quantitative'},
    {value: 'Qualitative', label: 'Qualitative'},
]
const question_for_options = [
    {value: 'Manager', label: 'Manager Review'},
    {value: 'Team Member', label: 'Self Review'},
]

export default function EditQuestions(props) {

    // const {departments} = usePage().props;
    const { question_data } = usePage().props;
    const [depart_options, setDepartment] = useState(props.departments || []);
    const [selected_department, setSelectedDepartment] = useState(props.departments.find((item) => item.value == question_data.department_id));
    const {data, setData, put, processing, errors, reset, setError,setValue} = useForm({
        department_id: question_data.department_id || '',
        question_for: question_data.question_for || '',
        type: question_data.type || '', question: question_data.question || ''
    });
    const [selected_type,setTypeState] = useState(type.find((item) => item.value === question_data.type));
    const [selected_for, setForState] = useState(question_for_options.find((item) => item.value == question_data.question_for));


   /* useEffect(() => {
        console.log({selected_department})
    },[])*/
/*
    const setSelectOptions = () => {
        if(props.departments){
            for (const dep of props.departments) {
                depart_options.push({value: dep.id, label: dep.name});
            }
            setDepartment(depart_options);
        }
    }*/

    const checkFormStatus = (event) => {
        handleSubmit();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        put(route("questions.update",question_data.id));
    }

    const onHandleChange = (event) => {
        if (event.target) {
            setData(event.target.name, event.target.value);
        }
    };


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Question
                </h2>
            }
        >
            <Head title="Add New Question"/>
            <div className="at-pagehead mb-6 flex items-center justify-center">
                <h3 className="text-black text-3xl leading-7 font-product_sans_mediumregular">
                    Edit Question
                </h3>
            </div>
            <div className="w-full float-left pl-0 lg:pl-[6.875rem] mt-4">
                <form className="at-formaddquestion" onSubmit={handleSubmit}>
                    <div className="block md:flex justify-between items-center gap-4">
                        <Select
                            placeholder="Select Department"
                            name="department_id"
                            options={depart_options}
                            className={`at-chartselect at-departmentselect w-3/6 mb-5 md:mt-0 ${
                                errors.department_id ? 'has-error' : ''
                            }`}
                            onChange={(e) => setData('department_id', e.value)}
                            defaultValue={{value:selected_department.value, label:selected_department.label}}
                        />
                        <InputError message={errors.department_id} className="mt-2"/>

                        <Select
                            placeholder="Question Type"
                            options={type}
                            className="at-chartselect at-departmentselect w-3/6 mb-5 md:mt-0"
                            name="type"
                            onChange={(e) => setData('type', e.value)}
                            defaultValue={{value:selected_type.value, label:selected_type.label}}
                        />
                        <InputError message={errors.type} className="mt-2"/>
                        <Select
                            placeholder="Review Type"
                            options={question_for_options}
                            className="at-chartselect at-departmentselect w-3/6 mb-5 md:mt-0"
                            name="question_for"
                            onChange={(e) => setData('question_for', e.value)}
                        />
                        <InputError message={errors.question_for} className="mt-2"/>

                    </div>
                    <div className="w-full float-left mt-4">
                    <textarea name="question"
                              className="w-full border-0 rounded-[10px] bg-white resize-none focus:ring-black min-h-90px p-4"
                              onChange={onHandleChange}
                              placeholder="Write here.."
                              defaultValue={question_data.question}
                    >
                    </textarea>
                        <InputError message={errors.question} className="mt-2"/>

                    </div>
                    <div className="w-full float-left flex items-center justify-between gap-4 mt-4">
                        <button
                            className="w-3/6 min-h-[60px] flex items-center justify-center bg-themecolor rounded-[10px] text-black text-lg font-product_sansbold"
                            type="submit"
                            id={'1'}
                            data-name="close"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    )
}
