import { Bin } from "uqs/JksWarehouse";

export function BinView({ value }: { value: Bin; }) {
    let { serial } = value;
    return <>
        <div className="small text-muted me-3">{serial}</div>
    </>;
}
