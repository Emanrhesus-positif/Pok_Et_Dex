import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export const Abilities = () => {
    const pokemon = useData<Data>();
    return (
        <div>
            <h1>Abilities</h1>
        </div>
    );
};