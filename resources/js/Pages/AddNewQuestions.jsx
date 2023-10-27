import React, {useEffect, useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, useForm} from '@inertiajs/inertia-react'
import Select from 'react-select'
import InputError from "@/Components/InputError";
import ToasterNotification from "@/Components/ToasterNotification";
import {toast} from "react-toastify";
import {Inertia} from "@inertiajs/inertia";
import DeleteModal from "@/Components/DeleteModal";


const type = [
    {value: 'Quantitative', label: 'Quantitative'},
    {value: 'Qualitative', label: 'Qualitative'},
]
const question_for = [
    {value: 'Manager', label: 'Manager Review'},
    {value: 'Team Member', label: 'Self Review'},
]

export default function AddNewQuestions(props) {
    const [depart_options, setDepartment] = useState([]);
    const [questions_list, setQuestions] = useState([]);
    let [deleteItem, setDeleteItem] = useState('');
    let [isOpen, setIsOpen] = useState(false);

    const {data, setData, post, processing, errors, reset, setError,setValue} = useForm({
        department_id: '', question_for: '', type: '', question: '', btnValue: ""
    });

    useEffect(() => {
        setSelectOptions();
    }, [])

    /*useEffect(() => {
        setSelectOptions();
    }, [questions_list])*/

    const setSelectOptions = () => {
        if(props.departments){
            for (const dep of props.departments) {
                    depart_options.push({value: dep.id, label: dep.name});
            }
            setDepartment(depart_options);
        }
        if(props.questions){
            setQuestions([...questions_list,props.questions]);
        }
    }

    const checkFormStatus = (event) => {
        handleSubmit();
    }


    function closeModal() {
        setIsOpen(false)
    }

    function openModal(id) {
        setDeleteItem(id)
        setIsOpen(true)

    }

    function deleteItemHandler() {
        Inertia.delete(route("questions.destroy", deleteItem),{
            onError: function (errors) {
                toast.error(errors.error);
            },
            onSuccess: function (response) {
                toast.success('Question deleted Successfully');
            }
        });

    }

    const handleSubmit = async () => {
        post(route("questions.store"), {
            preserveScroll: true,
            onError: function (errors) {
                toast.error(errors);
            },
            onSuccess: function (response) {
                toast.success('Question Added Successfully');
                setQuestions([...questions_list,response.props.questions]);
                reset({
                    department_id: '',
                    type: '',
                    question_for:'',
                    question:'',
                    btnValue:''
                });
            }
        });
    }

    const onHandleChange = (event) => {
        if (event.target) {
            setData(event.target.name, event.target.value);
        }
    };
    const checkFormStatusHandler = (event) => {
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
                    Add New Question
                </h3>
            </div>
            <div className="at-departmentsarea w-full float-left">
                <div className="at-department w-full float-left">
                    <div className="at-quations w-full float-left">
                        {questions_list?.length > 0 &&
                            questions_list.map((ques, ques_index) => (
                            <div key={ques_index} className="at-quation w-full float-left pl-[6.875rem] relative">
              <span
                  className="top-1/2 left-0 absolute w-[60px] h-[60px] border-[3px] font-product_sansbold text-2xl text-gray1 border-gray1 rounded-full flex items-center justify-center -translate-y-1/2">
                  {++ques_index}
              </span>
                            <div
                                className="bg-white min-h-[110px] rounded-[10px] block lg:flex items-start justify-between px-5 py-5 relative border-l-8 border-[#fb275d]">
                                <div>
                                    <p className="text-black font-product_sansregular max-w-full lg:max-w-[29.375rem] break-words text-2xl">
                                        {ques.question}
                                    </p>
                                    <div className="flex items-center gap-5 mt-4">
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 text-gray1 text-lg"
                                        >
                                            <img
                                                src="/assets/images/svg/self-review.svg"
                                                alt="Self Review Icon"
                                            />
                                            {<span>{ques.question_for === 'Manager' ? 'Manager Review' : 'Self Review'}</span>}
                                        </button>
                                        <button
                                            type="button"
                                            className="flex items-center justify-center gap-2 text-lg text-black font-product_sansbold"
                                        >
                                            <img
                                                src="/assets/images/svg/qualitative.svg"
                                                alt="Qualitative Icon"
                                            />
                                            {<span>{ques.type}</span>}
                                        </button>
                                    </div>
                                </div>
                                <ul className="at-themeactions flex list-none items-center gap-[10px] mt-5 lg:mt-0">
                                    <li className="list-none">
                                        <a
                                            href={route('questions.edit', ques.id)}
                                            className="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] bg-themecolor bg-opacity-10"
                                        >
                                            <span className="at-themetoolip">Edit</span>
                                            <img src="/assets/images/svg/edit.svg" alt="Edit Icon"/>
                                        </a>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] bg-deletecolor bg-opacity-10 relative"
                                            onClick={() => {
                                                openModal(ques.id)
                                            }}>
                                            <span className="at-themetoolip">Delete</span>
                                            <img
                                                src="/assets/images/svg/delete.svg"
                                                alt="Delete Icon"
                                            />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                            ))
                        }
                    </div>
                </div>
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
                        />
                        <InputError message={errors.department_id} className="mt-2"/>
                        <Select
                            placeholder="Question Type"
                            options={type}
                            className="at-chartselect at-departmentselect w-3/6 mb-5 md:mt-0"
                            name="type"
                            onChange={(e) => setData('type', e.value)}
                        />
                        <InputError message={errors.type} className="mt-2"/>

                        <Select
                            placeholder="Review Type"
                            options={question_for}
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
                    ></textarea>
                        <InputError message={errors.question} className="mt-2"/>

                    </div>
                    <div className="w-full float-left flex items-center justify-between gap-4 mt-4">
                        <button
                            className="w-3/6 min-h-[60px] flex items-center justify-center bg-themecolor rounded-[10px] text-black text-lg font-product_sansbold"
                            type="button" value="close" name="btnValue" onClick={async (event) =>{
                            // setData(event.target.name,event.target.value)
                            data.btnValue = event.target.value;
                            await setData({btnValue:  data.btnValue})
                            checkFormStatus()
                            }}
                            id={'1'}
                            data-name="close"
                        >
                            Save &amp; Close
                        </button>
                        <button
                            className="w-3/6 min-h-[60px] flex items-center justify-center bg-themecolor rounded-[10px] text-black text-lg font-product_sansbold"
                            type="button" value="more" name="btnValue"
                            onClick={async (event) =>{
                                data.btnValue = event.target.value;
                                await setData({btnValue:  data.btnValue})
                                checkFormStatus()
                            }}
                            id={'2'}
                            data-name="more"
                        >
                            Save &amp; Add More
                        </button>
                    </div>
                </form>
            </div>
            <DeleteModal isOpen={isOpen} closeModal={closeModal} handler={deleteItemHandler}/>
        </AuthenticatedLayout>
    )
}
