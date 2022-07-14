import { UqApp } from "App/UqApp";
import { useEffect, useState } from "react";

const cache: { [id: number]: any } = {};

type TemplateType = (value: any) => JSX.Element;

export function SheetItemView({ id, app, Template }: { id: number; app: UqApp; Template: TemplateType }) {
    let [value, setValue] = useState<any>(undefined);
    useEffect(() => {
        async function getValue() {
            let obj = cache[id];
            if (obj === undefined) {
                let ret = await app.uqs.JksWarehouse.ID({ id, IDX: undefined });
                obj = ret[0];
                cache[id] = obj;
            }
            setValue(obj);
        }
        getValue();
    }, [id]);
    if (value === null || value === undefined) return null;
    return Template(value);
}
