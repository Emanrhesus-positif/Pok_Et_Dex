import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";

export const Stats = () => {
    const pokemon = useData<Data>();
    return (
        <div>
            <h1>Stats</h1>
        </div>
    );
};