import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import TextInput from './TextInput'

export default function DeleteModal(props) {
//   let [isOpen, setIsOpen] = useState(false)

//   function closeModal() {
//     setIsOpen(false)
//   }

//   function openModal() {
//     setIsOpen(true)
//   }

    function funcHandler(){
            props.handler()
            props.closeModal()

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
                <Dialog.Panel className="w-full max-w-[620px] min-h-[415px] flex items-center justify-center transform overflow-hidden rounded-2xl bg-white p-6 px-14 text-left align-middle shadow-xl transition-all">
                  <div className="w-full flex items-center justify-center flex-col">
                    <img
                      className="w-[150px]"
                      src="/assets/images/svg/delete-icon.svg"
                      alt="Delete Icon"
                    />
                    <h4 className="text-[#000] font-product_sans_mediumregular text-3xl mt-7 mb-2">
                      Are you sure to want to delete?
                    </h4>
                    <div className="w-full float-left mt-11 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        className="min-h-[60px] text-lg font-product_sansregular font-bold tracking-wider border-[2px] border-gray1 rounded-[10px] min-w-[168px] bg-white"
                        onClick={props.closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="min-h-[60px] text-lg font-product_sansregular font-bold tracking-widest rounded-[10px] min-w-[168px] text-white bg-[#fb275d]"
                        onClick={funcHandler}
                      >
                        Delete
                      </button>
                    </div>
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
