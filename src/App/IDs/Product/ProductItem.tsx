import { Product } from "uqs/JksWarehouse";

export function ProductItem({ item }: { item: Product; }) {
    let { no, discription } = item;
    return <>
        <div className="small text-muted me-3">{no}</div>
        <div>{discription}</div>
    </>;
}
