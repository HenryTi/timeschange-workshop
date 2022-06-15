import { Bin } from "uqs/JksWarehouse";

export function BinItem({ item }: { item: Bin; }) {
    let { serial } = item;
    return <>
        <div className="small text-muted me-3">{serial}</div>
    </>;
}
