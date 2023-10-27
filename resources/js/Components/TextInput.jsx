import React, { useEffect, useRef } from 'react';

export default function TextInput({
    type = 'text',
    name,
    value,
    className,
    autoComplete,
    required,
    isFocused,
    handleChange,
    placeholder,
}) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start w-full">
            <input
                type={type}
                name={name}
                value={value}
                className={
                    ` border-[1px] border-bordercolor h-[60px] mt-0 text-black placeholder:text-[#7e7F7e] focus:shadow-none focus:border-black focus:ring-0 rounded-xl text-base font-product-sansregular w-full ` +
                    className
                }
                placeholder={placeholder}
                ref={input}
                autoComplete="off"
                required={required}
                onChange={(e) => handleChange(e)}
            />
        </div>
    );
}
