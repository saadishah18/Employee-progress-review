import React, {useState} from 'react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm, usePage} from '@inertiajs/inertia-react';
import AuthLayout from '@/Layouts/AuthLayout';
import EmailSentModal from '@/Components/EmailSentModal';

export default function ForgotPassword({status, errors}) {
    let [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [isVisible,setIsVisible]=useState(false);


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const {data, setData, post, processing} = useForm({
        email: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true)
        post(route('password.email'),{
            preserveScroll: true,
            onError:function () {
                setLoading(false);
            },
            onSuccess:function () {
                setLoading(false);
                openModal()
            }
        });
    };
    // setLoading(false);

    return (
        <AuthLayout>
            <Head title="Forgot Password"/>
            <div className="at-loginpage w-full h-full">
                <div className="at-logincontent flex justify-between">
                    <figure
                        className="at-loginimage top-0 left-0 -z-0 absolute lg:relative w-full lg:w-1/2 overflow-hidden h-[100vh] bg-themebgcolor flex justify-center">
                        <img className='' src="/assets/images/login-img.webp" alt="Login Image"/>
                    </figure>
                    <div
                        className="at-authformholder md:flex items-center justify-center flex-col lg:block bg-white bg-opacity-80 lg:bg-opacity-100 relative w-full lg:w-1/2 h-screen overflow-auto p-[30px] lg:pt-12 lg:pl-16 lg:pr-16 lg:pb-4 xl:pt-20 xl:pl-32 xl:pr-52 xl:pb-8">
                        <div className="at-authhead w-full mb-[30px] lg:mb-[46px] xl:mb-[66px]">
                            <div
                                className="at-btnbackholder w-full flex mb-[20px] sm:mb-[2rem] md:mb-[4rem] lg:mb-[6rem] xl:mb-[11.875rem]">
                                <Link
                                    className="flex items-center justify-center text-black text-sm font-productsans-bold gap-5"
                                    href="/login">
                                    <em className="flex justify-center items-center w-[44px] h-[44px] bg-themebgcolor rounded-xl">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.995 4.99997H3.40501L6.70501 1.71268C6.89332 1.52453 6.9991 1.26935 6.9991 1.00326C6.9991 0.737183 6.89332 0.481998 6.70501 0.29385C6.51671 0.105701 6.26132 0 5.99501 0C5.72871 0 5.47332 0.105701 5.28501 0.29385L0.285014 5.28973C0.193973 5.38476 0.122608 5.49681 0.0750135 5.61946C-0.0250045 5.86272 -0.0250045 6.13557 0.0750135 6.37883C0.122608 6.50149 0.193973 6.61354 0.285014 6.70856L5.28501 11.7044C5.37798 11.7981 5.48858 11.8724 5.61044 11.9232C5.7323 11.9739 5.863 12 5.99501 12C6.12703 12 6.25773 11.9739 6.37959 11.9232C6.50145 11.8724 6.61205 11.7981 6.70501 11.7044C6.79874 11.6116 6.87314 11.501 6.9239 11.3793C6.97467 11.2575 7.00081 11.1269 7.00081 10.995C7.00081 10.8631 6.97467 10.7325 6.9239 10.6108C6.87314 10.489 6.79874 10.3785 6.70501 10.2856L3.40501 6.99832H10.995C11.2602 6.99832 11.5146 6.89305 11.7021 6.70567C11.8897 6.51829 11.995 6.26415 11.995 5.99915C11.995 5.73415 11.8897 5.48001 11.7021 5.29262C11.5146 5.10524 11.2602 4.99997 10.995 4.99997Z"
                                                fill="#3A3A3A"/>
                                        </svg>
                                    </em>
                                    <span>Back</span>
                                </Link>
                            </div>
                            <div className="at-authtitle">
                                <h1 className="mb-6">Forgot Password?</h1>
                                <span className="text-base font-product-sansregular text-gray1 tracking-wide">Please enter your registered email below to reset your account password</span>
                            </div>
                        </div>
                        <form className="w-full" onSubmit={submit}>
                            <div className="at-forminputs">
                                <TextInput
                                    type="text"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                />

                                <InputError message={errors.email} className="mt-2"/>
                            </div>

                            <div className="flex items-center justify-center w-full mt-14">
                                {/*<Link className="w-full" href="/reset-password">*/}
                                {/*   <button type="submit" */}
                                {/*       className="inline-flex items-center justify-center gap-3  bg-themecolor py-3 px-6 xl:py-4 xl:px-12 border border-transparent rounded-[10px] font-bold font-product_sansregular text-lg text-white capitalize tracking-widest active:bg-black hover:bg-black transition ease-in-out duration-150 false w-full">*/}
                                {/*       Submit*/}
                                {/*   </button>*/}
                                {/*</Link> */}

                                <PrimaryButton
                                    type="submit"
                                    className="w-full gap-2"
                                    processing={!data.email ? true : processing}
                                >
                                    Submit
                                    {/* Spinner Start */}
                                    {loading && <div className="lds-dual-ring"></div>}
                                </PrimaryButton>
                            </div>
                        </form>
                        <div className="flex items-center justify-center mt-12">
                            <span className="text-base text-black font-product-sansregular">Return to <Link
                                className="text-themecolor font-productsans-bold" href="/login"> Login</Link></span>
                        </div>
                    </div>
                </div>
            </div>
            <EmailSentModal isOpen={isOpen} closeModal={closeModal} email={data.email}/>
        </AuthLayout>
    );
}
