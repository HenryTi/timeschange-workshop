import { useEffect, useState } from "react";
import { Uq } from "tonwa-uq";

// const cache: { [id: number]: object } = {};

interface Props<T = any> {
    id: number;
    uq: Uq;
    Template: (props: { value: T; }) => JSX.Element;
}

export function IdView({ id, uq, Template }: Props) {
    let [value, setValue] = useState<any>(undefined);
    useEffect(() => {
        async function getValue() {
            let obj = await uq.idObj(id); //.ID({ id, IDX: undefined }); cache[id];
            setValue(obj);
        }
        getValue();
    }, [id, uq]);
    if (value === null || value === undefined) return null;
    return <Template value={value} />;
}
