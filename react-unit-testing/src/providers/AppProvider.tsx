import { Dispatch, createContext, useContext, useState } from "react";

interface User {
    firstName: string;
    lastName: string;
}

interface Context {
    user?: User;
    setUser?: Dispatch<React.SetStateAction<User | undefined>>;
}

const defaultValues: Context = {
    user: undefined,
    setUser: undefined,
};

interface Props {
    children: React.ReactNode;
}

export const AppContext = createContext(defaultValues);

const AppProviders = ({ children }: Props) => {
    const [user, setUser] = useState<User>();

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useUser = () => {
    return useContext(AppContext);
};

export default AppProviders;
