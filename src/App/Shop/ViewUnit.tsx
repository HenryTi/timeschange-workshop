import { LMR, MutedSmall } from "tonwa-com";
import { Shop } from "uqs/BzUShop";

export function ViewUnit({ entity, unit }: { entity: string; unit: any; }) {
    if (unit === 0) {
        return <ViewUqSys />;
    }
    switch (entity) {
        case 'shop': return <ViewShop value={unit as Shop} />;
    }
}

function ViewUqSys() {
    return <>
        <div className="text-info"><b>UQ DB</b></div>
        <div>Uq 数据管理</div>
    </>
}

function ViewShop({ value }: { value: Shop }) {
    let { no, name, discription } = value;
    return <>
        <LMR><b>{name}</b> <MutedSmall>{no}</MutedSmall></LMR>
        {discription && <div className="my-2">{discription}</div>}
    </>
}
