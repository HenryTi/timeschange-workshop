import { IdSpecProductView } from "App/Industry";
import { useUqApp } from "App/UqApp";
import { useEffect, useState } from "react";

export function BzView({ bz }: { bz: number; }) {
    let uqApp = useUqApp();
    let { JksWarehouse } = uqApp.uqs;
    let [idObj, setIdObj] = useState<any>(undefined);
    useEffect(() => {
        async function loadIdObj() {
            let obj = await JksWarehouse.idObj(bz);
            setIdObj(obj);
        };
        loadIdObj();
    }, [bz]);
    return <IdSpecProductView id={idObj?.spec} app={uqApp} />;
}
