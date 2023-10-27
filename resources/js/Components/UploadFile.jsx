import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import TextInput from './TextInput'

export default function UploadFile(props) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-[46.25rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                                    <div className="w-full float-left min-h-[310px] flex items-center justify-center flex-col border-b border-gray1">
                                        <input className="hidden" type="file" name="upload-file" id="at-uploadfile" />
                                        <label className="flex justify-center items-center flex-col cursor-pointer" htmlFor="at-uploadfile">
                                            <img src="/assets/images/svg/upload-icon.svg" alt="Upload Icon" />
                                            <span className="text-gray1 text-lg font-product_sansbold block mt-5">Upload Employee file</span>
                                        </label>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between w-full p-7">
                                        <div className="flex-[310px] max-w-[310px]">
                                            <h5 className=" text-black text-lg font-product_sans_mediumregular mb-1">Want to Create Employees in bulk?</h5>
                                            <p className="text-gray1 text-base font-product_sansregular leading-5">Create the employee in bulk click to download sample sheet</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="max-w-[214px] min-w-[214px] h-[60px] flex justify-center items-center gap-4 flex-shrink-0 bg-themecolor rounded-lg min-h-[56px] text-black text-lg font-medium font-product-sansregular">
                                            <img src="/assets/images/svg/uploadicon.svg" alt="Upload Icon" />
                                            <span>Sample Sheet</span>
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}