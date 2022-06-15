import { Shipper } from "uqs/JksWarehouse";

export function ShipperView({ value }: { value: Shipper; }) {
    let { no, discription } = value;
    return <>
        <div className="small text-muted me-3">{no}</div>
        <div>{discription}</div>
    </>;
}
