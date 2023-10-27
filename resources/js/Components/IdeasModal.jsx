import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import TextInput from './TextInput'

export default function IdeasModal(props) {

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
                                <Dialog.Panel className="w-full max-w-[945px] min-h-[390px] overflow-hidden rounded-2xl bg-white py-14 px-14 text-left align-middle shadow-xl transition-all">
                                    <div className="w-full">
                                        <h4 className="w-full text-black font-product_sans_mediumregular text-2xl mb-6">Idea Title</h4>
                                        <p className="text-[#656565] text-xl font-product_sansregular leading-8">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Parturient vitae eu quis massa eget dignissim aenean. Massa elementum volutpat lacus, eget vitae aliquet. Eu lorem nunc nulla ultricies tellus viverra ornare nisl. Ligula non dui et habitasse quisque lorem felis ultrices. Amet varius viverra lobortis donec volutpat volutpat adipiscing. Dui convallis mattis pellentesque tellus eget nisi. Adipiscing morbi nibh quam pretium eros, purus eget. Tempus nulla sagittis mollis morbi facilisis. Magna congue tristique tincidunt amet semper consectetur. felis ultrices. Amet varius viverra lobortis donec volutpat volutpat adipiscing. Dui convallis mattis pellentesque tellus eget nisi. Adipiscing morbi nibh quam pretium eros, purus eget. Tempus nulla sagittis mollis morbi facilisis. Magna congue tristique tincidunt amet semper consectetur.
                                        </p>
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