import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import TextInput from './TextInput'

export default function PasswordSuccessModal(props) {
    // let [isOpen, setIsOpen] = useState(false)

    // function closeModal() {
    //     setIsOpen(false)
    // }

    // function openModal() {
    //     setIsOpen(true)
    // }

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
                                <Dialog.Panel className="w-full max-w-[505px] min-h-[390px] flex items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 px-14 text-left align-middle shadow-xl transition-all">
                                    <div className="w-full flex items-center justify-center flex-col">
                                       <img className="w-[170px]" src="/assets/images/svg/success.gif" alt="Success"/>
                                       <h4 className="text-[#000] font-product_sansregular text-3xl mt-7 mb-2">Congratulations</h4>
                                       <span className="block text-[#7b7b7b] text-lg font-product_sansregular">Password successfully changed</span>
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