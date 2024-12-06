import { Count } from "@prisma/client/runtime/library";
import {useState} from "react";
import { createContext } from "react";

type CountContextType = {
    count: number;
    setCount: (count: number) => void;
};

export const CountContext = createContext<CountContextType>({
    count: 0,
    setCount: () => {},
});
type CountProviderProps = {
    children: React.ReactNode;
};

export const CountProvider = (props: CountProviderProps) => {
    const [count, setCount] = useState(0);

    return (
    <CountContext.Provider value={{
        count,
        setCount,
    }}>
        {props.children}
    </CountContext.Provider>
    );
};
