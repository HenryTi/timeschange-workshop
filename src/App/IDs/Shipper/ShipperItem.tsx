import { Shipper } from "uqs/JksWarehouse";

export function ShipperItem({ item }: { item: Shipper; }) {
    let { no, discription } = item;
    return <>
        <div className="small text-muted me-3">{no}</div>
        <div>{discription}</div>
    </>;
}
