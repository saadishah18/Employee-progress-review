import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import TextInput from './TextInput'

export default function ChangePasswordModal(props) {
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
    props.setIsOpenOne(true)
    props.closeModal(false)
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
                <Dialog.Panel className="w-full max-w-[505px] transform overflow-hidden rounded-2xl bg-white p-6 px-14 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center font-product_sansregular mb-11 text-black"
                  >
                    Change Password
                    <p className="text-sm text-black font-product_sansregular mt-4">
                      Your new password must be different from previous used
                      passwords.
                    </p>
                  </Dialog.Title>
                  <div className="w-full">
                    <form className="">
                      <fieldset>
                        <div className="mb-5">
                          <label className="w-full float-left text-sm text-black font-product_sansregular mb-2">
                            Current Password
                          </label>
                          <TextInput
                            className="!border !border-[#C0BCBC] !h-[50px]"
                            type="password"
                            placeholder="****"
                          ></TextInput>
                        </div>
                        <div className="mb-5">
                          <label className="w-full float-left text-sm text-black font-product_sansregular mb-2">
                            New Password
                          </label>
                          <TextInput
                            className="!border !border-[#C0BCBC] !h-[50px] !w-full"
                            type="password"
                            placeholder="****"
                          ></TextInput>
                        </div>
                        <div className="mb-5">
                          <label className="w-full float-left text-sm text-black font-product_sansregular mb-2">
                            Confirm Password
                          </label>
                          <TextInput
                            className="!border !border-[#C0BCBC] !h-[50px]"
                            type="password"
                            placeholder="****"
                          ></TextInput>
                        </div>
                      </fieldset>
                    </form>
                  </div>
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      type="button"
                      className="w-full bg-bordercolor rounded-lg min-h-[56px] text-black text-lg font-medium font-product-sansregular mx-auto hover:bg-themecolor"
                      onClick={openModalOne}
                    >
                      Reset Password
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
