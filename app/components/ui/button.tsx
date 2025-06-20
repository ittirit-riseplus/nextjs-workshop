import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
    label?: string;
    loading?: boolean;
    variant?: "primary" | "secondary" | "danger";
    customClassName?: string;
    children?: React.ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children" | "className"> & {
    type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = React.memo(
    ({
        label,
        onClick,
        disabled,
        loading,
        variant = "primary",
        customClassName = "",
        children,
        type = "button",
    }: ButtonProps) => (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn ${variant === "primary"
                ? "btn-primary"
                : variant === "secondary"
                    ? "btn-secondary"
                    : "btn-danger"
                } ${customClassName}`}
        >
            {loading
                ? "Loading..."
                : children
                    ? children
                    : label}
        </button>
    )
);
Button.displayName = "Button";
export default Button;