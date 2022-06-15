import { industryCaption } from "App/Industry";
import { Product, Industry } from "uqs/JksWarehouse";

export function ProductView({ value }: { value: Product; }) {
    let { no, discription, industry } = value;
    return <>
        <div>{industryCaption[industry as Industry]}</div>
        <div className="small text-muted me-3">{no}</div>
        <div>{discription}</div>
    </>;
}
