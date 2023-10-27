import React from 'react';

export default function PrimaryButton({ type = 'submit', className = '', processing, children }) {
    return (
        <button
            type={type}
            className={
                `inline-flex items-center justify-center  bg-themecolor py-3 px-6 xl:py-4 xl:px-12 border border-transparent rounded-[10px] font-product_sansregular font-bold text-lg text-white capitalize tracking-widest active:bg-black transition ease-in-out duration-150 ${
                    processing && 'bg-gray1'
                } ` + className
            }
            disabled={processing}
        >
            {children}
        </button>
    );
}
