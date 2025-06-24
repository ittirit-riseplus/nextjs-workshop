type TextInputProps = {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    error?: string;
    className?: string;
    customClassName?: string;
    disabled?: boolean;
    required?: boolean; // เพิ่ม prop required
};

const TextInput = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    error,
    className,
    customClassName,
    disabled = false,
    required = false, // ค่าเริ่มต้น
}: TextInputProps) => (
    <div className={className}>
        {label && (
            <label className="block mb-1 font-medium">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
        )}
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={customClassName}
            disabled={disabled}
            required={required} // เพิ่ม attribute required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
);

export default TextInput;