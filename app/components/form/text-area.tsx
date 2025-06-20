import React, { TextareaHTMLAttributes, forwardRef } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label?: string;
    error?: string;
    className?: string;
    customClassName?: string;
    disabled?: boolean;
    required?: boolean;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            id,
            className = '',
            customClassName = '',
            disabled = false,
            required = false,
            ...props
        },
        ref
    ) => (
        <div className={customClassName}>
            {label && (
                <label htmlFor={id} className="block mb-1 font-medium">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <textarea
                id={id}
                ref={ref}
                className={`w-full p-2 border rounded ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
                disabled={disabled}
                required={required}
                {...props}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
);

Textarea.displayName = 'Textarea';

export default Textarea;