type Props = {
    isDisabled: boolean;
    children: React.ReactNode;
};

const Button = ({ children, isDisabled }: Props) => {
    return <button disabled={isDisabled}>{children}</button>;
};

export default Button;
