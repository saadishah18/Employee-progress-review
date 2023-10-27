import React, {useEffect, useState} from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, Link} from '@inertiajs/inertia-react'
import DeleteModal from '@/Components/DeleteModal'
import ToasterNotification from "@/Components/ToasterNotification";
import {toast} from "react-toastify";
import {Inertia} from "@inertiajs/inertia";

export default function EvaluationQuestions(props) {
    let [isOpen, setIsOpen] = useState(false);
    let [deleteItem, setDeleteItem] = useState('');

    const [department_list, setDepartmentList] = useState([]);
    useEffect(() => {
        if (props.success) {
            toast.success(props.message);
        }
    })
    useEffect(() => {
        setDepartmentList(props.questions_data);
    }, [props.questions_data])


    function closeModal() {
        setIsOpen(false)
    }

    function openModal(id) {
        setDeleteItem(id)
        setIsOpen(true)

    }

    function deleteItemHandler() {
        Inertia.delete(route("questions.destroy", deleteItem), {
            onError: function (errors) {
                toast.error(errors.error);
            },
            onSuccess: function (response) {
                toast.success('Question deleted Successfully');
            }
        });

    }


    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Evaluation Question
                </h2>
            }
        >
            <Head title="Evaluation Question"/>
            <ToasterNotification resonse_status={props.status} message={props.message}/>

            <div className="at-pagehead mb-6 flex items-center justify-center">
                <h3 className="text-black text-3xl leading-7 font-product_sans_mediumregular">
                    Questionnaire
                </h3>
            </div>
            <div className="at-departmentsarea w-full float-left">
                {department_list.map((dept, i) => (
                    <div key={i} className="at-department w-full float-left">
                        <h4 className="w-full text-[1.25rem] lg:text-[1.5rem] xl:text-[1.75rem] 2xl:text-[2rem] font-product_sans_mediumregular pl-[6.875rem] mb-6 at-colorlaravel">
                            {dept.name}
                        </h4>
                        {dept.questions.length == 0 ?
                            <div className="at-quations w-full float-left">
                                <div className="at-quation w-full float-left pl-[6.875rem] relative mb-4">
                                    <div
                                        className="bg-white min-h-[110px] rounded-[10px] block lg:flex items-start justify-between px-5 py-5 relative border-l-8 border-[#fb275d]">
                                        <p className="text-black font-product_sansregular max-w-full lg:max-w-[29.375rem] break-words text-2xl">
                                            No questions exists
                                        </p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="at-quations w-full float-left">
                                {
                                    dept.questions.map((ques, ques_index) =>
                                        (
                                            <div key={ques_index}
                                                 className="at-quation w-full float-left pl-[6.875rem] relative mb-4">
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
                                                                <span>{ques.question_for === 'Manager' ? 'Manager Review' : 'Self Review'}</span>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="flex items-center justify-center gap-2 text-lg text-black font-product_sansbold"
                                                            >
                                                                <img
                                                                    src="/assets/images/svg/qualitative.svg"
                                                                    alt="Qualitative Icon"
                                                                />
                                                                <span>{ques.type}</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <ul className="at-themeactions flex list-none items-center gap-[10px] mt-5 lg:mt-0">
                                                        <li className="list-none">

                                                            <Link href={route('questions.edit', ques.id)}
                                                                  className="w-[40px] h-[40px] flex justify-center items-center rounded-[10px] bg-themecolor bg-opacity-10 relative"
                                                            >
                                                                <span className="at-themetoolip">Edit</span>
                                                                <img src="/assets/images/svg/edit.svg" alt="Edit Icon"/>
                                                            </Link>
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

                        }
                    </div>
                ))}
                <Link className="w-full float-left mt-7 pl-[6.875rem]" href={route('questions.create')}>
                  <span
                      className="w-full rounded-[10px] min-h-[60px] text-white font-product_sansbold text-lg flex justify-center items-center bg-[#fb275d]">
                    Add New Question
                  </span>
                </Link>
            </div>
            <DeleteModal isOpen={isOpen} closeModal={closeModal} handler={deleteItemHandler}/>
        </AuthenticatedLayout>
    )
}
